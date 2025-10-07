# 四時軍團八字命理分析系統 PRD

將傳統八字命理與現代遊戲化軍團戰略風格完美結合，打造互動式個人命盤分析平台。

**Experience Qualities**:
1. **遊戲化體驗** - 將傳統命理轉化為軍團戰略遊戲風格，增強趣味性與參與感
2. **視覺震撼** - 深色背景搭配螢光霓虹效果，營造未來科技感與神秘氛圍  
3. **智慧互動** - AI驅動的故事生成與智能分析，提供個人化深度洞察

**Complexity Level**: Complex Application (advanced functionality, accounts)
- 涉及複雜的八字演算法、AI故事生成、多維數據視覺化和用戶資料管理系統

## Essential Features

### 1. 個人資料輸入系統
- **Functionality**: 收集用戶出生資訊並自動計算八字命盤
- **Purpose**: 提供精確的命理分析基礎數據
- **Trigger**: 用戶點擊"開始分析"或訪問首頁
- **Progression**: 輸入表單 → 資料驗證 → 八字計算 → 結果顯示
- **Success criteria**: 正確生成四柱八字、十神、藏干、納音等完整命盤資訊

### 2. 四時軍團卡片系統
- **Functionality**: 將四柱轉化為四個主題軍團，每個軍團包含主將、軍師、副將等角色
- **Purpose**: 遊戲化呈現命理資訊，增強理解與記憶
- **Trigger**: 成功生成命盤後自動顯示軍團卡片
- **Progression**: 命盤生成 → 軍團分配 → AI故事創作 → 互動展示
- **Success criteria**: 四張主題卡片正確對應年月日時柱，包含角色設定與AI故事

### 3. 數據視覺化分析
- **Functionality**: 陰陽五行平衡度圖表、雷達圖、運勢分析面板
- **Purpose**: 直觀呈現命盤特質與運勢趨向
- **Trigger**: 用戶切換到分析標籤頁
- **Progression**: 數據計算 → 圖表渲染 → 互動展示 → 詳細解釋
- **Success criteria**: 準確的平衡度計算與美觀的圖表展示

### 4. AI故事生成器
- **Functionality**: 根據用戶命盤自動創作個人化軍團故事
- **Purpose**: 提供娛樂性內容，增強用戶黏性與分享意願
- **Trigger**: 軍團卡片載入完成後自動生成
- **Progression**: 命盤分析 → 故事模板匹配 → AI文本生成 → 打字機效果展示
- **Success criteria**: 生成符合命盤特質的連貫故事，支援分享功能

### 5. 八字百科知識庫
- **Functionality**: 可搜尋的命理知識庫與軍團對照系統
- **Purpose**: 教育用戶理解傳統命理與新系統的對應關係
- **Trigger**: 用戶點擊百科標籤或角色說明
- **Progression**: 關鍵字搜尋 → 條目展示 → 相關連結 → 深度學習
- **Success criteria**: 完整的知識庫內容與流暢的查詢體驗

## Edge Case Handling
- **無效出生日期**: 即時驗證並提供修正建議
- **AI生成失敗**: 顯示預設故事模板並提供重新生成選項
- **數據載入錯誤**: 優雅的錯誤提示與重試機制
- **移動端適配**: 響應式布局確保各設備完美體驗
- **網路中斷**: 離線緩存基本功能與數據

## Design Direction
設計應營造未來科技感的神秘氛圍，結合傳統東方美學與現代遊戲UI風格，通過深色背景與螢光色彩對比創造視覺衝擊力，同時保持功能性與易用性的平衡。

## Color Selection
採用 Complementary (opposite colors) 配色方案，營造強烈視覺對比與科技感

- **Primary Color**: 螢光藍 #00D4FF - 代表智慧與未來科技，用於主要按鈕與強調元素
- **Secondary Colors**: 深太空藍 #0A0E27 作為主背景，營造深邃神秘感
- **Accent Color**: 霓虹紫 #BB00FF - 用於重要提示與互動反饋，增強遊戲感
- **四軍團專屬色**:
  - 家族兵團(年柱): 金棕 #FFB366 - 傳承與穩重
  - 成長兵團(月柱): 綠黃 #CCFF00 - 活力與發展  
  - 本我兵團(日柱): 藍紫 #6600FF - 核心與本質
  - 未來兵團(時柱): 橙紅 #FF3366 - 激情與目標

**Foreground/Background Pairings**:
- Background (深太空藍 #0A0E27): 螢光藍文字 #00D4FF - 對比度 8.2:1 ✓
- Card (半透明深藍 #1A1F3A): 白色文字 #FFFFFF - 對比度 9.1:1 ✓
- Primary (螢光藍 #00D4FF): 深藍文字 #0A0E27 - 對比度 8.2:1 ✓
- Accent (霓虹紫 #BB00FF): 白色文字 #FFFFFF - 對比度 6.8:1 ✓

## Font Selection
選用現代科技感字體，中文使用思源黑體確保清晰度，英文使用 Orbitron 營造未來感，數字使用等寬字體保持對齊美觀。

- **Typographic Hierarchy**:
  - H1 (應用標題): Orbitron Bold/32px/緊密字距 - 科技感標題
  - H2 (區域標題): 思源黑體 Medium/24px/標準字距 - 功能區標識
  - H3 (軍團名稱): Orbitron Semi-bold/20px/適中字距 - 軍團標題
  - Body (內容文字): 思源黑體 Regular/16px/1.6行高 - 易讀性優先
  - Caption (說明文字): 思源黑體 Light/14px/1.5行高 - 輔助資訊

## Animations
動畫設計以功能性為先，適度添加遊戲化樂趣，避免過度炫技影響使用體驗，重點營造軍團戰略遊戲的沉浸感。

- **Purposeful Meaning**: 卡片翻轉模擬實體卡牌感，數據載入動畫增強科技感，故事打字機效果提升敘事體驗
- **Hierarchy of Movement**: 
  - 高優先級: 用戶操作反饋動畫 (100-200ms)
  - 中優先級: 數據載入與狀態轉換 (300-500ms)  
  - 低優先級: 裝飾性動畫與氛圍效果 (800-1200ms)

## Component Selection
- **Components**: 
  - Cards: 軍團卡片展示，支援翻轉與懸停效果
  - Tabs: 五大功能區域切換，支援鍵盤導航
  - Forms: 個人資料輸入，即時驗證與錯誤提示
  - Charts: 數據視覺化，使用 recharts 建置雷達圖與圓餅圖
  - Dialog: 詳細資訊彈窗，支援鍵盤關閉
  - Progress: 故事生成進度條，增強等待體驗

- **Customizations**: 
  - 軍團主題卡片組件: 結合角色頭像、故事文本與數據展示
  - 八字命盤展示組件: 傳統格式現代化設計
  - AI故事打字機組件: 逐字顯示效果與暫停控制

- **States**: 
  - 按鈕: default/hover/active/loading/disabled 五種狀態
  - 卡片: 正面/翻轉/選中/載入中四種狀態
  - 輸入框: focus/valid/invalid/loading四種反饋

- **Icon Selection**: 使用 @phosphor-icons/react 的軍事與科技圖標，包含 Sword, Shield, Crown, Lightning 等

- **Spacing**: 使用 Tailwind 8px 基礎網格系統，卡片間距 24px，內容邊距 16px

- **Mobile**: 
  - 桌面: 四軍團橫向排列，側邊欄導航
  - 平板: 2x2 網格布局，頂部標籤導航  
  - 手機: 單列垂直排列，底部標籤導航，卡片全寬展示