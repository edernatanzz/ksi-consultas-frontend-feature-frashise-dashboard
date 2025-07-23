import { ApiDataItem, ApiStatus } from '@/types/api';
import React from 'react';


interface ApiHealthCardProps {
  api: ApiDataItem;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const ApiHealthCard: React.FC<ApiHealthCardProps> = ({
  api,
  isSelected,
  onClick,
}) => {
  const getStatusColor = (status: ApiStatus) => {
    switch (status) {
      case 'healthy': return 'bg-green-100';
      case 'warning': return 'bg-yellow-100';
      case 'slow': return 'bg-orange-200';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div
      className={`relative cursor-pointer rounded-xl p-0 transition-all duration-300 w-full h-28
        ${isSelected ? 'border-2 border-red-400 shadow-lg' : 'border border-transparent shadow-md'}
        bg-white
        min-h-[7rem] flex flex-col
      `}
      onClick={() => onClick(api.id)}
      style={{ minWidth: 0 }}
    >
      <div className={`w-full h-full rounded-xl p-3 flex flex-col justify-between ${getStatusColor(api.status)} transition-opacity overflow-hidden`}>
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full text-gray-900">
          <div className="min-w-0">
            <div className="text-xs font-medium opacity-90 break-words truncate" title={api.provider}>{api.provider}</div>
            <div className="text-base font-semibold break-words truncate" title={api.name}>{api.name}</div>
          </div>
        </div>
        <div className="flex flex-col items-end mt-2 shrink-0">
          <div className="text-xs font-semibold">{api.usage}%</div>
          <div className="text-xs opacity-80">{api.latency}ms</div>
        </div>
      </div>
      {/* Pulse animation for critical APIs */}
      {api.status === 'error' && (
        <div className="absolute inset-0 rounded-xl bg-red-500 opacity-20 animate-pulse pointer-events-none"></div>
      )}
    </div>
  );
};

export default ApiHealthCard; 