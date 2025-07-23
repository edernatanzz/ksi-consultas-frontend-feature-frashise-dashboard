import React from 'react';
import { Edit, Eye } from 'lucide-react';
import Button from '../../../../atoms/Button/Button';
import Badge from '../../../../atoms/Badge/Badge';
import { User } from '@/types/user';
import { getInitials } from '@/utils/user';
import Image from 'next/image';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onView: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              <span className="text-gray-600 font-medium">{getInitials(user.name)}</span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {user.hasCustomPermissions && (
            <Badge variant="profile" type="custom" />
          )}
          <Button
            variant="ghost"
            size="small"
            icon={Edit}
            onClick={() => onEdit(user)}
          />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Perfil:</span>
          <Badge variant="profile" type={user.profile} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Status:</span>
          <Badge variant="status" type={user.status} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Departamento:</span>
          <span className="text-sm font-medium text-gray-800">{user.department}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="small"
          icon={Eye}
          onClick={() => onView(user)}
          className="flex-1"
        >
          Visualizar
        </Button>
        <Button
          variant="primary"
          size="small"
          icon={Edit}
          onClick={() => onEdit(user)}
          className="flex-1"
        >
          Editar
        </Button>
      </div>
    </div>
  );
};

export default UserCard; 