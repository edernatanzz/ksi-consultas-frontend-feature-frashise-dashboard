import QuickActionsList from '@/components/molecules/QuickActionsList/QuickActionsList';
import { Plus, ShoppingCart, FileText, Headphones } from 'lucide-react';
import React from 'react';

const mockActions = [
  { icon: Plus, label: 'Adicionar Novo Parceiro', variant: 'error' as const, onClick: () => {} },
  { icon: ShoppingCart, label: 'Comprar Mais Créditos', variant: 'info' as const, onClick: () => {} },
  { icon: FileText, label: 'Relatório Executivo', variant: 'success' as const, onClick: () => {} },
  { icon: Headphones, label: 'Suporte Técnico', variant: 'warning' as const, onClick: () => {} },
];

const QuickActionsSection: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-white rounded-xl shadow p-4 ${className || ''}`}>
    <h2 className="text-lg font-semibold mb-2">Ações Rápidas</h2>
    <QuickActionsList actions={mockActions} />
  </div>
);

export default QuickActionsSection; 