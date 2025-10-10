// Ba Zi (Eight Characters) calculation library
// 現在使用後端 API 進行精準計算

import { calculateBaziFromAPI, ApiError } from './api'

export interface BaZiInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  gender: 'male' | 'female';
  location?: string;
}

export interface BaZiPillar {
  heavenlyStem: string;
  earthlyBranch: string;
  hiddenStems: string[];
  nayin: string;
  element: string;
}

export interface BaZiChart {
  yearPillar: BaZiPillar;
  monthPillar: BaZiPillar;
  dayPillar: BaZiPillar;
  hourPillar: BaZiPillar;
  tenGods: string[];
  elements: Record<string, number>;
  yinYang: { yin: number; yang: number };
}

// 天干 (Heavenly Stems)
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 地支 (Earthly Branches)  
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 五行 (Five Elements)
const ELEMENTS = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土', 
  '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水',
  '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土',
  '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金',
  '戌': '土', '亥': '水'
};

// 陰陽 (Yin Yang)
const YIN_YANG = {
  '甲': 'yang', '乙': 'yin', '丙': 'yang', '丁': 'yin', '戊': 'yang',
  '己': 'yin', '庚': 'yang', '辛': 'yin', '壬': 'yang', '癸': 'yin',
  '子': 'yang', '丑': 'yin', '寅': 'yang', '卯': 'yin', '辰': 'yang',
  '巳': 'yin', '午': 'yang', '未': 'yin', '申': 'yang', '酉': 'yin',
  '戌': 'yang', '亥': 'yin'
};

// 藏干 (Hidden Stems)
const HIDDEN_STEMS: Record<string, string[]> = {
  '子': ['癸'], '丑': ['己', '癸', '辛'], '寅': ['甲', '丙', '戊'], '卯': ['乙'],
  '辰': ['戊', '乙', '癸'], '巳': ['丙', '庚', '戊'], '午': ['丁', '己'], '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'], '酉': ['辛'], '戌': ['戊', '辛', '丁'], '亥': ['壬', '甲']
};

// 納音 (Nayin) - simplified version
const NAYIN: Record<string, string> = {
  '甲子': '海中金', '乙丑': '海中金', '丙寅': '爐中火', '丁卯': '爐中火',
  '戊辰': '大林木', '己巳': '大林木', '庚午': '路旁土', '辛未': '路旁土',
  '壬申': '劍鋒金', '癸酉': '劍鋒金', '甲戌': '山頭火', '乙亥': '山頭火',
  // ... continue for all 60 combinations
};

// 十神 (Ten Gods) relationships
const TEN_GODS = {
  same: '比肩', similar: '劫財', output: '食神', talent: '傷官',
  wealth: '正財', partialWealth: '偏財', officer: '正官', authority: '七殺',
  seal: '正印', partialSeal: '偏印'
};

/**
 * 計算八字 - 使用後端 API 進行精準計算
 * 
 * 此函數現在調用後端專業八字計算器,確保:
 * - 精確的節氣判斷(月柱)
 * - 五虎遁、五鼠遁查表
 * - 真太陽時支援
 * - 子時換日處理
 * - 完整的十神、神煞、納音計算
 * 
 * @param input 八字輸入資料
 * @returns Promise<BaZiChart> 八字命盤
 */
export async function calculateBaZi(input: BaZiInput): Promise<BaZiChart> {
  try {
    // 調用後端 API 進行計算
    const result = await calculateBaziFromAPI(input)
    return result
  } catch (error) {
    console.error('八字計算錯誤:', error)
    
    // 如果是 API 錯誤,拋出更友善的錯誤訊息
    if (error instanceof ApiError) {
      throw new Error(`八字計算失敗: ${error.message}`)
    }
    
    throw new Error('八字計算失敗,請稍後再試')
  }
}

/**
 * 舊版本的本地計算函數 (已棄用)
 * 保留作為參考,但不建議使用
 * @deprecated 請使用新的 calculateBaZi 函數,它會調用後端 API
 */
