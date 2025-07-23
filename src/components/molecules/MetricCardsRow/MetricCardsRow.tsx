import MetricCard from '@/components/atoms/MetricCard/MetricCard';
import React from 'react';

interface MetricCardsRowProps {
  metrics: Array<React.ComponentProps<typeof MetricCard>>;
}

const MetricCardsRow: React.FC<MetricCardsRowProps> = ({ metrics }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {metrics.map((metric, idx) => (
      <div key={idx} className="bg-white rounded-xl shadow p-4">
        <MetricCard {...metric} />
      </div>
    ))}
  </div>
);

export default MetricCardsRow; 