import React from 'react';
import { Edit, Eye, Activity, Copy, MoreHorizontal } from 'lucide-react';
import Button from '../../../../atoms/Button/Button';
import Badge from '../../../../atoms/Badge/Badge';
import { User } from '@/types/user';
import { getInitials, formatDate, formatCurrency } from '@/utils/user';
import Image from 'next/image';

interface UserTableProps {
  users: User[];
  selectedUsers: string[];
  onSelectUser: (userId: string) => void;
  onSelectAll: (selected: boolean) => void;
  onEdit: (user: User) => void;
  onView: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  selectedUsers,
  onSelectUser,
  onSelectAll,
  onEdit,
  onView,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                checked={selectedUsers.length === users.length}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
            </th>
            <th className="px-4 py-3 text-left text-sm font-bold text-gray-600 uppercase">USUÁRIO</th>
            <th className="px-4 py-3 text-left text-sm font-bold text-gray-600 uppercase">PERFIL</th>
            <th className="px-4 py-3 text-left text-sm font-bold text-gray-600 uppercase">STATUS</th>
            <th className="px-4 py-3 text-left text-sm font-bold text-gray-600 uppercase">DEPARTAMENTO</th>
            <th className="px-4 py-3 text-left text-sm font-bold text-gray-600 uppercase">ÚLTIMO ACESSO</th>
            <th className="px-4 py-3 text-left text-sm font-bold text-gray-600 uppercase">USO MENSAL</th>
            <th className="px-4 py-3 text-right text-sm font-bold text-gray-600 uppercase">AÇÕES</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => onSelectUser(user.id)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary-50 rounded-full flex items-center justify-center">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="text-sm text-secondary-800 font-bold">{getInitials(user.name)}</span>
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{user.name}
                      {user.hasCustomPermissions && (
                          <Badge variant="profile" type="custom" className="ml-2" />
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <Badge variant="profile" type={user.profile} />
              </td>
              <td className="px-4 py-3">
                <Badge variant="status" type={user.status} />
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{user.department}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{formatDate(user.lastAccess)}</td>
              <td className="px-4 py-3">
                <div className="text-sm">
                  <div className="text-gray-800">{user.queriesThisMonth.toLocaleString()} consultas</div>
                  <div className="text-gray-600">{formatCurrency(user.costThisMonth)}</div>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="icon"
                    size="small"
                    icon={Activity}
                    onClick={() => console.log('View activity for', user.id)}
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
                    onClick={() => console.log('Clone user', user.id)}
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
  );
};

export default UserTable; 