import React, { useState } from 'react';
import ApiHealthCard from '../../../../atoms/ApiHealthCard/ApiHealthCard';

import { ApiDataItem } from '../../../../../types/api';
import StatusIndicator from '../../../../atoms/StatusIndicator/StatusIndicator';

interface ApiHealthMapPanelProps {
  apiData: ApiDataItem[];
}

const ApiHealthMapPanel: React.FC<ApiHealthMapPanelProps> = ({ apiData }) => {
  const [selectedAPI, setSelectedAPI] = useState<string | null>(null);

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-lg font-poppins font-semibold text-gray-800">
          Mapa de Saúde das APIs
        </h3>
        <div className="flex flex-row items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500"></div>
            <span>Saudável</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500"></div>
            <span>Atenção</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500"></div>
            <span>Crítico</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {apiData.map((api) => (
          <ApiHealthCard
            key={api.id}
            api={api}
            isSelected={selectedAPI === api.id}
            onClick={setSelectedAPI}
          />
        ))}
      </div>

      {/* Selected API Details */}
      {selectedAPI && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg overflow-x-auto">
          {(() => {
            const api = apiData.find(a => a.id === selectedAPI);
            if (!api) return null;
            
            return (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                  <h4 className="font-semibold text-gray-800 break-words truncate max-w-full" title={`${api.provider} - ${api.name}`}>{api.provider} - {api.name}</h4>
                  <StatusIndicator 
                    status={api.status === 'healthy' ? 'online' : api.status === 'warning' ? 'warning' : 'offline'} 
                    showLabel 
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="truncate">
                    <span className="text-gray-600">Uso:</span>
                    <span className="font-semibold ml-2">{api.usage}%</span>
                  </div>
                  <div className="truncate">
                    <span className="text-gray-600">Latência:</span>
                    <span className="font-semibold ml-2">{api.latency}ms</span>
                  </div>
                  <div className="truncate">
                    <span className="text-gray-600">Erros:</span>
                    <span className="font-semibold ml-2">{api.errors}%</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default ApiHealthMapPanel; 