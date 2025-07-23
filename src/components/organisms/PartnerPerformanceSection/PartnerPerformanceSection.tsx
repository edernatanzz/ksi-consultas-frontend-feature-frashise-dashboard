import PartnerPerformanceBar from '@/components/molecules/PartnerPerformanceBar/PartnerPerformanceBar';
import React from 'react';

const mockPartners = [
  { name: 'TechSolutions LTDA', value: 95 },
  { name: 'DataCorp Sistemas', value: 88 },
  { name: 'AlphaSoft', value: 76 },
  { name: 'BetaConsult', value: 62 },
];

const PartnerPerformanceSection: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-white rounded-xl shadow p-4 ${className || ''}`}>
    <h2 className="text-lg font-semibold mb-2">Performance por Parceiro</h2>
    <div className="space-y-4 mt-4">
      {mockPartners.map((partner, idx) => (
        <PartnerPerformanceBar key={idx} {...partner} />
      ))}
    </div>
  </div>
);

export default PartnerPerformanceSection; 