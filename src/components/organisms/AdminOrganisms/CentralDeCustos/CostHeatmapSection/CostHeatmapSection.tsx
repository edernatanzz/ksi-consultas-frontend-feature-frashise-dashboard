'use client'

import React from 'react'

interface HeatmapItem {
  value: number;
}

interface HeatmapData {
  day: string;
  hourlyCosts: HeatmapItem[];
}

interface CostHeatmapSectionProps {
  data: HeatmapData[];
}

const getHeatmapColorClass = (value: number): string => {
  if (value >= 90) return 'bg-red-600'; // Alto
  if (value >= 80) return 'bg-red-400'; // Médio-Alto
  if (value >= 70) return 'bg-orange-400'; // Médio
  if (value >= 60) return 'bg-yellow-300'; // Médio-Baixo
  return 'bg-green-400'; // Baixo
};

const CostHeatmapSection: React.FC<CostHeatmapSectionProps> = ({ data }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0') + 'h');

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Mapa de Calor - Custos por Horário</h2>
      
      <div className="flex justify-end gap-2 text-sm mb-4">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-green-400"></span> Baixo
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-yellow-300"></span> Médio-Baixo
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-orange-400"></span> Médio
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-400"></span> Médio-Alto
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-600"></span> Alto
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="grid" style={{ gridTemplateColumns: 'auto repeat(24, minmax(2.5rem, 1fr))' }}>
          <div className="text-gray-600 font-medium pb-2">Dia</div>
          {hours.map(hour => (
            <div key={hour} className="text-center text-gray-600 font-medium pb-2 text-sm">
              {hour}
            </div>
          ))}

          {data.map((dayData, dayIndex) => (
            <React.Fragment key={dayIndex}>
              <div className="text-gray-700 font-medium py-2 pr-2 border-t border-gray-200 flex items-center justify-end text-sm">
                {dayData.day}
              </div>
              {dayData.hourlyCosts.map((item, hourIndex) => (
                <div 
                  key={hourIndex} 
                  className={`w-6 h-6 rounded-sm m-1 border border-gray-200 flex items-center justify-center text-xs text-white ${getHeatmapColorClass(item.value)}`}
                  title={`Custo: ${item.value}`}
                >
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CostHeatmapSection; 