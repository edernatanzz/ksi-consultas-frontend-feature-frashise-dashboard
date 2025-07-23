"use client"
import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { 
  AdminPanelSettings,
  AttachMoney,
  Code,
  BarChart,
  Headphones,
} from '@mui/icons-material';
import Button from '@/components/atoms/Button/Button';
import PermissionLevelCard from '@/components/molecules/AdminMolecules/Permissoes/PermissionLevelCard/PermissionLevelCard';
import PermissionMatrix from '@/components/molecules/AdminMolecules/Permissoes/PermissionMatrix/PermissionMatrix';
import PermissionUsersSection from '@/components/molecules/AdminMolecules/Permissoes/PermissionUsersSection/PermissionUsersSection';
import UserModal from '@/components/organisms/UserModal/UserModal';
import { User } from '@/types/user';

const Permissions: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('admin');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userModalMode, setUserModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedUserForModal, setSelectedUserForModal] = useState<User | null>(null);

  const permissionLevels = [
    {
      id: 'admin',
      name: 'Administrador',
      bgColorClass: 'bg-primary-500',
      borderColorClass: 'border-primary-500',
      textColorClass: 'text-primary-500',
      icon: AdminPanelSettings,
      description: 'Acesso total ao sistema',
      userCount: 2
    },
    {
      id: 'financial',
      name: 'Financeiro',
      bgColorClass: 'bg-secondary-800',
      borderColorClass: 'border-secondary-800',
      textColorClass: 'text-secondary-800',
      icon: AttachMoney,
      description: 'Relatórios financeiros, custos, faturamento',
      userCount: 3
    },
    {
      id: 'support',
      name: 'Suporte',
      bgColorClass: 'bg-green-500',
      borderColorClass: 'border-green-500',
      textColorClass: 'text-green-500',
      icon: Headphones,
      description: 'Logs, status APIs, troubleshooting',
      userCount: 5
    },
    {
      id: 'developers',
      name: 'Desenvolvedores',
      bgColorClass: 'bg-purple-500',
      borderColorClass: 'border-purple-500',
      textColorClass: 'text-purple-500',
      icon: Code,
      description: 'Documentação técnica, testes de API',
      userCount: 4
    },
    {
      id: 'marketing',
      name: 'Marketing',
      bgColorClass: 'bg-orange-500',
      borderColorClass: 'border-orange-500',
      textColorClass: 'text-orange-500',
      icon: BarChart,
      description: 'Relatórios de uso, estatísticas',
      userCount: 2
    }
  ];

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

  const permissionMatrix: { [key: string]: string[] } = {
    admin: ['dashboard', 'suppliers', 'monitoring', 'costs', 'reports', 'users', 'settings', 'api_docs'],
    financial: ['dashboard', 'costs', 'reports'],
    support: ['dashboard', 'suppliers', 'monitoring', 'api_docs'],
    developers: ['dashboard', 'suppliers', 'monitoring', 'api_docs'],
    marketing: ['dashboard', 'reports']
  };

  const togglePermission = (level: string, module: string) => {
    // In a real app, this would make an API call to update permissions
    console.log(`Toggle permission for ${level} on ${module}`);
  };

  const selectedLevelData = permissionLevels.find(level => level.id === selectedLevel);

  const handleCreateUser = () => {
    setSelectedUserForModal(null);
    setUserModalMode('create');
    setIsUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
    setSelectedUserForModal(null);
  };

  const handleSaveUser = (userData: Partial<User>, imageFile: File | null) => {
    console.log('Dados do usuário salvos/criados:', userData, imageFile);
    handleCloseUserModal();
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 font-display m-0">Gerenciamento de Permissões</h1>
          <p className="text-gray-500 mt-1 font-sans">Controle acesso hierárquico ao sistema</p>
        </div>
        <Button
          variant="primary"
          startIcon={<Users size={16} />}
          onClick={handleCreateUser}
        >
          Novo Usuário
        </Button>
      </div>

      {/* Permission Levels Hierarchy */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 font-display mb-6">Hierarquia de Permissões</h3>
        
        <div className="flex flex-col items-center gap-8 relative">
          {permissionLevels.map((level) => (
            <PermissionLevelCard
              key={level.id}
              {...level}
              isSelected={selectedLevel === level.id}
              onClick={() => setSelectedLevel(level.id)}
              accessedModulesCount={permissionMatrix[level.id]?.length || 0}
              totalModules={systemModules.length}
            />
          ))}
          <div className="absolute left-1/2 top-20 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 z-0" />
        </div>
      </div>

      {/* Permission Matrix */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <PermissionMatrix
          modules={systemModules}
          permissionLevels={permissionLevels.map(level => ({
            id: level.id,
            name: level.name,
            color: level.bgColorClass, 
            icon: level.icon,
          }))}
          permissionMatrix={permissionMatrix}
          onTogglePermission={togglePermission}
        />
      </div>

      {/* Selected Level Details */}
      {selectedLevelData && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <PermissionUsersSection 
            selectedLevelData={{
              id: selectedLevelData.id,
              name: selectedLevelData.name,
              color: selectedLevelData.bgColorClass, 
              textColor: selectedLevelData.textColorClass, 
              icon: selectedLevelData.icon,
              userCount: selectedLevelData.userCount,
            }}
          />
        </div>
      )}

      {/* User Modal */}
      {isUserModalOpen && (
        <UserModal
          isOpen={isUserModalOpen}
          user={selectedUserForModal}
          mode={userModalMode}
          onClose={handleCloseUserModal}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

export default Permissions;