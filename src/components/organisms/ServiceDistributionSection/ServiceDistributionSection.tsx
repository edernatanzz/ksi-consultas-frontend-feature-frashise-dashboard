import ServiceDistributionBar from '@/components/molecules/ServiceDistributionBar/ServiceDistributionBar';
import React from 'react';

const mockServices = [
  { label: 'Consulta CPF', value: 3125, percent: 18.3, color: 'bg-red-500' },
  { label: 'Consulta CNPJ', value: 5440, percent: 31.8, color: 'bg-blue-500' },
  { label: 'Consulta Veicular', value: 4800, percent: 28.0, color: 'bg-green-500' },
  { label: 'Consulta Criminal', value: 3750, percent: 21.9, color: 'bg-yellow-500' },
  { label: 'Consulta Endereço', value: 2100, percent: 12.2, color: 'bg-purple-500' },
  { label: 'Consulta Telefone', value: 1800, percent: 10.1, color: 'bg-pink-500' },
];

const ServiceDistributionSection: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-white rounded-xl shadow p-4 ${className || ''}`}>
    <h2 className="text-lg font-semibold mb-2">Distribuição de Serviços</h2>
    <div className="space-y-3 mt-4">
      {mockServices.map((service, idx) => (
        <ServiceDistributionBar key={idx} {...service} />
      ))}
    </div>
  </div>
);

export default ServiceDistributionSection; 