'use client'
import React from 'react'

export interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
}) => {
  const changeColorClass = {
    positive: 'text-green-500',
    negative: 'text-red-500',
    neutral: 'text-gray-500',
  }[changeType];

  const iconBgClass = {
    'Custo Total Mensal': 'bg-blue-100 text-blue-600',
    'Consultas Realizadas': 'bg-indigo-100 text-indigo-600',
    'Disponibilidade Geral': 'bg-green-100 text-green-600',
    'Economia Realizada': 'bg-yellow-100 text-yellow-600',
  }[title] || 'bg-gray-100 text-gray-600';

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg ${iconBgClass}`}>
            <span className="material-icons text-xl">{icon}</span>
          </div>
          <p className="ml-4 text-sm font-medium text-gray-500">{title}</p>
        </div>
        <span className="material-icons text-gray-400">trending_up</span>
      </div>
      <div>
        <p className="text-3xl font-semibold text-gray-900 mb-2">{value}</p>
        <p className={`text-sm ${changeColorClass}`}>
          {changeType === 'positive' ? '+' : ''}{change} vs mês anterior
        </p>
      </div>
    </div>
  );
};

export default MetricCard; 