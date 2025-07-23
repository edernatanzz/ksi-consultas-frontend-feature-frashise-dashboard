import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trendValue?: string;
  trendType?: 'up' | 'down';
  valueColor: string;
  trendColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  label,
  value,
  trendValue,
  trendType,
  valueColor,
  trendColor
}) => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center space-x-2 mb-2">
        {icon}
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
      {trendValue && (
        <div className="mt-2 flex items-center justify-center space-x-1">
          {trendType === 'up' && <TrendingUp size={14} className={trendColor || 'text-green-500'} />}
          {trendType === 'down' && <TrendingDown size={14} className={trendColor || 'text-red-500'} />}
          <span className={`text-sm ${trendColor || 'text-green-600'}`}>
            {trendType === 'up' ? '+' : ''}{trendType === 'down' ? '-' : ''}{trendValue}
          </span>
        </div>
      )}
    </div>
  );
};

export default MetricCard; 