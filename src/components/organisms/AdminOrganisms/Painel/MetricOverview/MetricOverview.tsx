'use client'
import React from 'react'
import MetricCard from '@/components/molecules/AdminMolecules/Painel/MetricCard'

interface MetricOverviewProps {
  metrics: {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
    icon: string;
  }[];
}

const MetricOverview: React.FC<MetricOverviewProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          changeType={metric.changeType}
          icon={metric.icon}
        />
      ))}
    </div>
  );
};

export default MetricOverview;