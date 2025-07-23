'use client'
import React from 'react'
import Button from '@/components/atoms/Button/Button'

interface SupplierStatusItemProps {
  name: string;
  uptime: string;
  avgCost: string;
  responseTime: string;
  consultations: string;
  statusColor: string;
  onConfigureFallback: () => void;
}

const SupplierStatusItem: React.FC<SupplierStatusItemProps> = ({
  name,
  uptime,
  avgCost,
  responseTime,
  consultations,
  statusColor,
  onConfigureFallback,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <span className={`w-3 h-3 rounded-full ${statusColor}`}></span>
      </div>
      <div className="grid grid-cols-2 gap-y-2 mb-6">
        <div>
          <p className="text-sm text-gray-600">Uptime:</p>
          <p className="font-medium">{uptime}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Custo médio:</p>
          <p className="font-medium">{avgCost}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Resposta:</p>
          <p className="font-medium">{responseTime}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Consultas:</p>
          <p className="font-medium">{consultations}</p>
        </div>
      </div>
      <Button
        variant="secondary"
        size="small"
        onClick={onConfigureFallback}
        className="w-full"
      >
        Configurar Fallback
      </Button>
    </div>
  );
};

export default SupplierStatusItem;