import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Legion } from "@/lib/legion";
import { Scroll, Sparkle, Share } from "@phosphor-icons/react";
import { toast } from "sonner";

interface AIStoryGeneratorProps {
  legions: Legion[];
  onStoryGenerated: (stories: string[]) => void;
}

export function AIStoryGenerator({ legions, onStoryGenerated }: AIStoryGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStory, setCurrentStory] = useState('');
  const [stories, setStories] = useState<string[]>([]);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateStories = async () => {
    setIsGenerating(true);
    setProgress(0);
    setStories([]);
    
    try {
      const generatedStories: string[] = [];
      
      for (let i = 0; i < legions.length; i++) {
        const legion = legions[i];
        setProgress((i / legions.length) * 100);
        
        // Create AI prompt for story generation
        const promptText = `你是一位精通中國古代軍事文學的作家。請為以下軍團創作一個引人入勝的故事：

軍團名稱：${legion.name}
主將：${legion.general.name} (${legion.general.title})
軍師：${legion.strategist.name} (${legion.strategist.title})
副將：${legion.deputy.name}

主將特質：${legion.general.personality.join(', ')}
主將優勢：${legion.general.strengths.join(', ')}

請創作一個150-200字的精彩故事，包含：
1. 軍團的起源背景
2. 主要角色的互動關係
3. 面臨的挑戰或任務
4. 體現軍團特色的情節

語調要古典而富有詩意，適合現代讀者。故事要完整且引人入勝。`;
        
        try {
          const story = await window.spark.llm(promptText, "gpt-4o-mini");
          generatedStories.push(story);
        } catch (error) {
          // Fallback story if AI generation fails
          const fallbackStory = `在${legion.theme}的時空中，${legion.general.name}率領著${legion.name}，與智慧軍師${legion.strategist.name}並肩作戰。這支軍團承載著特殊的使命，每一位成員都發揮著獨特的作用，共同書寫著屬於您的命運篇章。`;
          generatedStories.push(fallbackStory);
        }
      }
      
      setProgress(100);
      setStories(generatedStories);
      onStoryGenerated(generatedStories);
      
      // Start typewriter effect for first story
      if (generatedStories.length > 0) {
        startTypewriter(generatedStories[0]);
      }
      
      toast.success("軍團故事生成完成！");
    } catch (error) {
      toast.error("故事生成失敗，請重試");
      console.error('Story generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const startTypewriter = (text: string) => {
    setCurrentStory(text);
    setDisplayedText('');
    setIsTyping(true);
    
    let i = 0;
    const speed = 50; // ms per character
    
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);
  };

  const shareStory = async () => {
    if (stories.length === 0) return;
    
    const fullStory = stories.map((story, i) => 
      `【${legions[i].name}】\n${story}`
    ).join('\n\n');
    
    try {
      await navigator.share({
        title: '我的四時軍團命運',
        text: fullStory
      });
    } catch (error) {
      // Fallback to clipboard
      navigator.clipboard.writeText(fullStory);
      toast.success("故事已複製到剪貼板");
    }
  };

  return (
    <Card className="neon-glow">
      <CardHeader>
        <CardTitle className="font-orbitron text-xl neon-text text-primary flex items-center gap-2">
          <Scroll size={24} />
          AI軍團故事生成器
        </CardTitle>
        <p className="text-muted-foreground">
          基於您的命盤特質，AI將為每個軍團創作專屬故事
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {!stories.length && !isGenerating && (
          <div className="text-center py-8">
            <Button 
              onClick={generateStories}
              className="font-orbitron text-lg neon-glow"
              size="lg"
            >
              <Sparkle className="mr-2" size={20} />
              生成我的軍團故事
            </Button>
          </div>
        )}

        {isGenerating && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">AI正在創作您的軍團故事...</p>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2">{progress.toFixed(0)}%</p>
            </div>
          </div>
        )}

        {stories.length > 0 && (
          <div className="space-y-6">
            {/* Typewriter Display */}
            {isTyping && (
              <Card className="bg-secondary/50 border-primary/30">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-primary">
                    {legions[0]?.name}故事
                  </h4>
                  <p className="text-foreground leading-relaxed typewriter">
                    {displayedText}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* All Stories */}
            {!isTyping && (
              <div className="space-y-4">
                {stories.map((story, index) => (
                  <Card key={index} className="bg-secondary/50 border-primary/30">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-3 text-primary flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: legions[index]?.color }}
                        />
                        {legions[index]?.name}故事
                      </h4>
                      <p className="text-foreground leading-relaxed">
                        {story}
                      </p>
                    </CardContent>
                  </Card>
                ))}

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center">
                  <Button 
                    onClick={generateStories}
                    variant="outline"
                    className="font-orbitron"
                  >
                    <Sparkle className="mr-2" size={16} />
                    重新生成
                  </Button>
                  <Button 
                    onClick={shareStory}
                    variant="outline"
                    className="font-orbitron"
                  >
                    <Share className="mr-2" size={16} />
                    分享故事
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}