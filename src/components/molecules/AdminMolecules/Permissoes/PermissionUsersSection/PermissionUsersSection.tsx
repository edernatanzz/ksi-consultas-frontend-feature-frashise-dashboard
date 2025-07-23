import React from 'react';
import { Person, ErrorOutline } from '@mui/icons-material';
import styles from './PermissionUsersSection.module.scss';
import Button from '../../../../atoms/Button/Button';

export interface PermissionLevelData {
  id: string;
  name: string;
  color: string;
  textColor: string;
  icon: React.ElementType;
  userCount: number;
}

interface PermissionUsersSectionProps {
  selectedLevelData: PermissionLevelData | null;
}

const PermissionUsersSection: React.FC<PermissionUsersSectionProps> = ({
  selectedLevelData
}) => {
  if (!selectedLevelData) {
    return null;
  }

  const IconComponent = selectedLevelData.icon;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={`${styles.icon} ${selectedLevelData.color}`}>
          <IconComponent sx={{ fontSize: 24, fill: 'white !important' }} />
        </div>
        <div>
          <h3 className={styles.title}>
            {selectedLevelData.name} - Usuários Ativos
          </h3>
          <p className={styles.subtitle}>
            {selectedLevelData.userCount} usuários com este nível
          </p>
        </div>
      </div>

      <div className={styles.usersGrid}>
        {[...Array(selectedLevelData.userCount)].map((_, index) => (
          <div key={index} className={styles.userCard}>
            <div className={styles.userAvatar}>
              <Person sx={{ fontSize: 16, fill: 'white !important' }} className={styles.userIcon} />
            </div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>Usuário {index + 1}</p>
              <p className={styles.userEmail}>usuario{index + 1}@ksi.com.br</p>
            </div>
            <Button
              variant="ghost"
              size="small"
              onClick={() => console.log(`Action for user ${index + 1}`)}
              startIcon={<ErrorOutline sx={{ fontSize: 16 }} />}
              iconOnly={true}
              className={styles.actionButton}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionUsersSection; 