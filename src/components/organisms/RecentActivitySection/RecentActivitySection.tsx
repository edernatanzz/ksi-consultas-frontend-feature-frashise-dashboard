import RecentActivityItem from '@/components/molecules/RecentActivityItem/RecentActivityItem';
import { User, FileText, Plus } from 'lucide-react';
import React from 'react';

const mockActivity = [
  { icon: <User size={16} className="text-green-600" />, text: 'Novo parceiro adicionado', detail: 'TechSolutions LTDA foi ativado na sua rede', time: '2h atrás' },
  { icon: <FileText size={16} className="text-blue-600" />, text: 'Relatório gerado', detail: 'Relatório Executivo baixado', time: '3h atrás' },
  { icon: <Plus size={16} className="text-rose-600" />, text: 'Créditos adicionados', detail: 'R$ 1.000,00 adicionados ao saldo', time: '5h atrás' },
];

const RecentActivitySection: React.FC = () => (
  <div className="bg-white rounded-xl shadow p-4">
    <h2 className="text-lg font-semibold mb-2">Atividade Recente</h2>
    <div className="space-y-2 mt-4">
      {mockActivity.map((activity, idx) => (
        <RecentActivityItem key={idx} {...activity} />
      ))}
    </div>
  </div>
);

export default RecentActivitySection; 