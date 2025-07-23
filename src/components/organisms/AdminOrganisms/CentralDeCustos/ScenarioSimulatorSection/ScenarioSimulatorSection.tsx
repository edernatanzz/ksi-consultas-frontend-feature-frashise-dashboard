'use client'

import React from 'react'

interface ScenarioItem {
  label: string;
  description: string;
  value: number;
  difference?: number;
  isHighlighted?: boolean;
}

interface ScenarioSimulatorSectionProps {
  scenarios: ScenarioItem[];
  projectedAnnualSavings: number;
}

const ScenarioSimulatorSection: React.FC<ScenarioSimulatorSectionProps> = ({
  scenarios,
  projectedAnnualSavings,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Simulador de Cenários</h2>
      <div className="space-y-4 mb-6">
        {scenarios.map((scenario, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${
              scenario.isHighlighted ? 'border-red-500 bg-red-50' : 'border-gray-200'
            } flex justify-between items-center`}
          >
            <div>
              <h3 className="font-medium text-gray-800">{scenario.label}</h3>
              <p className="text-sm text-gray-600">{scenario.description}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                R$ {scenario.value.toLocaleString('pt-BR')}
              </p>
              {scenario.difference !== undefined && (
                <p
                  className={`text-sm ${scenario.difference < 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                  {scenario.difference < 0 ? '-R$' : '+R$'}{Math.abs(scenario.difference).toLocaleString('pt-BR')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-center mb-6">
        <p className="text-sm mb-1">Economia Anual Projetada</p>
        <p className="text-xl font-bold">R$ {projectedAnnualSavings.toLocaleString('pt-BR')}</p>
        <p className="text-sm">Com cenário otimizado</p>
      </div>

      <button className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition duration-300">
        Aplicar Cenário Selecionado
      </button>
    </div>
  );
};

export default ScenarioSimulatorSection; 