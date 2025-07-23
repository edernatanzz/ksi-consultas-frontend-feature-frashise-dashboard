import React from 'react';
import { Search } from 'lucide-react';
import { DEPARTMENTS, PROFILE_CONFIG, STATUS_CONFIG } from '@/constants/users';

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
  onDepartmentChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar usuários..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <select
          value={filterProfile}
          onChange={(e) => onProfileChange(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Todos os Perfis</option>
          {Object.entries(PROFILE_CONFIG).map(([key, config]) => (
            <option key={key} value={key}>
              {config.name}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Todos os Status</option>
          {Object.entries(STATUS_CONFIG).map(([key, config]) => (
            <option key={key} value={key}>
              {config.name}
            </option>
          ))}
        </select>

        <select
          value={filterDepartment}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Todos os Departamentos</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UserFilters; 