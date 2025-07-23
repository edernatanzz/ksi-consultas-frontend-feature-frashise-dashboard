import ActionButton from '@/components/atoms/ActionButton/ActionButton';
import React from 'react';

interface QuickActionsListProps {
  actions: Array<React.ComponentProps<typeof ActionButton>>;
}

const QuickActionsList: React.FC<QuickActionsListProps> = ({ actions }) => (
  <div className="space-y-3 mt-4">
    {actions.map((action, idx) => (
      <ActionButton key={idx} {...action} />
    ))}
  </div>
);

export default QuickActionsList; 