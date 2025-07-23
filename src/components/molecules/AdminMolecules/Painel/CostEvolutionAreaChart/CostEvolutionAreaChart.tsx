'use client'
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartDataItem {
  name: string;
  Serasa: number;
  SPC: number;
  Receita: number;
}

interface CostEvolutionAreaChartProps {
  data: ChartDataItem[];
  series: { key: string; color: string; name: string }[]; 
}

const CostEvolutionAreaChart: React.FC<CostEvolutionAreaChartProps> = ({ data, series }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `R$ ${value}`}
        />
        <Tooltip
          formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
          cursor={{ fill: 'rgba(240, 240, 240, 0.5)' }}
          contentStyle={{
            borderRadius: '8px',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
            border: 'none',
          }}
          labelStyle={{ fontWeight: 'bold', color: '#333' }}
        />
        {series.map((s) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            stackId="1"
            stroke={s.color}
            fill={s.color}
            fillOpacity={0.8}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CostEvolutionAreaChart; 