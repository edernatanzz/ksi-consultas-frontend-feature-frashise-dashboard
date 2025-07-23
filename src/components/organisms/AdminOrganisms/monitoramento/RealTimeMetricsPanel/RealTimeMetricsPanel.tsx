import React from 'react';
import { Activity, Clock, AlertTriangle, Zap } from 'lucide-react';
import MetricCard from '../../../../atoms/MetricCard/MetricCard';

interface RealTimeMetricsPanelProps {
  realTimeMetrics: {
    requestsPerSecond: number;
    avgLatency: number;
    errorRate: number;
    totalCostToday: number;
  };
}

const RealTimeMetricsPanel: React.FC<RealTimeMetricsPanelProps> = ({ realTimeMetrics }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-poppins font-semibold text-gray-800 mb-6">
        Métricas em Tempo Real
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          icon={<Activity size={20} className="text-blue-500" />}
          label="Requests/seg"
          value={realTimeMetrics.requestsPerSecond}
          trendValue="5.2%"
          trendType="up"
          valueColor="text-blue-600"
          trendColor="text-green-600"
        />
        
        <MetricCard
          icon={<Clock size={20} className="text-orange-500" />}
          label="Latência Média"
          value={`${realTimeMetrics.avgLatency}ms`}
          trendValue="12ms"
          trendType="up"
          valueColor="text-orange-600"
          trendColor="text-red-600"
        />
        
        <MetricCard
          icon={<AlertTriangle size={20} className="text-red-500" />}
          label="Taxa de Erro"
          value={`${realTimeMetrics.errorRate}%`}
          trendValue="0.2%"
          trendType="down"
          valueColor="text-red-600"
          trendColor="text-green-600"
        />
        
        <MetricCard
          icon={<Zap size={20} className="text-ksi-red" />}
          label="Custo Hoje"
          value={`R$ ${realTimeMetrics.totalCostToday}`}
          trendValue="15%"
          trendType="down"
          valueColor="text-ksi-red"
          trendColor="text-green-600"
        />
      </div>
    </div>
  );
};

export default RealTimeMetricsPanel; 