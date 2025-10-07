import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, User, MapPin, Clock } from "@phosphor-icons/react";
import { BaZiInput } from "@/lib/bazi";

interface BaZiInputFormProps {
  onSubmit: (data: BaZiInput) => void;
  isLoading?: boolean;
}

export function BaZiInputForm({ onSubmit, isLoading = false }: BaZiInputFormProps) {
  const [formData, setFormData] = useState<Partial<BaZiInput>>({
    year: new Date().getFullYear() - 25,
    month: 1,
    day: 1,
    hour: 12,
    minute: 0,
    gender: 'male',
    location: '台北'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.year && formData.month && formData.day && formData.hour !== undefined && formData.gender) {
      onSubmit(formData as BaZiInput);
    }
  };

  const updateField = (field: keyof BaZiInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <Card className="neon-glow">
      <CardHeader>
        <CardTitle className="font-orbitron text-2xl text-center neon-text text-primary">
          開啟你的軍團命運
        </CardTitle>
        <p className="text-center text-muted-foreground">
          輸入你的出生資訊，讓我們為你計算專屬的四時軍團
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User size={16} />
                姓名
              </Label>
              <Input
                id="name"
                placeholder="請輸入您的姓名"
                className="bg-secondary border-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender" className="flex items-center gap-2">
                <User size={16} />
                性別
              </Label>
              <Select value={formData.gender} onValueChange={(value) => updateField('gender', value)}>
                <SelectTrigger className="bg-secondary border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">男</SelectItem>
                  <SelectItem value="female">女</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Birth Date */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-lg">
              <Calendar size={16} />
              出生日期
            </Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">年</Label>
                <Select value={formData.year?.toString()} onValueChange={(value) => updateField('year', parseInt(value))}>
                  <SelectTrigger className="bg-secondary border-primary/20">
                    <SelectValue placeholder="年份" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="month">月</Label>
                <Select value={formData.month?.toString()} onValueChange={(value) => updateField('month', parseInt(value))}>
                  <SelectTrigger className="bg-secondary border-primary/20">
                    <SelectValue placeholder="月份" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(month => (
                      <SelectItem key={month} value={month.toString()}>{month}月</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="day">日</Label>
                <Select value={formData.day?.toString()} onValueChange={(value) => updateField('day', parseInt(value))}>
                  <SelectTrigger className="bg-secondary border-primary/20">
                    <SelectValue placeholder="日期" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day} value={day.toString()}>{day}日</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Birth Time */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-lg">
              <Clock size={16} />
              出生時間
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hour">時</Label>
                <Select value={formData.hour?.toString()} onValueChange={(value) => updateField('hour', parseInt(value))}>
                  <SelectTrigger className="bg-secondary border-primary/20">
                    <SelectValue placeholder="小時" />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map(hour => (
                      <SelectItem key={hour} value={hour.toString()}>{hour}時</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="minute">分</Label>
                <Input
                  id="minute"
                  type="number"
                  min="0"
                  max="59"
                  value={formData.minute || 0}
                  onChange={(e) => updateField('minute', parseInt(e.target.value) || 0)}
                  className="bg-secondary border-primary/20"
                  placeholder="分鐘"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin size={16} />
              出生地點
            </Label>
            <Input
              id="location"
              value={formData.location || ''}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="請輸入出生城市"
              className="bg-secondary border-primary/20"
            />
          </div>

          {/* Submit */}
          <Button 
            type="submit" 
            className="w-full font-orbitron text-lg neon-glow" 
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? '正在計算軍團...' : '生成我的四時軍團'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}