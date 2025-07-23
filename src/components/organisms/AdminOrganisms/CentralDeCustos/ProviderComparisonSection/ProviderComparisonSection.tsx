'use client'

import React from 'react'

interface ProviderComparisonItem {
  providerName: string;
  actualCost: number;
  alternativeCost: number;
  difference: number;
  economy?: number;
}

interface ProviderComparisonSectionProps {
  data: ProviderComparisonItem[];
}

const ProviderComparisonSection: React.FC<ProviderComparisonSectionProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Comparação de Fornecedores</h2>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium text-gray-800">{item.providerName}</h3>
              {item.economy !== undefined && item.economy > 0 && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Economia: R$ {item.economy.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-medium">Atual:</p>
                <p>R$ {item.actualCost.toLocaleString('pt-BR', { minimumFractionDigits: 3 })}</p>
              </div>
              <div>
                <p className="font-medium">Alternativo:</p>
                <p>R$ {item.alternativeCost.toLocaleString('pt-BR', { minimumFractionDigits: 3 })}</p>
              </div>
              <div>
                <p className="font-medium">Diferença:</p>
                <p className={`${item.difference < 0 ? 'text-red-600' : 'text-gray-700'}`}>R$ {item.difference.toLocaleString('pt-BR', { signDisplay: 'exceptZero' })}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderComparisonSection; 