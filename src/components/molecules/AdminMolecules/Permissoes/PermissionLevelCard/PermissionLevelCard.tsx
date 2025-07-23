import React from 'react';
import styles from './PermissionLevelCard.module.scss';

export interface PermissionLevelCardProps {
  id: string;
  name: string;
  bgColorClass: string;
  borderColorClass: string;
  textColorClass: string;
  icon: React.ElementType;
  description: string;
  userCount: number;
  isSelected: boolean;
  onClick: () => void;
  accessedModulesCount: number;
  totalModules: number;
}

const PermissionLevelCard: React.FC<PermissionLevelCardProps> = ({
  name,
  bgColorClass,
  borderColorClass,
  textColorClass,
  icon: Icon,
  description,
  userCount,
  isSelected,
  onClick,
  accessedModulesCount,
  totalModules
}) => {
  return (
    <div
      className={`${styles.card} ${isSelected ? `${borderColorClass} border-2 bg-white shadow-lg` : 'border-gray-200 hover:border-gray-300 shadow-sm bg-white'} transition-all duration-300 ${isSelected ? 'scale-105' : 'hover:scale-102'}`}
      onClick={onClick}
    >
      <div className={styles.header}>
        <div className={`p-3 text-white rounded-lg ${bgColorClass}`}>
          <Icon sx={{ fontSize: 24, fill: 'white !important' }} />
        </div>
        <div className={styles.info}>
          <h4 className={styles.name}>{name}</h4>
          <p className={styles.description}>{description}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bgColorClass}`}>
            <span className="text-white font-bold text-lg">{userCount}</span>
          </div>
          <span className={`${styles.label} text-xs ${textColorClass}`}>usuários</span>
        </div>
      </div>
      
      {isSelected && (
        <div className={`p-3 bg-gray-50 rounded-md mt-4 flex justify-between items-center ${styles.selectedInfo}`}>
          <span className={`${styles.label} text-sm`}>Módulos com acesso:</span>
          <span className={`${styles.count} text-lg ${textColorClass}`}>
            {accessedModulesCount}/{totalModules}
          </span>
        </div>
      )}
    </div>
  );
};

export default PermissionLevelCard; 