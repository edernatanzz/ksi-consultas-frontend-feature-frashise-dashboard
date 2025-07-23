import React from 'react';
import { User, Shield, DollarSign, Bell } from 'lucide-react';
import Button from '../../atoms/Button/Button';

interface UserModalTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const UserModalTabs: React.FC<UserModalTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'basic', name: 'Informações Básicas', icon: User },
    { id: 'permissions', name: 'Perfil e Permissões', icon: Shield },
    { id: 'limits', name: 'Limites e Quotas', icon: DollarSign },
    { id: 'notifications', name: 'Notificações', icon: Bell }
  ];

  return (
    <nav className="flex justify-between bg-white border-b border-gray-200">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <Button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            variant="ghost"
            icon={IconComponent}
            className={`
              flex items-center space-x-2 px-6 py-4 text-sm
              transition-colors duration-200 ease-in-out
              focus:outline-none relative border-b-2 border-transparent bg-white
              ${isActive
                ? 'text-red-500 underline decoration-red-500 decoration-4 underline-offset-8'
                : 'text-gray-600 hover:text-gray-800'
              }
            `}
          >
            {tab.name}
          </Button>
        );
      })}
    </nav>
  );
};

export default UserModalTabs;