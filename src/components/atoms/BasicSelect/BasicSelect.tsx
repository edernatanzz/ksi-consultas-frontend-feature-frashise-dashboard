'use client';

import * as React from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

export interface BasicSelectOption {
  label: string;
  value: string | number;
}

export interface BasicSelectProps {
  label?: string;
  value?: string | number;
  onChange: (value: string | number) => void;
  options: BasicSelectOption[];
  disabled?: boolean;
}

const BasicSelect: React.FC<BasicSelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    const option = options.find(opt => String(opt.value) === selectedValue);
    if (option) {
      onChange(option.value);
    }
  };

  return (
    <FormControl fullWidth>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        label={label}
        value={value !== undefined ? String(value) : ''}
        onChange={handleChange}
        disabled={disabled}
      >
        {options.map((option: BasicSelectOption) => (
          <MenuItem key={option.value} value={String(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BasicSelect;