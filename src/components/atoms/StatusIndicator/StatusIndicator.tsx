import React from 'react';
import { CheckCircle } from 'lucide-react';

interface StatusIndicatorProps {
  status: 'online' | 'warning' | 'offline';
  showLabel?: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, showLabel }) => {
  let colorClass = '';
  let label = '';
  let icon = null;

  switch (status) {
    case 'online':
      colorClass = 'bg-green-500';
      label = 'Sistema Operacional';
      icon = <CheckCircle size={10} className="text-white" />;
      break;
    case 'warning':
      colorClass = 'bg-yellow-500';
      label = 'Atenção';
      break;
    case 'offline':
      colorClass = 'bg-red-500';
      label = 'Crítico';
      break;
    default:
      colorClass = 'bg-gray-500';
      label = 'Desconhecido';
  }

  return (
    <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
      <div className={`flex items-center justify-center w-4 h-4 rounded-full ${colorClass}`}>
        {icon}
      </div>
      {showLabel && <span className="text-sm font-medium text-green-700">{label}</span>}
    </div>
  );
};

export default StatusIndicator; 