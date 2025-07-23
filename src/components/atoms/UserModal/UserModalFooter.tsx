import React from 'react';
import { Save } from 'lucide-react';
import Button from '../Button/Button';

interface UserModalFooterProps {
  isReadOnly: boolean;
  mode: 'create' | 'edit' | 'view';
  onClose: () => void;
  onSave: () => void;
}

const UserModalFooter: React.FC<UserModalFooterProps> = ({
  isReadOnly,
  mode,
  onClose,
  onSave
}) => {
  return (
    <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
      <Button
        variant="outline"
        size="small"
        onClick={onClose}
      >
        {isReadOnly ? 'Fechar' : 'Cancelar'}
      </Button>
      {!isReadOnly && (
        <Button
          onClick={onSave}
          variant="primary"
          size="small"
          icon={Save}
        >
          <span>{mode === 'create' ? 'Criar Usuário' : 'Salvar Alterações'}</span>
        </Button>
      )}
    </div>
  );
};

export default UserModalFooter; 