'use client'

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ChartDataItem {
  month: string;
  Atual: number;
  Otimizado: number;
}

interface CostEvolutionBarChartProps {
  data: ChartDataItem[];
}

const CostEvolutionBarChart: React.FC<CostEvolutionBarChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Atual" fill="#ef4444" /> {/* Vermelho */}
        <Bar dataKey="Otimizado" fill="#10b981" /> {/* Verde */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CostEvolutionBarChart; 