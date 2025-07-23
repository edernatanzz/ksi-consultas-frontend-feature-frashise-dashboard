'use client';

import * as React from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export interface MenuOption {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export interface BasicMenuProps {
  icon?: React.ReactNode;
  options: MenuOption[];
  iconButtonProps?: React.ComponentProps<typeof IconButton>;
}

const BasicMenu: React.FC<BasicMenuProps> = ({
  icon,
  options,
  iconButtonProps,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (onClick: () => void) => {
    onClick();
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        size="small"
        {...iconButtonProps}
      >
        {/* Se nenhum ícone for passado, usa MoreHoriz como padrão */}
        {icon ?? <MoreHorizIcon />}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 4,
          sx: {
            minWidth: 180,
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            disabled={option.disabled}
            onClick={() => {if (!option.disabled) {handleOptionClick(option.onClick)}}}
          >
            {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
            <ListItemText>{option.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default BasicMenu;