import MetricCardsRow from '@/components/molecules/MetricCardsRow/MetricCardsRow';
import React from 'react';

const mockMetrics = [
  {
    icon: <span className="material-icons text-blue-500">attach_money</span>,
    label: 'Saldo de Créditos',
    value: '15.420',
    trendValue: '8.5%',
    trendType: 'up' as const,
    valueColor: 'text-gray-900',
    trendColor: 'text-green-600',
  },
  {
    icon: <span className="material-icons text-green-500">groups</span>,
    label: 'Parceiros Ativos',
    value: '2',
    trendValue: '12.5%',
    trendType: 'up' as const,
    valueColor: 'text-gray-900',
    trendColor: 'text-green-600',
  },
  {
    icon: <span className="material-icons text-rose-500">trending_up</span>,
    label: 'Faturamento Mensal',
    value: 'R$ 45.680',
    trendValue: '15.2%',
    trendType: 'up' as const,
    valueColor: 'text-gray-900',
    trendColor: 'text-green-600',
  },
  {
    icon: <span className="material-icons text-yellow-500">percent</span>,
    label: 'Margem de Lucro',
    value: '22.5%',
    trendValue: '2.1%',
    trendType: 'up' as const,
    valueColor: 'text-gray-900',
    trendColor: 'text-green-600',
  },
];

const MetricsSection: React.FC = () => (
  <MetricCardsRow metrics={mockMetrics} />
);

export default MetricsSection; 