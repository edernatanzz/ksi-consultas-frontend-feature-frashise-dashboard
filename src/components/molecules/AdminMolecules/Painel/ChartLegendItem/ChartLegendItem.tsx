'use client'
import React from 'react'

interface ChartLegendItemProps {
  label: string;
  color: string; // Tailwind CSS color class (e.g., 'bg-red-500')
}

const ChartLegendItem: React.FC<ChartLegendItemProps> = ({
  label,
  color,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <span className={`w-3 h-3 rounded-full ${color}`}></span>
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );
};

export default ChartLegendItem; 