import { ProgressBar } from '@/components/atoms/RelatorioTop/ProgressBar/ProgressBar';
import React from 'react';

interface ServiceDistributionBarProps {
  label: string;
  value: number;
  percent: number;
  color: string;
  max?: number;
}

const ServiceDistributionBar: React.FC<ServiceDistributionBarProps> = ({ label, value, percent, color, max = 6000 }) => (
  <div className="flex items-center">
    <span className={`w-3 h-3 rounded-full mr-2 ${color}`}></span>
    <span className="w-40 text-sm text-gray-700">{label}</span>
    <span className="flex-1 mx-2">
      <ProgressBar value={value} max={max} />
    </span>
    <span className="w-20 text-xs text-gray-700 text-right">R$ {value.toLocaleString()} <span className="text-gray-400">{percent}%</span></span>
  </div>
);

export default ServiceDistributionBar; 