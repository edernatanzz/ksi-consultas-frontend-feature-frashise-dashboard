import React from 'react';
import { Search } from 'lucide-react';

interface UserFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterProfile: string;
  onProfileChange: (value: string) => void;
  filterStatus: string;
  onStatusChange: (value: string) => void;
  filterDepartment: string;
  onDepartmentChange: (value: string) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filterProfile,
  onProfileChange,
  filterStatus,
  onStatusChange,
  filterDepartment,
  onDepartmentChange
}) => {
  const departments = ['TI', 'Financeiro', 'Suporte', 'Desenvolvimento', 'Marketing', 'Comercial'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
        </div>
        
        <select
          value={filterProfile}
          onChange={(e) => onProfileChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
        >
          <option value="all">Todos os Perfis</option>
          <option value="admin">Administrador</option>
          <option value="financial">Financeiro</option>
          <option value="support">Suporte</option>
          <option value="developers">Desenvolvedores</option>
          <option value="marketing">Marketing</option>
          <option value="custom">Customizado</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
        >
          <option value="all">Todos os Status</option>
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
          <option value="blocked">Bloqueado</option>
          <option value="pending">Pendente</option>
        </select>

        <select
          value={filterDepartment}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
        >
          <option value="all">Todos os Departamentos</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UserFilters; 