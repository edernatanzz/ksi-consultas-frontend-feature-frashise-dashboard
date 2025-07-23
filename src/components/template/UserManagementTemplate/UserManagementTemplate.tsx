import React, { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import Button from '../../atoms/Button/Button';
import UserFilters from '../../organisms/UserFilters/UserFilters';
import BulkActions from '../../molecules/AdminMolecules/Usuarios/BulkActions/BulkActions';
import UserTable from '../../organisms/UserTable/UserTable';
import UserCard from '../../molecules/AdminMolecules/Usuarios/UserCard/UserCard';
import UserActivityModal from '../../organisms/UserActivityModal/UserActivityModal';
import UserModal from '../../organisms/UserModal/UserModal';
import { User } from '@/types/user';

interface UserManagementTemplateProps {
  users: User[];
  selectedUsers: string[];
  searchTerm: string;
  filterProfile: string;
  filterStatus: string;
  filterDepartment: string;
  viewMode: 'table' | 'grid';
  onSearchChange: (value: string) => void;
  onProfileChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onViewModeChange: (mode: 'table' | 'grid') => void;
  onSelectUser: (userId: string) => void;
  onSelectAll: () => void;
  onViewActivity: (user: User) => void;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onClone: (user: User) => void;
  onCreate: () => void;
  onExport: () => void;
  onBulkActivate: () => void;
  onBulkDeactivate: () => void;
  onBulkResetPassword: () => void;
  onBulkDelete: () => void;
}

const UserManagementTemplate: React.FC<UserManagementTemplateProps> = ({
  users,
  selectedUsers,
  searchTerm,
  filterProfile,
  filterStatus,
  filterDepartment,
  viewMode,
  onSearchChange,
  onProfileChange,
  onStatusChange,
  onDepartmentChange,
  onViewModeChange,
  onSelectUser,
  onSelectAll,
  onViewActivity: propOnViewActivity,
  onView: propOnView,
  onEdit: propOnEdit,
  onClone,
  onCreate: propOnCreate,
  onExport,
  onBulkActivate,
  onBulkDeactivate,
  onBulkResetPassword,
  onBulkDelete
}) => {
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [selectedUserForActivity, setSelectedUserForActivity] = useState<User | null>(null);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userModalMode, setUserModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedUserForModal, setSelectedUserForModal] = useState<User | null>(null);

  const handleViewActivity = (user: User) => {
    setSelectedUserForActivity(user);
    setIsActivityModalOpen(true);
    propOnViewActivity(user);
  };

  const handleCloseActivityModal = () => {
    setIsActivityModalOpen(false);
    setSelectedUserForActivity(null);
  };

  const handleCreateUser = () => {
    setSelectedUserForModal(null);
    setUserModalMode('create');
    setIsUserModalOpen(true);
    propOnCreate();
  };

  const handleViewUser = (user: User) => {
    setSelectedUserForModal(user);
    setUserModalMode('view');
    setIsUserModalOpen(true);
    propOnView(user);
  };

  const handleEditUser = (user: User) => {
    setSelectedUserForModal(user);
    setUserModalMode('edit');
    setIsUserModalOpen(true);
    propOnEdit(user);
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
    setSelectedUserForModal(null);
  };

  const handleSaveUser = (userData: Partial<User>) => {
    console.log('Dados do usuário salvos/criados:', userData);
    handleCloseUserModal();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-display font-semibold text-gray-800">
            Gestão de Usuários
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie usuários e permissões individuais
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto">
          <Button
            variant="outline"
            size="medium"
            onClick={() => onViewModeChange(viewMode === 'table' ? 'grid' : 'table')}
            className="w-full md:w-auto"
          >
            {viewMode === 'table' ? 'Grade' : 'Tabela'}
          </Button>
          <Button
            variant="outline"
            size="medium"
            icon={Download}
            onClick={onExport}
            className="w-full md:w-auto"
          >
            Exportar
          </Button>
          <Button
            variant="primary"
            size="medium"
            icon={Plus}
            onClick={handleCreateUser}
            className="w-full md:w-auto"
          >
            Novo Usuário
          </Button>
        </div>
      </div>

      {/* Filters */}
      <UserFilters
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        filterProfile={filterProfile}
        onProfileChange={onProfileChange}
        filterStatus={filterStatus}
        onStatusChange={onStatusChange}
        filterDepartment={filterDepartment}
        onDepartmentChange={onDepartmentChange}
      />

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <BulkActions
          selectedCount={selectedUsers.length}
          onDelete={onBulkDelete}
          onActivate={onBulkActivate}
          onDeactivate={onBulkDeactivate}
          onResetPassword={onBulkResetPassword}
        />
      )}

      {/* Users List/Grid */}
      {viewMode === 'table' ? (
        <UserTable
          users={users}
          selectedUsers={selectedUsers}
          onSelectUser={onSelectUser}
          onSelectAll={onSelectAll}
          onViewActivity={handleViewActivity}
          onView={handleViewUser}
          onEdit={handleEditUser}
          onClone={onClone}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEditUser}
              onView={handleViewUser}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Mostrando {users.length} de {users.length} usuários
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="small"
            disabled
          >
            Anterior
          </Button>
          <Button
            variant="primary"
            size="small"
          >
            1
          </Button>
          <Button
            variant="outline"
            size="small"
            disabled
          >
            2
          </Button>
          <Button
            variant="outline"
            size="small"
            disabled
          >
            Próximo
          </Button>
        </div>
      </div>

      {isActivityModalOpen && selectedUserForActivity && (
        <UserActivityModal
          isOpen={isActivityModalOpen}
          user={selectedUserForActivity}
          onClose={handleCloseActivityModal}
        />
      )}

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

export default UserManagementTemplate;