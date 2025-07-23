"use client"
import React from 'react';
import StatusIndicator from '@/components/atoms/StatusIndicator/StatusIndicator';
import RealTimeMetricsPanel from '@/components/organisms/AdminOrganisms/monitoramento/RealTimeMetricsPanel/RealTimeMetricsPanel';
import ApiHealthMapPanel from '@/components/organisms/AdminOrganisms/monitoramento/ApiHealMapPanel/ApiHealthMapPanel';
import IncidentsTimelinePanel from '@/components/organisms/AdminOrganisms/monitoramento/IncidentsTimelimePanel/IncidentsTimelinePanel';
import QuickActionsPanel from '@/components/organisms/AdminOrganisms/monitoramento/QuickActionsPanel/QuickActionsPanel';
import { ApiDataItem } from '@/types/api';
import { IncidentItem } from '@/types/incident';

const Monitoring: React.FC = () => {
  // Mock API data with health status
  const apiData: ApiDataItem[] = [
    { id: 'serasa-pf', name: 'Serasa PF', provider: 'Serasa', status: 'healthy', usage: 95, latency: 120, errors: 0.2 },
    { id: 'serasa-pj', name: 'Serasa PJ', provider: 'Serasa', status: 'healthy', usage: 87, latency: 135, errors: 0.1 },
    { id: 'spc-pf', name: 'SPC PF', provider: 'SPC', status: 'healthy', usage: 78, latency: 95, errors: 0.3 },
    { id: 'spc-pj', name: 'SPC PJ', provider: 'SPC', status: 'healthy', usage: 82, latency: 110, errors: 0.2 },
    { id: 'receita-pj', name: 'Receita PJ', provider: 'Receita', status: 'warning', usage: 65, latency: 280, errors: 2.1 },
    { id: 'receita-situacao', name: 'Situação Cadastral', provider: 'Receita', status: 'slow', usage: 45, latency: 320, errors: 1.8 },
    { id: 'junta-empresarial', name: 'Consulta Empresarial', provider: 'Junta', status: 'healthy', usage: 58, latency: 140, errors: 0.4 },
    { id: 'junta-certidoes', name: 'Certidões', provider: 'Junta', status: 'healthy', usage: 35, latency: 160, errors: 0.5 },
  ];

  const incidents: IncidentItem[] = [
    { id: 1, api: 'Receita PJ', type: 'latency', message: 'Alta latência detectada', time: '14:32', duration: '12min' },
    { id: 2, api: 'SPC PF', type: 'error', message: 'Erro de timeout', time: '13:45', duration: '5min' },
    { id: 3, api: 'Serasa PJ', type: 'maintenance', message: 'Manutenção programada', time: '12:00', duration: '30min' },
  ];

  const realTimeMetrics = {
    requestsPerSecond: 127,
    avgLatency: 145,
    errorRate: 0.8,
    totalCostToday: 342.50
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-poppins font-semibold text-gray-800">
            Monitoramento de APIs
          </h1>
          <p className="text-gray-600 mt-1">
            Visualize a saúde e performance das integrações
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:space-x-3">
          <StatusIndicator status="online" showLabel={true} />
          <button className="px-4 py-2 bg-white border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors">
            Atualizar Status
          </button>
        </div>
      </div>

      <RealTimeMetricsPanel realTimeMetrics={realTimeMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ApiHealthMapPanel apiData={apiData} />
        <div className="space-y-6">
          <IncidentsTimelinePanel incidents={incidents} />
          <QuickActionsPanel />
        </div>
      </div>
    </div>
  );
};

export default Monitoring;