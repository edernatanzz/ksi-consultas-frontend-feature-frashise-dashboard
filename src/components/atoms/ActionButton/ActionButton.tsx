import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '../Button/Button';
import { ButtonVariant } from '../Button/Button';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  variant: ButtonVariant;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  label,
  variant,
  onClick,
}) => {
  return (
    <Button 
      variant={variant}
      startIcon={<Icon size={16} />}
      fullWidth
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default ActionButton; 