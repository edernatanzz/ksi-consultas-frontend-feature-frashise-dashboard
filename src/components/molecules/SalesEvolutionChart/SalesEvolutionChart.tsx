import { BarChart } from '@mui/x-charts';
import React from 'react';

interface SalesEvolutionChartProps {
  data: { label: string; value: number }[];
  color?: string;
}

const SalesEvolutionChart: React.FC<SalesEvolutionChartProps> = ({ data, color = '#ef4444' }) => {
  return (
    <BarChart
      height={180}
      series={[{
        data: data.map(d => d.value),
        color,
      }]}
      xAxis={[{
        scaleType: 'band',
        data: data.map(d => d.label),
      }]}
      sx={{
        '.MuiBarElement-root': { fill: color },
      }}
      grid={{ vertical: false, horizontal: false }}
    />
  );
};

export default SalesEvolutionChart;