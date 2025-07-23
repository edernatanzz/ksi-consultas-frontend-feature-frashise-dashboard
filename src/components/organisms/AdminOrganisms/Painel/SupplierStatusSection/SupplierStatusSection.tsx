'use client'
import React from 'react'
import Link from 'next/link'
import SupplierStatusItem from '@/components/molecules/AdminMolecules/Painel/SupplierStatusItem'

interface SupplierStatusSectionProps {
  title: string;
  suppliers: {
    name: string;
    uptime: string;
    avgCost: string;
    responseTime: string;
    consultations: string;
    statusColor: string;
  }[];
  onConfigureFallback: (supplierName: string) => void;
}

const SupplierStatusSection: React.FC<SupplierStatusSectionProps> = ({
  title,
  suppliers,
  onConfigureFallback,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <Link href="#" className="text-sm text-blue-600 hover:underline">
          Ver Todos →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {suppliers.map((supplier, index) => (
          <SupplierStatusItem
            key={index}
            name={supplier.name}
            uptime={supplier.uptime}
            avgCost={supplier.avgCost}
            responseTime={supplier.responseTime}
            consultations={supplier.consultations}
            statusColor={supplier.statusColor}
            onConfigureFallback={() => onConfigureFallback(supplier.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default SupplierStatusSection; 