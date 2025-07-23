import React from 'react';
import { Trash2, UserRoundCheck, UserRoundX, RefreshCw } from 'lucide-react';
import Button from '../../../../atoms/Button/Button';

interface BulkActionsProps {
  selectedCount: number;
  onDelete: () => void;
  onActivate: () => void;
  onDeactivate: () => void;
  onResetPassword: () => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  onDelete,
  onActivate,
  onDeactivate,
  onResetPassword,
}) => {
  return (
    <div className="bg-primary-500 rounded-xl shadow-md p-4 flex items-center justify-between">
      <span className="text-white text-base font-medium">
        {selectedCount} usuário{selectedCount !== 1 ? 's' : ''} selecionado{selectedCount !== 1 ? 's' : ''}
      </span>
      <div className="flex items-center space-x-3">
        <Button
          variant="primary"
          size="medium"
          icon={UserRoundCheck}
          onClick={onActivate}
          disabled={selectedCount === 0}
          className="bg-primary-400 text-white hover:bg-primary-500 shadow-sm rounded-lg"
        >
          Ativar
        </Button>
        <Button
          variant="primary"
          size="medium"
          icon={UserRoundX}
          onClick={onDeactivate}
          disabled={selectedCount === 0}
          className="bg-primary-400 text-white hover:bg-primary-500 shadow-sm rounded-lg"
        >
          Desativar
        </Button>
        <Button
          variant="primary"
          size="medium"
          icon={RefreshCw}
          onClick={onResetPassword}
          disabled={selectedCount === 0}
          className="bg-primary-400 text-white hover:bg-primary-500 shadow-sm rounded-lg"
        >
          Resetar Senha
        </Button>
        <Button
          variant="primary"
          size="medium"
          icon={Trash2}
          onClick={onDelete}
          disabled={selectedCount === 0}
          className="bg-primary-400 text-white hover:bg-primary-500 shadow-sm rounded-lg"
        >
          Excluir
        </Button>
      </div>
    </div>
  );
};

export default BulkActions;