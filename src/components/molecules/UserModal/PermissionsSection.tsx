import React from 'react';
import { Shield } from 'lucide-react';
import { User } from '@/types/user';
import Button from '../../atoms/Button/Button';

interface PermissionsSectionProps {
  formData: Partial<User>;
  isReadOnly: boolean;
  customPermissions: string[];
  onProfileChange: (profile: User['profile']) => void;
  onToggleCustomPermissions: (enabled: boolean) => void;
  onTogglePermission: (moduleId: string) => void;
}

const PermissionsSection: React.FC<PermissionsSectionProps> = ({
  formData,
  isReadOnly,
  customPermissions,
  onProfileChange,
  onToggleCustomPermissions,
  onTogglePermission
}) => {
  const profiles = {
    admin: { name: 'Administrador', color: 'bg-primary-500 text-white' },
    financial: { name: 'Financeiro', color: 'bg-secondary-800 text-white' },
    support: { name: 'Suporte', color: 'bg-green-500 text-white' },
    developers: { name: 'Desenvolvedores', color: 'bg-purple-500 text-white' },
    marketing: { name: 'Marketing', color: 'bg-orange-500 text-white' },
    custom: { name: 'Customizado', color: 'bg-gray-500 text-white' }
  };

  const systemModules = [
    { id: 'dashboard', name: 'Dashboard', description: 'Visão geral do sistema' },
    { id: 'suppliers', name: 'Gestão de Fornecedores', description: 'CRUD de fornecedores e APIs' },
    { id: 'monitoring', name: 'Monitoramento', description: 'Status e saúde das APIs' },
    { id: 'costs', name: 'Controle de Custos', description: 'Análises financeiras e relatórios' },
    { id: 'reports', name: 'Relatórios', description: 'Geração de relatórios diversos' },
    { id: 'users', name: 'Gestão de Usuários', description: 'Administração de usuários' },
    { id: 'settings', name: 'Configurações', description: 'Configurações do sistema' },
    { id: 'api_docs', name: 'Documentação API', description: 'Documentação técnica' },
  ];

  const defaultPermissions: { [key: string]: string[] } = {
    admin: ['dashboard', 'suppliers', 'monitoring', 'costs', 'reports', 'users', 'settings', 'api_docs'],
    financial: ['dashboard', 'costs', 'reports'],
    support: ['dashboard', 'suppliers', 'monitoring', 'api_docs'],
    developers: ['dashboard', 'suppliers', 'monitoring', 'api_docs'],
    marketing: ['dashboard', 'reports']
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Perfil Base
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(profiles).map(([key, profile]) => (
            <Button
              key={key}
              onClick={() => !isReadOnly && onProfileChange(key as User['profile'])}
              disabled={isReadOnly}
              variant="ghost"
              className={`
                p-4 border-2 rounded-lg transition-all
                flex flex-col items-center justify-center text-center
                ${formData.profile === key
                  ? 'border-primary-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
                ${isReadOnly ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              `}
              startIcon={
                <div className={`w-8 h-8 ${profile.color} rounded-lg flex items-center justify-center mb-2`}>
                  <Shield size={16} className="text-white" />
                </div>
              }
            >
              <span className="text-sm font-medium text-gray-800">{profile.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Permissões Customizadas</h3>
            <p className="text-sm text-gray-600">
              Sobrescrever permissões padrão do perfil
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hasCustomPermissions}
              onChange={(e) => !isReadOnly && onToggleCustomPermissions(e.target.checked)}
              disabled={isReadOnly}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
          </label>
        </div>

        <div className="space-y-3">
          {systemModules.map((module) => {
            const hasDefaultPermission = defaultPermissions[formData.profile ?? 'support']?.includes(module.id);
            const hasCustomPermission = customPermissions.includes(module.id);

            return (
              <div
                key={module.id}
                className={`flex items-center justify-between p-3 border rounded-lg border-gray-200`}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-800">{module.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  {!formData.hasCustomPermissions ? (
                    <span className={`text-sm ${hasDefaultPermission ? 'text-green-600' : 'text-gray-400'}`}>
                      {hasDefaultPermission ? 'Herdado' : 'Negado'}
                    </span>
                  ) : (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasCustomPermission}
                        onChange={() => !isReadOnly && onTogglePermission(module.id)}
                        disabled={isReadOnly}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PermissionsSection; 