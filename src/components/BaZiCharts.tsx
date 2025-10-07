import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { BaZiChart } from "@/lib/bazi";

interface BaZiChartsProps {
  chart: BaZiChart;
}

export function BaZiCharts({ chart }: BaZiChartsProps) {
  // Prepare element data for charts
  const elementData = Object.entries(chart.elements).map(([element, count]) => ({
    name: element,
    value: count,
    fullMark: 8 // Maximum possible (4 stems + 4 branches)
  }));

  const yinYangData = [
    { name: '陽', value: chart.yinYang.yang, color: '#FF6B35' },
    { name: '陰', value: chart.yinYang.yin, color: '#004E89' }
  ];

  // Element colors
  const elementColors: Record<string, string> = {
    '木': 'oklch(0.65 0.20 120)', // Green
    '火': 'oklch(0.65 0.25 20)',  // Red
    '土': 'oklch(0.65 0.15 60)',  // Yellow/Brown
    '金': 'oklch(0.70 0.10 240)', // Gold/White
    '水': 'oklch(0.60 0.25 240)'  // Blue
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Five Elements Distribution */}
      <Card className="neon-glow">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl neon-text text-primary">
            五行分布
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={elementData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {elementData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={elementColors[entry.name]} 
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Yin Yang Balance */}
      <Card className="neon-glow">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl neon-text text-primary">
            陰陽平衡
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={yinYangData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {yinYangData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Five Elements Radar */}
      <Card className="neon-glow lg:col-span-2">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl neon-text text-primary">
            五行雷達圖
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={elementData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 'dataMax']} 
                tick={false}
              />
              <Radar
                name="五行強度"
                dataKey="value"
                stroke="oklch(0.70 0.25 200)"
                fill="oklch(0.70 0.25 200)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Element Strength Bar Chart */}
      <Card className="neon-glow lg:col-span-2">
        <CardHeader>
          <CardTitle className="font-orbitron text-xl neon-text text-primary">
            五行強度分析
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={elementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.20 0.05 240)" />
              <XAxis dataKey="name" stroke="oklch(0.65 0.02 180)" />
              <YAxis stroke="oklch(0.65 0.02 180)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'oklch(0.12 0.03 240)',
                  border: '1px solid oklch(0.20 0.05 240)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {elementData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={elementColors[entry.name]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}