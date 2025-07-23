'use client';

import React from 'react';
import { ButtonGroup } from '@mui/material';
import Button, { ButtonVariant } from '@/components/atoms/Button/Button';

interface ButtonsSwitchOption {
  label: string;
  value: string;
  color?: ButtonVariant; // cor opcional para cada botão
}

interface ButtonsSwitchProps {
  options: ButtonsSwitchOption[];
  value: string;
  onChange: (value: string) => void;
}

const ButtonsSwitch: React.FC<ButtonsSwitchProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="w-full bg-gray-200 rounded p-[5px]">
      <ButtonGroup className="w-full">
        {options.map(({ label, value: optVal }) => (
          <Button
            key={optVal}
            onClick={() => onChange(optVal)}
            className={`flex-1 focus:outline-none focus:ring-0 ${
              value === optVal
                ? 'bg-white text-gray-900 border-gray-300'
                : 'bg-gray-200 text-gray-500 border-gray-200'
            }`}
            variant="outline"
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default ButtonsSwitch;