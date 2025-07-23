import React from 'react';
import IncidentCard from '../../../../atoms/IncidentCard/IncidentCard';
import { IncidentItem } from '../../../../../types/incident';
import Button from '../../../../atoms/Button/Button';

interface IncidentsTimelinePanelProps {
  incidents: IncidentItem[];
}

const IncidentsTimelinePanel: React.FC<IncidentsTimelinePanelProps> = ({ incidents }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-poppins font-semibold text-gray-800">
          Histórico de Incidentes
        </h3>
        <span className="text-sm text-gray-500">Últimas 24h</span>
      </div>

      <div className="space-y-4">
        {incidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </div>

      <Button 
        variant="ghost" 
        fullWidth 
        className="mt-4 text-primary-500" 
        onClick={() => console.log('Ver Histórico Completo')}
      >
        Ver Histórico Completo →
      </Button>
    </div>
  );
};

export default IncidentsTimelinePanel; 