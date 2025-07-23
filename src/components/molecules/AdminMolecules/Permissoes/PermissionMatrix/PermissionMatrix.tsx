import React from 'react';
import { CheckCircle, HighlightOff } from '@mui/icons-material';
import styles from './PermissionMatrix.module.scss';
import Button from '@/components/atoms/Button/Button';

export interface SystemModule {
  id: string;
  name: string;
  description: string;
}

export interface PermissionLevel {
  id: string;
  name: string;
  color: string;
  icon: React.ElementType;
}

interface PermissionMatrixProps {
  modules: SystemModule[];
  permissionLevels: PermissionLevel[];
  permissionMatrix: { [key: string]: string[] };
  onTogglePermission: (level: string, module: string) => void;
}

const PermissionMatrix: React.FC<PermissionMatrixProps> = ({
  modules,
  permissionLevels,
  permissionMatrix,
  onTogglePermission,
}) => {
  const hasPermission = (level: string, module: string) => {
    return permissionMatrix[level]?.includes(module) || false;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Matrix de Permissões</h3>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <CheckCircle sx={{ fontSize: 16, color: '#10b981' }} />
            <span>Permitido</span>
          </div>
          <div className={styles.legendItem}>
            <HighlightOff sx={{ fontSize: 16, color: '#E02725' }} />
            <span>Negado</span>
          </div>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.moduleHeader}>Módulos do Sistema</th>
              {permissionLevels.map((level) => (
                <th key={level.id} className={styles.levelHeader}>
                  <div className={styles.levelInfo}>
                    <div className={`${styles.icon} ${level.color}`}>
                      <level.icon sx={{ fontSize: 16, fill: 'white !important' }} />
                    </div>
                    <span className={styles.levelName}>{level.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => (
              <tr key={module.id} className={styles.row}>
                <td className={styles.moduleCell}>
                  <div className={styles.moduleInfo}>
                    <div className={styles.moduleName}>{module.name}</div>
                    <div className={styles.moduleDescription}>
                      {module.description}
                    </div>
                  </div>
                </td>
                {permissionLevels.map((level) => {
                  const hasAccess = hasPermission(level.id, module.id);
                  return (
                    <td key={level.id} className={styles.permissionCell}>
                      <Button
                        onClick={() => onTogglePermission(level.id, module.id)}
                        className={styles.toggleButton}
                        variant="ghost"
                        startIcon={hasAccess ? (
                          <CheckCircle sx={{ fontSize: 20, color: '#10b981' }} />
                        ) : (
                          <HighlightOff sx={{ fontSize: 20, color: '#E02725' }} />
                        )}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionMatrix; 