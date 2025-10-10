# 前後端整合變更記錄

## 日期: 2025-10-10

### 🎯 目標
整合前端與後端 API,讓前端調用後端專業八字計算器進行精準計算

### 📝 變更內容

#### 1. 新增 API 客戶端模組 (`src/lib/api.ts`)
**功能**:
- 建立與後端通訊的 API 客戶端
- 提供 `calculateBaziFromAPI()` 函數調用後端計算 API
- 提供 `checkApiHealth()` 函數檢查後端服務健康狀態
- 實作完整的錯誤處理機制

**技術細節**:
- API 端點: `POST /api/bazi/generate`
- 後端 URL: `https://rainbow-sanctuary-bazu-production.up.railway.app`
- 支援環境變數 `VITE_API_BASE_URL` 覆寫 API 位址
- 自動轉換前後端資料格式

#### 2. 修改八字計算邏輯 (`src/lib/bazi.ts`)
**變更**:
- `calculateBaZi()` 函數改為非同步函數 (`async`)
- 移除本地簡化計算邏輯,改為調用後端 API
- 保留舊版本本地計算函數為 `calculateBaZiLocal()` (已標記為 deprecated)

**原因**:
- 本地計算存在以下問題:
  - 月柱計算錯誤: 使用陽曆月份而非節氣
  - 日柱計算過於簡化: 未考慮真太陽時和子時換日
  - 納音資料不完整: 只有 12 組,應該有 60 組

**改進**:
- 後端使用專業八字計算器 (`ProfessionalBaziCalculator`)
- 符合規格書 v8.1 要求:
  - ✅ 精確的節氣判斷(月柱)
  - ✅ 五虎遁、五鼠遁查表
  - ✅ 真太陽時支援
  - ✅ 子時換日處理
  - ✅ 完整的十神、神煞、納音計算

#### 3. 更新前端組件 (`src/App.tsx`)
**變更**:
- `handleBaZiSubmit()` 函數改為正確處理非同步 API 調用
- 添加 `await` 關鍵字等待 API 回應
- 改進錯誤訊息顯示
- 添加 API 調用進度提示

**用戶體驗改進**:
- 顯示「正在連接後端服務...」提示
- 更詳細的錯誤訊息
- 保持原有的載入狀態指示器

#### 4. 環境配置
**新增檔案**:
- `.env.example`: 環境變數範例
- `.env`: 實際環境變數配置

**配置內容**:
```
VITE_API_BASE_URL=https://rainbow-sanctuary-bazu-production.up.railway.app
```

### 🔧 技術架構

#### 資料流程
```
使用者輸入
    ↓
BaZiInputForm 組件
    ↓
App.tsx (handleBaZiSubmit)
    ↓
calculateBaZi() [src/lib/bazi.ts]
    ↓
calculateBaziFromAPI() [src/lib/api.ts]
    ↓
後端 API: POST /api/bazi/generate
    ↓
ProfessionalBaziCalculator [後端]
    ↓
回傳完整八字資料
    ↓
前端顯示結果
```

#### API 請求格式
```json
{
  "name": "使用者",
  "birthday": "1990-09-27T08:32:00",
  "sex": "M",
  "location": "台北",
  "timezone": "+08:00",
  "options": {
    "debug": false,
    "useTrueSolarTime": false,
    "use_early_zi": true,
    "longitude": 121.5
  }
}
```

#### API 回應格式
```json
{
  "success": true,
  "user_id": 1,
  "chart_id": 1,
  "bazi": {
    "year": ["庚", "午"],
    "month": ["乙", "酉"],
    "day": ["乙", "未"],
    "hour": ["庚", "辰"]
  },
  "five_elements": {
    "木": 2,
    "火": 1,
    "土": 1,
    "金": 3,
    "水": 1
  },
  "ten_gods": [...],
  "nayin": {...},
  "shensha": [...]
}
```

### ✅ 測試計劃

#### 單元測試
- [ ] API 客戶端連接測試
- [ ] 資料格式轉換測試
- [ ] 錯誤處理測試

#### 整合測試
- [ ] 完整的八字計算流程測試
- [ ] 使用規格書中的測試案例:
  - [ ] 1985/10/06 19:30 → 乙丑 乙酉 戊寅 壬戌
  - [ ] 1990/09/27 08:32 → 庚午 乙酉 乙未 庚辰
  - [ ] 節氣邊界測試案例

#### 用戶體驗測試
- [ ] 載入狀態顯示
- [ ] 錯誤訊息友善性
- [ ] 網路斷線處理

### 🐛 已知問題

1. **CORS 設定**: 需確認後端允許前端域名的跨域請求
2. **錯誤處理**: 需要更完善的降級方案(如後端不可用時使用本地計算)
3. **快取機制**: 未實作 API 回應快取

### 📋 後續工作

1. **測試與驗證**
   - 在開發環境測試整合
   - 使用標準測試案例驗證計算準確性
   - 測試錯誤情況處理

2. **優化**
   - 實作 API 回應快取
   - 添加重試機制
   - 實作降級方案

3. **文檔**
   - 更新 README.md
   - 添加 API 使用說明
   - 建立故障排除指南

### 📚 參考資料

- 規格書: `《虹靈御所八字人生兵法》系統規格書v8.1（合併版）.docx`
- 後端倉庫: `Madison-de-Chao/hongling-bazi-system`
- 前端倉庫: `momo741006/four-seasons-battle`
- 後端 API: `https://rainbow-sanctuary-bazu-production.up.railway.app`

### 🔐 安全性考量

- API 金鑰管理: 目前後端 API 無需認證,未來可能需要添加
- 資料驗證: 前後端都應驗證輸入資料
- 錯誤訊息: 避免洩露敏感資訊

### 💡 備註

- 本次整合保留了舊版本的本地計算函數 `calculateBaZiLocal()`,以便在需要時作為降級方案
- 所有變更都向後兼容,不會影響現有功能
- API 調用是非同步的,確保不會阻塞 UI

