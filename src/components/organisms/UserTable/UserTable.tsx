import React from 'react';
import { Activity, Eye, Edit, Copy, MoreHorizontal } from 'lucide-react';
import Button from '../../atoms/Button/Button';
import Badge from '../../atoms/Badge/Badge';
import Image from 'next/image';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  profile: 'admin' | 'financial' | 'support' | 'developers' | 'marketing' | 'custom';
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'blocked' | 'pending';
  lastAccess: string;
  createdAt: string;
  phone: string;
  cpf: string;
  hasCustomPermissions: boolean;
  dailyQueryLimit: number;
  monthlyCostLimit: number;
  queriesThisMonth: number;
  costThisMonth: number;
}

interface UserTableProps {
  users: User[];
  selectedUsers: string[];
  onSelectUser: (userId: string) => void;
  onSelectAll: () => void;
  onViewActivity: (user: User) => void;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onClone: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  selectedUsers,
  onSelectUser,
  onSelectAll,
  onViewActivity,
  onView,
  onEdit,
  onClone
}) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    if (dateString === 'Nunca') return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-1 sm:px-3 py-1 sm:py-2 text-left">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === users.length && users.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
              </th>
              <th className="px-1 sm:px-3 py-1 sm:py-2 text-left text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">
                Usuário
              </th>
              <th className="px-1 sm:px-3 py-1 sm:py-2 text-left text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Perfil
              </th>
              <th className="px-1 sm:px-3 py-1 sm:py-2 text-left text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Departamento
              </th>
              <th className="px-1 sm:px-3 py-1 sm:py-2 text-left text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Status
              </th>
              <th className="px-1 sm:px-3 py-1 sm:py-2 text-left text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Último Acesso
              </th>
              <th className="px-1 sm:px-3 py-1 sm:py-2 text-left text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Uso Mensal
              </th>
              <th className="px-1 sm:px-3 py-1 sm:py-2 text-right text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-1 sm:px-3 py-1 sm:py-3">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => onSelectUser(user.id)}
                    className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                </td>
                <td className="px-1 sm:px-3 py-1 sm:py-3">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-secondary-50 rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={28}
                          height={28}
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-[10px] sm:text-xs text-secondary-800 font-bold">{getInitials(user.name)}</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <p className="font-bold text-gray-800 text-[10px] sm:text-xs">{user.name}</p>
                        {user.hasCustomPermissions && (
                          <Badge variant="profile" type="custom" className="ml-1" />
                        )}
                      </div>
                      <p className="text-[10px] sm:text-xs text-gray-600">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-1 sm:px-3 py-1 sm:py-3 hidden md:table-cell">
                  <Badge variant="profile" type={user.profile} />
                </td>
                <td className="px-1 sm:px-3 py-1 sm:py-3 text-[10px] sm:text-xs text-gray-800 hidden lg:table-cell">
                  {user.department}
                </td>
                <td className="px-1 sm:px-3 py-1 sm:py-3 hidden md:table-cell">
                  <Badge variant="status" type={user.status} />
                </td>
                <td className="px-1 sm:px-3 py-1 sm:py-3 text-[10px] sm:text-xs text-gray-600 hidden lg:table-cell">
                  {formatDate(user.lastAccess)}
                </td>
                <td className="px-1 sm:px-3 py-1 sm:py-3 hidden md:table-cell">
                  <div className="text-[10px] sm:text-xs">
                    <div className="text-gray-800">{user.queriesThisMonth.toLocaleString()} consultas</div>
                    <div className="text-gray-600">{formatCurrency(user.costThisMonth)}</div>
                  </div>
                </td>
                <td className="px-1 sm:px-3 py-1 sm:py-3 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="icon"
                      size="small"
                      icon={Activity}
                      onClick={() => onViewActivity(user)}
                      title="Ver Atividade"
                      iconOnly
                    />
                    <Button
                      variant="icon"
                      size="small"
                      icon={Eye}
                      onClick={() => onView(user)}
                      title="Visualizar"
                      iconOnly
                    />
                    <Button
                      variant="icon"
                      size="small"
                      icon={Edit}
                      onClick={() => onEdit(user)}
                      title="Editar"
                      iconOnly
                    />
                    <Button
                      variant="icon"
                      size="small"
                      icon={Copy}
                      onClick={() => onClone(user)}
                      title="Clonar"
                      iconOnly
                    />
                    <Button
                      variant="icon"
                      size="small"
                      icon={MoreHorizontal}
                      title="Mais opções"
                      iconOnly
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable; 