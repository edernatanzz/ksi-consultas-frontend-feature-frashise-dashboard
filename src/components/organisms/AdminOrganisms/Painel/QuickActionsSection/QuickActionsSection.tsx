'use client'
import React from 'react'
import QuickActionButton from '@/components/molecules/AdminMolecules/Painel/QuickActionButton'

interface QuickActionsSectionProps {
  title: string;
  actions: {
    title: string;
    description: string;
    icon: string;
    bgColor: string;
    textColor: string;
    onClick: () => void;
  }[];
}

const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({
  title,
  actions,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {actions.map((action, index) => (
          <QuickActionButton
            key={index}
            title={action.title}
            description={action.description}
            icon={action.icon}
            bgColor={action.bgColor}
            textColor={action.textColor}
            onClick={action.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActionsSection; 