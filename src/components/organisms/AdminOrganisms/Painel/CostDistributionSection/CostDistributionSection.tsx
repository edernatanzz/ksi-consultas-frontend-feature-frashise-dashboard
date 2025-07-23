'use client'

import React from 'react'
import CostDistributionDonutChart from '@/components/molecules/AdminMolecules/Painel/CostDistributionDonutChart/CostDistributionDonutChart'

interface CostDistributionItem {
  label: string;
  value: string;
  percentage: string;
  color: string;
}

interface CostDistributionSectionProps {
  data: CostDistributionItem[];
}

const CostDistributionSection: React.FC<CostDistributionSectionProps> = ({ data }) => {
  const chartData = data.map(item => ({
    name: item.label,
    value: parseFloat(item.value.replace('R$', '').replace('.', '').replace(',', '.')),
    color: item.color,
    percentage: item.percentage
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Distribuição de Custos por Tipo</h2>
      <div className="flex flex-col lg:flex-row items-center justify-between flex-grow">
        <div className="w-48 h-48 mb-4 lg:mb-0 lg:mr-8">
          <CostDistributionDonutChart data={chartData} />
        </div>
        <div className="flex-grow">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-100">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                <span className="text-gray-700">{item.label}</span>
              </div>
              <span className="text-gray-800 font-medium">{item.value} <span className="text-gray-500 text-sm">({item.percentage})</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CostDistributionSection; 