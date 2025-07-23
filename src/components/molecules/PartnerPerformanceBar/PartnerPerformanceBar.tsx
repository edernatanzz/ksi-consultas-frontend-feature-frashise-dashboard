import { ProgressBar } from '@/components/atoms/RelatorioTop/ProgressBar/ProgressBar';
import React from 'react';

interface PartnerPerformanceBarProps {
  name: string;
  value: number;
}

const PartnerPerformanceBar: React.FC<PartnerPerformanceBarProps> = ({ name, value }) => (
  <div className="flex items-center space-x-2">
    <span className="w-6 text-xs font-bold text-gray-500">{name[0]}</span>
    <span className="flex-1">
      <ProgressBar value={value} max={100} label={name} />
    </span>
    <span className="w-10 text-xs text-gray-700 text-right">{value}%</span>
  </div>
);

export default PartnerPerformanceBar; 