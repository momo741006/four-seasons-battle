import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { CheckCircle2, AlertCircle, Code2, FileCode, Settings, Sparkles } from 'lucide-react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('summary')

  const issues = [
    { type: 'warning', title: '混合使用單雙引號', count: 1713, description: '專案中同時存在單引號和雙引號,影響代碼一致性' },
    { type: 'warning', title: '行尾多餘空格', count: 88, description: '發現多處行尾存在多餘空格,影響版本控制' },
    { type: 'error', title: '代碼行過長', count: 147, description: '超過 100 個字符的行,影響可讀性' },
    { type: 'info', title: '缺乏格式化配置', count: 1, description: '未找到 Prettier 或 EditorConfig 配置文件' },
  ]

  const solutions = [
    {
      title: '引入 Prettier',
      description: '自動化代碼格式化工具,統一代碼風格',
      steps: ['安裝 Prettier', '建立配置文件', '添加格式化腳本', '執行全專案格式化'],
      priority: 'high'
    },
    {
      title: '完善 ESLint 配置',
      description: '整合 ESLint 與 Prettier,避免規則衝突',
      steps: ['安裝整合套件', '建立配置文件', '設定規則', '測試運行'],
      priority: 'high'
    },
    {
      title: '建立 EditorConfig',
      description: '確保不同編輯器間的一致性',
      steps: ['建立 .editorconfig', '設定基本規則', '團隊成員同步'],
      priority: 'medium'
    },
    {
      title: '設定 Git Hooks',
      description: '自動化檢查,確保提交代碼符合規範',
      steps: ['安裝 husky', '建立 pre-commit 鉤子', '配置檢查腳本'],
      priority: 'medium'
    }
  ]

  const prettierConfig = {
    semi: true,
    singleQuote: true,
    jsxSingleQuote: true,
    trailingComma: 'es5',
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    bracketSpacing: true,
    jsxBracketSameLine: false,
    arrowParens: 'always'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  代碼美化審查報告
                </h1>
                <p className="text-sm text-muted-foreground">Four Seasons Battle 專案</p>
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              <Sparkles className="w-3 h-3 mr-1" />
              2025-10-10
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="summary" className="gap-2">
              <FileCode className="w-4 h-4" />
              摘要
            </TabsTrigger>
            <TabsTrigger value="analysis" className="gap-2">
              <AlertCircle className="w-4 h-4" />
              問題分析
            </TabsTrigger>
            <TabsTrigger value="solutions" className="gap-2">
              <CheckCircle2 className="w-4 h-4" />
              解決方案
            </TabsTrigger>
            <TabsTrigger value="config" className="gap-2">
              <Settings className="w-4 h-4" />
              配置範例
            </TabsTrigger>
          </TabsList>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">執行摘要</CardTitle>
                <CardDescription>專案代碼美化狀況總覽</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  本報告對 <code className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm">four-seasons-battle</code> 儲存庫進行了全面的代碼美化審查。
                  經過分析,我們發現該專案目前<strong>缺乏統一且自動化的代碼格式化規範</strong>,導致代碼風格不一致,可讀性有待提升。
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <h3 className="font-semibold text-red-900 dark:text-red-100">主要問題</h3>
                    </div>
                    <ul className="space-y-1 text-sm text-red-800 dark:text-red-200">
                      <li>• 混合使用單雙引號</li>
                      <li>• 行尾多餘空格</li>
                      <li>• 部分代碼行過長</li>
                      <li>• 缺乏格式化工具配置</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-green-900 dark:text-green-100">建議方案</h3>
                    </div>
                    <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
                      <li>• 引入 Prettier 自動格式化</li>
                      <li>• 完善 ESLint 配置</li>
                      <li>• 建立 EditorConfig</li>
                      <li>• 設定 Git Hooks 自動檢查</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">預期效益</h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    通過引入這些工具和規範,專案將能夠建立一套<strong>自動化、一致的代碼風格</strong>,
                    顯著提升代碼的可讀性和可維護性,讓開發團隊更專注於業務邏輯的實現。
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {issues.map((issue, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {issue.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                        {issue.type === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-500" />}
                        {issue.type === 'info' && <AlertCircle className="w-5 h-5 text-blue-500" />}
                        {issue.title}
                      </CardTitle>
                      <Badge variant={issue.type === 'error' ? 'destructive' : 'secondary'}>
                        {issue.count}
                      </Badge>
                    </div>
                    <CardDescription>{issue.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>詳細分析</CardTitle>
                <CardDescription>代碼格式一致性檢查結果</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4 font-semibold">檢查項目</th>
                          <th className="text-left py-2 px-4 font-semibold">發現的問題</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">引號使用</td>
                          <td className="py-3 px-4 text-muted-foreground">
                            混合使用單引號和雙引號,影響一致性
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">縮排</td>
                          <td className="py-3 px-4 text-muted-foreground">
                            大部分使用 2 個空格,但未強制規範
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">行尾空格</td>
                          <td className="py-3 px-4 text-muted-foreground">
                            發現 88 處行尾多餘空格
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">行長度</td>
                          <td className="py-3 px-4 text-muted-foreground">
                            147 行超過 100 字符,部分超過 120 字符
                          </td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">JSX 屬性</td>
                          <td className="py-3 px-4 text-muted-foreground">
                            缺乏統一的換行和排序規則
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Solutions Tab */}
          <TabsContent value="solutions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {solutions.map((solution, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{solution.title}</CardTitle>
                      <Badge variant={solution.priority === 'high' ? 'default' : 'secondary'}>
                        {solution.priority === 'high' ? '高優先級' : '中優先級'}
                      </Badge>
                    </div>
                    <CardDescription>{solution.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold mb-2">實施步驟:</p>
                      <ol className="space-y-2">
                        {solution.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-2 text-sm">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                              {stepIndex + 1}
                            </span>
                            <span className="text-muted-foreground">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Config Tab */}
          <TabsContent value="config" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Prettier 配置範例</CardTitle>
                <CardDescription>建議的 .prettierrc.json 配置</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{JSON.stringify(prettierConfig, null, 2)}</code>
                </pre>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>EditorConfig 配置範例</CardTitle>
                <CardDescription>建議的 .editorconfig 配置</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false`}</code>
                </pre>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Package.json 腳本</CardTitle>
                <CardDescription>建議添加的格式化腳本</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`"scripts": {
  "format": "prettier --write \\"src/**/*.{ts,tsx,css,md}\\"",
  "format:check": "prettier --check \\"src/**/*.{ts,tsx,css,md}\\""
}`}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer CTA */}
        <Card className="mt-8 border-2 border-primary/20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">立即開始改善</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                建議團隊立即採納以上方案,並對現有代碼庫進行一次全面的格式化,
                為專案的長遠發展奠定堅實的基礎。
              </p>
              <div className="flex gap-4 justify-center pt-2">
                <Button size="lg" className="gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  查看完整報告
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Code2 className="w-4 h-4" />
                  前往 GitHub
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>代碼美化審查報告 © 2025 | 由 Manus AI 生成</p>
        </div>
      </footer>
    </div>
  )
}

export default App

