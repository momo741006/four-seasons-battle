/**
 * API 客戶端 - 與後端八字計算服務通訊
 * 後端 API: https://rainbow-sanctuary-bazu-production.up.railway.app
 */

import { BaZiInput, BaZiChart } from './bazi'

// API 基礎 URL - 可透過環境變數覆寫
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://rainbow-sanctuary-bazu-production.up.railway.app'

/**
 * API 錯誤類別
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * 格式化生日時間為 ISO 字串
 */
function formatBirthday(input: BaZiInput): string {
  const { year, month, day, hour, minute } = input
  
  // 補零函數
  const pad = (num: number) => num.toString().padStart(2, '0')
  
  // 格式: YYYY-MM-DDTHH:MM:SS
  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00`
}

/**
 * 轉換後端回應為前端格式
 */
function transformBackendResponse(backendData: any): BaZiChart {
  const { bazi, five_elements, ten_gods, nayin, shensha } = backendData
  
  // 轉換四柱格式
  const createPillar = (pillarData: [string, string], nayinValue: string) => ({
    heavenlyStem: pillarData[0],
    earthlyBranch: pillarData[1],
    hiddenStems: [], // 後端會在 calculation_details 中提供
    nayin: nayinValue,
    element: getElementFromStem(pillarData[0])
  })
  
  // 計算陰陽分佈
  const yinYang = calculateYinYang(bazi)
  
  return {
    yearPillar: createPillar(bazi.year, nayin.year),
    monthPillar: createPillar(bazi.month, nayin.month),
    dayPillar: createPillar(bazi.day, nayin.day),
    hourPillar: createPillar(bazi.hour, nayin.hour),
    tenGods: ten_gods.map((tg: any) => tg.name),
    elements: five_elements || { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 },
    yinYang
  }
}

/**
 * 從天干取得五行
 */
function getElementFromStem(stem: string): string {
  const elements: Record<string, string> = {
    '甲': '木', '乙': '木',
    '丙': '火', '丁': '火',
    '戊': '土', '己': '土',
    '庚': '金', '辛': '金',
    '壬': '水', '癸': '水'
  }
  return elements[stem] || '未知'
}

/**
 * 計算陰陽分佈
 */
function calculateYinYang(bazi: any): { yin: number; yang: number } {
  const yinYangMap: Record<string, 'yin' | 'yang'> = {
    '甲': 'yang', '乙': 'yin', '丙': 'yang', '丁': 'yin',
    '戊': 'yang', '己': 'yin', '庚': 'yang', '辛': 'yin',
    '壬': 'yang', '癸': 'yin',
    '子': 'yang', '丑': 'yin', '寅': 'yang', '卯': 'yin',
    '辰': 'yang', '巳': 'yin', '午': 'yang', '未': 'yin',
    '申': 'yang', '酉': 'yin', '戌': 'yang', '亥': 'yin'
  }
  
  let yin = 0, yang = 0
  
  Object.values(bazi).forEach((pillar: any) => {
    if (Array.isArray(pillar)) {
      pillar.forEach(char => {
        if (yinYangMap[char] === 'yin') yin++
        else if (yinYangMap[char] === 'yang') yang++
      })
    }
  })
  
  return { yin, yang }
}

/**
 * 調用後端 API 計算八字
 */
export async function calculateBaziFromAPI(input: BaZiInput): Promise<BaZiChart> {
  try {
    const requestBody = {
      name: '使用者', // 可以從 input 擴展
      birthday: formatBirthday(input),
      sex: input.gender === 'male' ? 'M' : 'F',
      location: input.location || '台北',
      timezone: '+08:00', // 預設台灣時區
      options: {
        debug: false,
        useTrueSolarTime: false,
        use_early_zi: true, // 晚子時換日
        longitude: 121.5 // 預設台北經度
      }
    }
    
    console.log('🔄 調用後端 API:', `${API_BASE_URL}/api/bazi/generate`)
    console.log('📤 請求資料:', requestBody)
    
    const response = await fetch(`${API_BASE_URL}/api/bazi/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(
        errorData.error || `API 請求失敗: ${response.status} ${response.statusText}`,
        response.status,
        errorData
      )
    }
    
    const data = await response.json()
    console.log('📥 後端回應:', data)
    
    if (!data.success) {
      throw new ApiError(data.error || '八字計算失敗')
    }
    
    // 轉換為前端格式
    const result = transformBackendResponse(data)
    console.log('✅ 轉換後的八字資料:', result)
    
    return result
    
  } catch (error) {
    console.error('❌ API 調用錯誤:', error)
    
    if (error instanceof ApiError) {
      throw error
    }
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError('無法連接到後端服務,請檢查網路連線')
    }
    
    throw new ApiError(
      error instanceof Error ? error.message : '未知錯誤'
    )
  }
}

/**
 * 健康檢查 - 測試後端服務是否可用
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
    return response.ok
  } catch {
    return false
  }
}