export function calculateBaZiLocal(input: BaZiInput): BaZiChart {
  const { year, month, day, hour } = input;
  
  // Calculate year pillar (simplified)
  const yearStemIndex = (year - 4) % 10;
  const yearBranchIndex = (year - 4) % 12;
  
  // Calculate month pillar (simplified - needs solar calendar conversion)
  const monthStemIndex = (yearStemIndex * 2 + month) % 10;
  const monthBranchIndex = (month - 1) % 12;
  
  // Calculate day pillar (simplified - needs actual julian day calculation)
  const daysSince1900 = Math.floor((new Date(year, month - 1, day).getTime() - new Date(1900, 0, 1).getTime()) / (1000 * 60 * 60 * 24));
  const dayStemIndex = (daysSince1900 + 9) % 10;
  const dayBranchIndex = (daysSince1900 + 1) % 12;
  
  // Calculate hour pillar
  const hourBranchIndex = Math.floor((hour + 1) / 2) % 12;
  const hourStemIndex = (dayStemIndex * 2 + hourBranchIndex) % 10;
  
  const yearPillar: BaZiPillar = {
    heavenlyStem: HEAVENLY_STEMS[yearStemIndex],
    earthlyBranch: EARTHLY_BRANCHES[yearBranchIndex],
    hiddenStems: HIDDEN_STEMS[EARTHLY_BRANCHES[yearBranchIndex]],
    nayin: NAYIN[HEAVENLY_STEMS[yearStemIndex] + EARTHLY_BRANCHES[yearBranchIndex]] || '待計算',
    element: ELEMENTS[HEAVENLY_STEMS[yearStemIndex]]
  };
  
  const monthPillar: BaZiPillar = {
    heavenlyStem: HEAVENLY_STEMS[monthStemIndex],
    earthlyBranch: EARTHLY_BRANCHES[monthBranchIndex],
    hiddenStems: HIDDEN_STEMS[EARTHLY_BRANCHES[monthBranchIndex]],
    nayin: NAYIN[HEAVENLY_STEMS[monthStemIndex] + EARTHLY_BRANCHES[monthBranchIndex]] || '待計算',
    element: ELEMENTS[HEAVENLY_STEMS[monthStemIndex]]
  };
  
  const dayPillar: BaZiPillar = {
    heavenlyStem: HEAVENLY_STEMS[dayStemIndex],
    earthlyBranch: EARTHLY_BRANCHES[dayBranchIndex],
    hiddenStems: HIDDEN_STEMS[EARTHLY_BRANCHES[dayBranchIndex]],
    nayin: NAYIN[HEAVENLY_STEMS[dayStemIndex] + EARTHLY_BRANCHES[dayBranchIndex]] || '待計算',
    element: ELEMENTS[HEAVENLY_STEMS[dayStemIndex]]
  };
  
  const hourPillar: BaZiPillar = {
    heavenlyStem: HEAVENLY_STEMS[hourStemIndex],
    earthlyBranch: EARTHLY_BRANCHES[hourBranchIndex],
    hiddenStems: HIDDEN_STEMS[EARTHLY_BRANCHES[hourBranchIndex]],
    nayin: NAYIN[HEAVENLY_STEMS[hourStemIndex] + EARTHLY_BRANCHES[hourBranchIndex]] || '待計算',
    element: ELEMENTS[HEAVENLY_STEMS[hourStemIndex]]
  };
  
  // Calculate element distribution
  const elements = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  const pillars = [yearPillar, monthPillar, dayPillar, hourPillar];
  
  pillars.forEach(pillar => {
    elements[pillar.element as keyof typeof elements]++;
    pillar.hiddenStems.forEach(stem => {
      elements[ELEMENTS[stem] as keyof typeof elements]++;
    });
  });
  
  // Calculate yin-yang distribution
  const yinYang = { yin: 0, yang: 0 };
  pillars.forEach(pillar => {
    yinYang[YIN_YANG[pillar.heavenlyStem] as keyof typeof yinYang]++;
    yinYang[YIN_YANG[pillar.earthlyBranch] as keyof typeof yinYang]++;
  });
  
  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    tenGods: [], // Simplified for now
    elements,
    yinYang
  };
}

// Helper function to get element relationship
export function getElementRelation(element1: string, element2: string): string {
  const relations: Record<string, Record<string, string>> = {
    '木': { '火': '生', '土': '克', '水': '被生', '金': '被克', '木': '同' },
    '火': { '土': '生', '金': '克', '木': '被生', '水': '被克', '火': '同' },
    '土': { '金': '生', '水': '克', '火': '被生', '木': '被克', '土': '同' },
    '金': { '水': '生', '木': '克', '土': '被生', '火': '被克', '金': '同' },
    '水': { '木': '生', '火': '克', '金': '被生', '土': '被克', '水': '同' }
  };
  
  return relations[element1]?.[element2] || '未知';
}