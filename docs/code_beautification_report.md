# 代碼美化審查與改進建議

## 摘要

本報告旨在對 `four-seasons-battle` 儲存庫的代碼美化配置與實施狀況進行全面審查,並提供具體的改進建議。經過分析,我們發現該專案目前缺乏一套統一且自動化的代碼格式化規範,導致代碼風格不一致,可讀性有待提升。主要問題包括：混合使用單雙引號、行尾多餘空格、部分代碼行過長,以及缺乏對 JSX/TSX 組件屬性的標準化排序。

為了解決這些問題,我們建議引入 **Prettier** 作為主要的代碼格式化工具,並搭配 **ESLint** 進行代碼質量檢查,同時建立 **.editorconfig** 檔案以確保開發環境的一致性。本報告將詳細說明當前的問題、建議的解決方案,並提供具體的實施步驟,以期提升代碼庫的整體質量與可維護性。

## 1. 現狀分析

在第一和第二階段,我們對儲存庫的結構和既有配置進行了分析。主要發現如下：

- **缺乏格式化工具配置**：專案根目錄下沒有找到 `.prettierrc`, `.editorconfig`, 或 `biome.json` 等常見的代碼格式化配置文件。
- **ESLint 配置不完整**：雖然 `package.json` 中包含了 `eslint` 作為開發依賴,但缺少一個明確的配置文件 (如 `eslint.config.js` 或 `.eslintrc.js`)。這意味著專案可能依賴於編輯器的預設規則或未經統一的本地配置,無法確保團隊成員之間的一致性。
- **TypeScript 配置**：`tsconfig.json` 檔案存在,但其配置主要集中在編譯選項,未涉及代碼風格。

## 2. 代碼格式一致性檢查

在第三階段,我們對 `src` 目錄下的 `.ts` 和 `.tsx` 檔案進行了抽樣和批量檢查,發現了多個一致性問題：

| 檢查項目 | 發現的問題 |
| :--- | :--- |
| **引號使用** | 專案中混合使用了單引號 (`'`) 和雙引號 (`"`)。例如,`App.tsx` 中同時存在 `import { useState } from "react";` 和 `createLegion(chart.yearPillar, 'family')`。 |
| **縮排** | 大部分檔案使用 2 個空格進行縮排,但這並非強制規則。我們沒有發現 Tab 字符的使用。 |
| **分號** | 大部分語句結尾都使用了分號,但在某些地方可能存在遺漏。 |
| **行尾空格** | 發現了 88 處行尾存在多餘的空格,這會對版本控制造成不必要的干擾。 |
| **行長度** | 發現 147 行代碼超過了 100 個字符,部分甚至超過 120 個字符,影響了代碼的可讀性。 |
| **空行使用** | 在某些檔案中存在不必要的連續空行,或在代碼塊之間缺乏必要的空行來區分邏輯。 |
| **JSX/TSX 屬性** | 組件的屬性 (props) 沒有統一的換行和排序規則,降低了可讀性。 |

## 3. 改進建議與實施方案

為了建立一個乾淨、一致且易於維護的代碼庫,我們強烈建議引入 Prettier,並完善 ESLint 的配置。

### 3.1. 引入 Prettier 進行自動化格式化

Prettier 是一個有主見的代碼格式化工具,可以自動處理大部分代碼風格問題,讓團隊成員無需在代碼審查中爭論風格。

**實施步驟：**

1.  **安裝 Prettier**:

    ```bash
    npm install --save-dev prettier
    ```

2.  **建立 Prettier 配置文件 (`.prettierrc.json`)**：

    在專案根目錄建立此檔案,並填入以下建議配置：

    ```json
    {
      "semi": true,
      "singleQuote": true,
      "jsxSingleQuote": true,
      "trailingComma": "es5",
      "printWidth": 100,
      "tabWidth": 2,
      "useTabs": false,
      "bracketSpacing": true,
      "jsxBracketSameLine": false,
      "arrowParens": "always"
    }
    ```

3.  **建立忽略檔案 (`.prettierignore`)**：

    ```
    # Ignore artifacts:
    build
    dist
    coverage
    node_modules

    # Ignore generated files:
    package-lock.json
    ```

4.  **在 `package.json` 中新增腳本**：

    ```json
    "scripts": {
      // ... other scripts
      "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
      "format:check": "prettier --check \"src/**/*.{ts,tsx,css,md}\""
    },
    ```

5.  **格式化整個專案**：

    執行以下命令,對現有代碼進行一次性格式化。

    ```bash
    npm run format
    ```

### 3.2. 完善 ESLint 配置

為了避免 ESLint 和 Prettier 在格式化規則上產生衝突,需要進行整合。

**實施步驟：**

1.  **安裝 ESLint-Prettier 整合套件**：

    ```bash
    npm install --save-dev eslint-config-prettier
    ```

2.  **建立 ESLint 配置文件 (`eslint.config.js`)**：

    這是一個現代化的 ESLint 配置方式。在專案根目錄建立此檔案。

    ```javascript
    import globals from "globals";
    import tseslint from "typescript-eslint";
    import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
    import prettierConfig from "eslint-config-prettier";

    export default [
      { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
      { languageOptions: { globals: globals.browser } },
      ...tseslint.configs.recommended,
      pluginReactConfig,
      prettierConfig, // 確保這是最後一個,以覆蓋其他配置中的樣式規則
      {
        rules: {
          // 在這裡可以添加不與 Prettier 衝突的規則
          "react/react-in-jsx-scope": "off", // React 17+ 不需要
          "react/prop-types": "off" // 如果使用 TypeScript,可以關閉
        }
      }
    ];
    ```

### 3.3. 建立 EditorConfig

`.editorconfig` 檔案可以幫助在不同的編輯器和 IDE 之間保持一致的編碼風格。

在專案根目錄建立 `.editorconfig` 檔案：

```ini
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

### 3.4. (可選) 使用 Git Hooks 自動化檢查

為了確保所有提交的代碼都符合規範,可以設定在 `pre-commit` 階段自動運行格式化和檢查。

1.  **安裝 `husky`**：

    ```bash
    npm install --save-dev husky
    npx husky init
    ```

2.  **建立 `pre-commit` 鉤子**：

    ```bash
    echo "npm run format:check" > .husky/pre-commit
    ```

## 4. 結論

通過引入 Prettier、完善 ESLint 配置並建立 `.editorconfig`, `four-seasons-battle` 專案將能夠建立一套自動化、一致的代碼風格規範。這不僅能顯著提升代碼的可讀性和可維護性,還能讓開發團隊更專注於業務邏輯的實現,而非格式問題的爭論,從而提高整體開發效率和協作體驗。

建議團隊立即採納以上方案,並對現有代碼庫進行一次全面的格式化,為專案的長遠發展奠定堅實的基礎。

