import React from 'react';
import { X } from 'lucide-react';
import Button from '../Button/Button';

interface UserModalHeaderProps {
  mode: 'create' | 'edit' | 'view';
  user: { name: string; email: string; } | null;
  onClose: () => void;
}

const UserModalHeader: React.FC<UserModalHeaderProps> = ({ mode, user, onClose }) => {
  return (
    <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
      <div>
        <h2 className="text-xl font-poppins font-semibold text-gray-800">
          {mode === 'create' ? 'Novo Usuário' : mode === 'edit' ? 'Editar Usuário' : 'Visualizar Usuário'}
        </h2>
        {user && (
          <p className="text-gray-600 mt-1">{user.name} - {user.email}</p>
        )}
      </div>
      <Button
        variant="ghost"
        size="small"
        icon={X}
        onClick={onClose}
      />
    </div>
  );
};

export default UserModalHeader; 