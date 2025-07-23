'use client'
import React from 'react'

import CostEvolutionBarChart from '@/components/molecules/AdminMolecules/Painel/CostEvolutionBarChart/CostEvolutionBarChart'

const chartData = [
  { month: 'Jan', Atual: 8500, Otimizado: 7500 },
  { month: 'Fev', Atual: 9200, Otimizado: 8000 },
  { month: 'Mar', Atual: 8800, Otimizado: 7200 },
  { month: 'Abr', Atual: 9500, Otimizado: 8300 },
  { month: 'Mai', Atual: 10000, Otimizado: 8700 },
  { month: 'Jun', Atual: 12000, Otimizado: 9200 },
];

interface CostEvolutionChartSectionProps {
  title: string;
}

const CostEvolutionChartSection: React.FC<CostEvolutionChartSectionProps> = ({
  title,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {title}
      </h2>
      <CostEvolutionBarChart data={chartData} />
    </div>
  );
};

export default CostEvolutionChartSection;