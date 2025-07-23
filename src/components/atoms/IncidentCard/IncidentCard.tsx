import { IncidentItem } from '@/types/incident';
import React from 'react';


interface IncidentCardProps {
  incident: IncidentItem;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident }) => {
  const getTypeColor = (type: IncidentItem['type']) => {
    switch (type) {
      case 'error': return 'bg-red-500';
      case 'latency': return 'bg-yellow-500';
      case 'maintenance': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
      <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-2 ${getTypeColor(incident.type)}`}></div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-gray-800">{incident.api}</p>
          <span className="text-xs text-gray-500">{incident.time}</span>
        </div>
        <p className="text-sm text-gray-600">{incident.message}</p>
        <p className="text-xs text-gray-500 mt-1">Duração: {incident.duration}</p>
      </div>
    </div>
  );
};

export default IncidentCard; 