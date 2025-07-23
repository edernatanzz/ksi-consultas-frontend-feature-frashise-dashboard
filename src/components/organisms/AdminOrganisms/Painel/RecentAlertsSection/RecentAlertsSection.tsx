'use client'
import React from 'react'
import Link from 'next/link'

interface RecentAlertsSectionProps {
  title: string;
  historyLink: string;
}

const RecentAlertsSection: React.FC<RecentAlertsSectionProps> = ({
  title,
  historyLink,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <Link href={historyLink} className="text-sm text-blue-600 hover:underline">
          Ver Histórico →
        </Link>
      </div>
      {/* Placeholder para a lista de alertas reais */}
      <div className="text-gray-500">
        Nenhum alerta recente.
      </div>
    </div>
  );
};

export default RecentAlertsSection; 