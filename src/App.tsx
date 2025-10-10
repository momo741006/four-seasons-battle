import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useKV } from "@github/spark/hooks";
import { BaZiInputForm } from "@/components/BaZiInputForm";
import { LegionCard } from "@/components/LegionCard";
import { TraditionalBaZi } from "@/components/TraditionalBaZi";
import { BaZiCharts } from "@/components/BaZiCharts";
import { AIStoryGenerator } from "@/components/AIStoryGenerator";
import { calculateBaZi, BaZiInput, BaZiChart } from "@/lib/bazi";
import { createLegion, Legion } from "@/lib/legion";
import { toast } from "sonner";
import { User, Scroll, ChartBar, BookOpen, Sparkle } from "@phosphor-icons/react";

function App() {
  const [baziChart, setBaziChart] = useKV<BaZiChart | null>("bazi-chart", null);
  const [legions, setLegions] = useKV<Legion[]>("user-legions", []);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedLegion, setSelectedLegion] = useState<string | null>(null);

  const handleBaZiSubmit = async (input: BaZiInput) => {
    setIsCalculating(true);
    
    try {
      // 調用後端 API 計算八字
      toast.info("正在連接後端服務...");
      const chart = await calculateBaZi(input);
      
      setBaziChart(chart);
      
      // Create legions from the chart
      const newLegions = [
        createLegion(chart.yearPillar, 'family'),
        createLegion(chart.monthPillar, 'growth'), 
        createLegion(chart.dayPillar, 'self'),
        createLegion(chart.hourPillar, 'future')
      ];
      
      setLegions(newLegions);
      toast.success("四時軍團生成成功！");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "計算失敗，請重試";
      toast.error(errorMessage);
      console.error('Ba Zi calculation error:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleStoryGenerated = (stories: string[]) => {
    // Update legions with generated stories
    setLegions(prevLegions => 
      (prevLegions || []).map((legion, index) => ({
        ...legion,
        story: stories[index] || legion.story
      }))
    );
  };

  return (
    <div className="min-h-screen bg-space">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="font-orbitron text-3xl font-bold text-center neon-text text-primary">
            四時軍團
          </h1>
          <p className="text-center text-muted-foreground mt-2">
            八字命理分析系統 - 探索你的命運軍團
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!baziChart ? (
          /* Input Form */
          <div className="max-w-2xl mx-auto">
            <BaZiInputForm onSubmit={handleBaZiSubmit} isLoading={isCalculating} />
          </div>
        ) : (
          /* Main Application */
          <Tabs defaultValue="legions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-secondary/50">
              <TabsTrigger value="legions" className="font-orbitron">
                <Sparkle className="mr-2" size={16} />
                軍團
              </TabsTrigger>
              <TabsTrigger value="traditional" className="font-orbitron">
                <Scroll className="mr-2" size={16} />
                八字
              </TabsTrigger>
              <TabsTrigger value="analysis" className="font-orbitron">
                <ChartBar className="mr-2" size={16} />
                分析
              </TabsTrigger>
              <TabsTrigger value="story" className="font-orbitron">
                <BookOpen className="mr-2" size={16} />
                故事
              </TabsTrigger>
              <TabsTrigger value="profile" className="font-orbitron">
                <User className="mr-2" size={16} />
                個人
              </TabsTrigger>
            </TabsList>

            {/* Four Legions Display */}
            <TabsContent value="legions" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-orbitron text-2xl font-bold neon-text text-primary mb-4">
                  您的四時軍團
                </h2>
                <p className="text-muted-foreground">
                  點擊軍團卡片查看詳細資訊，探索您的命運組合
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(legions || []).map((legion, index) => (
                  <LegionCard
                    key={legion.id}
                    legion={legion}
                    isActive={selectedLegion === legion.id}
                    onClick={() => setSelectedLegion(
                      selectedLegion === legion.id ? null : legion.id
                    )}
                  />
                ))}
              </div>
              
              {(legions || []).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    請先輸入您的出生資訊來生成軍團
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Traditional Ba Zi */}
            <TabsContent value="traditional">
              <TraditionalBaZi chart={baziChart} />
            </TabsContent>

            {/* Data Analysis */}
            <TabsContent value="analysis">
              <BaZiCharts chart={baziChart} />
            </TabsContent>

            {/* AI Story Generator */}
            <TabsContent value="story">
              <AIStoryGenerator 
                legions={legions || []} 
                onStoryGenerated={handleStoryGenerated}
              />
            </TabsContent>

            {/* User Profile */}
            <TabsContent value="profile" className="space-y-6">
              <div className="text-center">
                <h2 className="font-orbitron text-2xl font-bold neon-text text-primary mb-4">
                  個人檔案
                </h2>
                <p className="text-muted-foreground mb-8">
                  管理您的命盤資料與分析歷史
                </p>
                
                <div className="max-w-md mx-auto space-y-4">
                  <button 
                    onClick={() => {
                      setBaziChart(null);
                      setLegions([]);
                      setSelectedLegion(null);
                    }}
                    className="w-full p-3 bg-destructive text-destructive-foreground rounded-lg font-orbitron hover:bg-destructive/90 transition-colors"
                  >
                    重新開始分析
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-muted-foreground text-sm">
            四時軍團八字分析系統 - 傳統命理與現代科技的完美結合
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;