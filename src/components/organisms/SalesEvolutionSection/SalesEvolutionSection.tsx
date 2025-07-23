import React from 'react';
import SalesEvolutionChart from '@/components/molecules/SalesEvolutionChart/SalesEvolutionChart';

const mockData = [
  { label: 'Ago', value: 10 },
  { label: 'Set', value: 12 },
  { label: 'Out', value: 11 },
  { label: 'Nov', value: 13 },
  { label: 'Dez', value: 12 },
  { label: 'Jan', value: 14 },
];

const SalesEvolutionSection: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-white rounded-xl shadow p-4 ${className || ''}`}>
    <h2 className="text-lg font-semibold mb-2">Evolução de Vendas</h2>
    <SalesEvolutionChart data={mockData} color="#ef4444" />
    <div className="flex justify-between mt-2 text-xs text-gray-500">
      <span>Últimos 6 meses</span>
      <span className="text-green-600 font-bold">+60.3%</span>
    </div>
  </div>
);

export default SalesEvolutionSection; 