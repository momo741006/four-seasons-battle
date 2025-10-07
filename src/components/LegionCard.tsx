import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Legion } from "@/lib/legion";
import { Sword, Shield, Crown, Sparkle } from "@phosphor-icons/react";
import { useState } from "react";

interface LegionCardProps {
  legion: Legion;
  isActive?: boolean;
  onClick?: () => void;
}

export function LegionCard({ legion, isActive = false, onClick }: LegionCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    onClick?.();
  };

  return (
    <Card 
      className={`legion-card cursor-pointer relative min-h-[400px] ${isActive ? 'neon-glow' : ''}`}
      style={{ borderColor: legion.color }}
      onClick={handleCardClick}
    >
      <div className="absolute inset-0 p-6">
        {!isFlipped ? (
          /* Front side */
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-orbitron text-xl font-bold neon-text" style={{ color: legion.color }}>
                {legion.name}
              </h3>
              <Badge variant="outline" style={{ borderColor: legion.color, color: legion.color }}>
                {legion.general.element}行
              </Badge>
            </div>
            
            <p className="text-muted-foreground text-sm mb-6">{legion.description}</p>
            
            <div className="space-y-4 flex-1">
              {/* General */}
              <div className="flex items-center space-x-3">
                <Crown className="text-yellow-400" size={20} />
                <div>
                  <div className="font-medium">{legion.general.name}</div>
                  <div className="text-sm text-muted-foreground">{legion.general.title}</div>
                </div>
              </div>
              
              {/* Strategist */}
              <div className="flex items-center space-x-3">
                <Sword className="text-blue-400" size={20} />
                <div>
                  <div className="font-medium">{legion.strategist.name}</div>
                  <div className="text-sm text-muted-foreground">{legion.strategist.title}</div>
                </div>
              </div>
              
              {/* Deputy */}
              <div className="flex items-center space-x-3">
                <Shield className="text-green-400" size={20} />
                <div>
                  <div className="font-medium">{legion.deputy.name}</div>
                  <div className="text-sm text-muted-foreground">副將</div>
                </div>
              </div>
              
              {/* Soldiers */}
              {legion.soldiers.length > 0 && (
                <div className="flex items-center space-x-3">
                  <Sparkle className="text-purple-400" size={20} />
                  <div>
                    <div className="font-medium">奇謀士兵</div>
                    <div className="text-sm text-muted-foreground">
                      {legion.soldiers.map(s => s.name).join(', ')}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-auto pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                點擊翻轉查看詳情
              </p>
            </div>
          </div>
        ) : (
          /* Back side */
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-orbitron text-xl font-bold neon-text" style={{ color: legion.color }}>
                軍團詳情
              </h3>
            </div>
            
            <div className="space-y-4 flex-1 text-sm">
              <div>
                <h4 className="font-medium mb-2 text-primary">主將特質</h4>
                <div className="space-y-1">
                  {legion.general.personality.map((trait, i) => (
                    <div key={i} className="text-muted-foreground">• {trait}</div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 text-primary">優勢能力</h4>
                <div className="space-y-1">
                  {legion.general.strengths.map((strength, i) => (
                    <div key={i} className="text-green-400">• {strength}</div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 text-primary">需要注意</h4>
                <div className="space-y-1">
                  {legion.general.weaknesses.map((weakness, i) => (
                    <div key={i} className="text-orange-400">• {weakness}</div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                點擊返回軍團概覽
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}