'use client'

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
  percentage: string;
}

interface CostDistributionDonutChartProps {
  data: ChartDataItem[];
}

const CostDistributionDonutChart: React.FC<CostDistributionDonutChartProps> = ({ data }: CostDistributionDonutChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry: ChartDataItem, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number, name: string, props: { payload?: ChartDataItem[] }) => [`R$ ${value.toLocaleString('pt-BR')}`, props.payload?.[0]?.percentage]} 
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CostDistributionDonutChart; 