import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BaZiChart } from "@/lib/bazi";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";

interface TraditionalBaZiProps {
  chart: BaZiChart;
}

export function TraditionalBaZi({ chart }: TraditionalBaZiProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const pillars = [
    { name: '年柱', pillar: chart.yearPillar, description: '祖先、家族、早年' },
    { name: '月柱', pillar: chart.monthPillar, description: '父母、成長、青年' },
    { name: '日柱', pillar: chart.dayPillar, description: '自己、配偶、中年' },
    { name: '時柱', pillar: chart.hourPillar, description: '子女、晚年、事業' }
  ];

  const getElementColor = (element: string) => {
    const colors: Record<string, string> = {
      '木': 'text-green-400',
      '火': 'text-red-400', 
      '土': 'text-yellow-400',
      '金': 'text-gray-300',
      '水': 'text-blue-400'
    };
    return colors[element] || 'text-foreground';
  };

  return (
    <Card className="neon-glow">
      <CardHeader>
        <CardTitle className="font-orbitron text-xl neon-text text-primary">
          傳統八字命盤
        </CardTitle>
        <p className="text-muted-foreground">
          四柱八字排盤，展現您的天賦與命運軌跡
        </p>
      </CardHeader>
      <CardContent>
        {/* Main Ba Zi Chart */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {pillars.map((item, index) => (
            <div key={index} className="text-center">
              <div className="mb-2">
                <Badge variant="outline" className="mb-1">
                  {item.name}
                </Badge>
                <div className="text-xs text-muted-foreground">
                  {item.description}
                </div>
              </div>
              
              {/* Heavenly Stem */}
              <div className="border border-primary/30 bg-secondary/50 p-3 rounded-t-lg">
                <div className={`text-2xl font-bold ${getElementColor(item.pillar.element)}`}>
                  {item.pillar.heavenlyStem}
                </div>
                <div className="text-xs text-muted-foreground">天干</div>
              </div>
              
              {/* Earthly Branch */}
              <div className="border border-primary/30 bg-secondary/30 p-3 rounded-b-lg border-t-0">
                <div className={`text-2xl font-bold ${getElementColor(item.pillar.element)}`}>
                  {item.pillar.earthlyBranch}
                </div>
                <div className="text-xs text-muted-foreground">地支</div>
              </div>
              
              {/* Element */}
              <div className="mt-2">
                <Badge variant="secondary" className={getElementColor(item.pillar.element)}>
                  {item.pillar.element}行
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Expandable Details */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger className="flex items-center justify-center w-full p-2 text-primary hover:text-primary/80 transition-colors">
            <span className="mr-2">查看詳細資訊</span>
            <CaretDown 
              size={16} 
              className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            />
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-6">
            {/* Hidden Stems */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-primary">藏干詳情</h4>
              <div className="grid grid-cols-2 gap-4">
                {pillars.map((item, index) => (
                  <div key={index} className="border border-border rounded-lg p-3">
                    <div className="font-medium mb-2">{item.name}藏干</div>
                    <div className="flex flex-wrap gap-1">
                      {item.pillar.hiddenStems.map((stem, stemIndex) => (
                        <Badge 
                          key={stemIndex} 
                          variant="outline" 
                          className="text-xs"
                        >
                          {stem}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nayin */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-primary">納音五行</h4>
              <div className="grid grid-cols-2 gap-4">
                {pillars.map((item, index) => (
                  <div key={index} className="border border-border rounded-lg p-3">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-muted-foreground">{item.pillar.nayin}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ten Gods (simplified) */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-primary">十神關係</h4>
              <div className="bg-secondary/50 rounded-lg p-4">
                <p className="text-muted-foreground text-sm">
                  十神分析功能正在開發中，敬請期待...
                </p>
              </div>
            </div>

            {/* Element Analysis */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-primary">五行統計</h4>
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(chart.elements).map(([element, count]) => (
                  <div key={element} className="text-center border border-border rounded-lg p-3">
                    <div className={`text-xl font-bold ${getElementColor(element)}`}>
                      {count}
                    </div>
                    <div className="text-sm">{element}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Yin Yang Balance */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-primary">陰陽平衡</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center border border-border rounded-lg p-3">
                  <div className="text-xl font-bold text-orange-400">
                    {chart.yinYang.yang}
                  </div>
                  <div className="text-sm">陽</div>
                </div>
                <div className="text-center border border-border rounded-lg p-3">
                  <div className="text-xl font-bold text-blue-400">
                    {chart.yinYang.yin}
                  </div>
                  <div className="text-sm">陰</div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}