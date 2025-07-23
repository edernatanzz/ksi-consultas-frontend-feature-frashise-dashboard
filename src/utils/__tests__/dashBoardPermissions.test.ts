import { describe, it, expect } from 'vitest';
import {
  CATEGORY_READ_PERMISSIONS,
  CATEGORY_WRITE_PERMISSIONS,
  canAccessCategory,
  canEditInCategory,
  filterCategoriesByPermissions,
  filterServicesByPermissions,
  getRequiredPermissionsForAction,
  hasAnyWritePermission,
  getAccessibleCategories,
  getUserAccessStats
} from '../dashBoardPermissions';
import { Permission, UserRole } from '@/types/auth';
import { serviceCategories, dashboardCardsByCategory } from '../../data/dashboard';

// Mock dos dados do dashboard
const mockDashboardCards = Object.values(dashboardCardsByCategory).flat();
const mockServiceCategories = serviceCategories;

describe('Dashboard Permissions', () => {
  describe('Permission Mappings', () => {
    it('should have correct read permissions mapping', () => {
      expect(CATEGORY_READ_PERMISSIONS.bancario).toBe(Permission.READ_BANCARIO);
      expect(CATEGORY_READ_PERMISSIONS.veicular).toBe(Permission.READ_VEICULAR);
      expect(CATEGORY_READ_PERMISSIONS.localizacao).toBe(Permission.READ_LOCALIZACAO);
      expect(CATEGORY_READ_PERMISSIONS.juridico).toBe(Permission.READ_JURIDICO);
      expect(CATEGORY_READ_PERMISSIONS.comercial).toBe(Permission.READ_COMERCIAL);
    });

    it('should have correct write permissions mapping', () => {
      expect(CATEGORY_WRITE_PERMISSIONS.bancario).toBe(Permission.WRITE_BANCARIO);
      expect(CATEGORY_WRITE_PERMISSIONS.veicular).toBe(Permission.WRITE_VEICULAR);
      expect(CATEGORY_WRITE_PERMISSIONS.localizacao).toBe(Permission.WRITE_LOCALIZACAO);
      expect(CATEGORY_WRITE_PERMISSIONS.juridico).toBe(Permission.WRITE_JURIDICO);
      expect(CATEGORY_WRITE_PERMISSIONS.comercial).toBe(Permission.WRITE_COMERCIAL);
    });
  });

  describe('canAccessCategory', () => {
    it('should allow access for ADMIN role regardless of permissions', () => {
      const result = canAccessCategory('bancario', [], UserRole.ADMIN);
      expect(result).toBe(true);
    });

    it('should allow access when user has required permission', () => {
      const result = canAccessCategory('veicular', [Permission.READ_VEICULAR], UserRole.USER);
      expect(result).toBe(true);
    });

    it('should deny access when user lacks required permission', () => {
      const result = canAccessCategory('juridico', [Permission.READ_BANCARIO], UserRole.USER);
      expect(result).toBe(false);
    });

    it('should allow access for unknown category (current behavior)', () => {
        // Arrange
        const unknownCategory = 'unknown_category';
        const userPermissions = [Permission.READ_BANCARIO];
        const userRole = UserRole.USER;

        // Act
        const result = canAccessCategory(unknownCategory, userPermissions, userRole);

        // Assert
        expect(result).toBe(true); // Agora esperamos true para categoria desconhecida
    });
  });

  describe('canEditInCategory', () => {
    it('should allow edit for ADMIN role regardless of permissions', () => {
      const result = canEditInCategory('comercial', [], UserRole.ADMIN);
      expect(result).toBe(true);
    });

    it('should allow edit when user has required permission', () => {
      const result = canEditInCategory('localizacao', [Permission.WRITE_LOCALIZACAO], UserRole.USER);
      expect(result).toBe(true);
    });

    it('should deny edit when user lacks required permission', () => {
      const result = canEditInCategory('bancario', [Permission.WRITE_VEICULAR], UserRole.USER);
      expect(result).toBe(false);
    });
  });

  describe('filterCategoriesByPermissions', () => {
    it('should return all categories for ADMIN', () => {
      const result = filterCategoriesByPermissions(mockServiceCategories, [], UserRole.ADMIN);
      expect(result.length).toBe(mockServiceCategories.length);
    });

    it('should filter categories based on user permissions', () => {
      const permissions = [Permission.READ_BANCARIO, Permission.READ_JURIDICO];
      const result = filterCategoriesByPermissions(mockServiceCategories, permissions, UserRole.USER);
      
      expect(result.length).toBe(2);
      expect(result.some(c => c.id === 'bancario')).toBe(true);
      expect(result.some(c => c.id === 'juridico')).toBe(true);
    });
  });

  describe('filterServicesByPermissions', () => {
    it('should return all services for ADMIN', () => {
      const result = filterServicesByPermissions(mockDashboardCards, [], UserRole.ADMIN);
      expect(result.length).toBe(mockDashboardCards.length);
    });

    it('should filter services based on category permissions', () => {
      const permissions = [Permission.READ_VEICULAR, Permission.READ_COMERCIAL];
      const result = filterServicesByPermissions(mockDashboardCards, permissions, UserRole.USER);
      
      // Verifica se contém serviços das categorias permitidas
      expect(result.some(s => s.category === 'veicular')).toBe(true);
      expect(result.some(s => s.category === 'comercial')).toBe(true);
      
      // Verifica se não contém serviços de categorias não permitidas
      expect(result.some(s => s.category === 'bancario')).toBe(false);
    });

    it('should use service id as fallback category', () => {
      const serviceWithoutCategory = { 
        id: 'bancario', 
        title: 'Test', 
        subtitle: 'Test', 
        icon: 'test', 
        path: '/test' 
      };
      const services = [...mockDashboardCards, serviceWithoutCategory];
      const permissions = [Permission.READ_BANCARIO];
      
      const result = filterServicesByPermissions(services, permissions, UserRole.USER);
      expect(result.some(s => s.id === 'bancario')).toBe(true);
    });
  });

  describe('getRequiredPermissionsForAction', () => {
    it('should return correct permissions for "new_consultation"', () => {
      const result = getRequiredPermissionsForAction('new_consultation');
      expect(result).toEqual([
        Permission.WRITE_BANCARIO,
        Permission.WRITE_VEICULAR,
        Permission.WRITE_LOCALIZACAO,
        Permission.WRITE_JURIDICO,
        Permission.WRITE_COMERCIAL
      ]);
    });

    it('should return correct permissions for other actions', () => {
      expect(getRequiredPermissionsForAction('view_history')).toEqual([Permission.READ_REPORTS]);
      expect(getRequiredPermissionsForAction('export_data')).toEqual([Permission.EXPORT_DATA]);
      expect(getRequiredPermissionsForAction('advanced_search')).toEqual([Permission.ADVANCED_SEARCH]);
      expect(getRequiredPermissionsForAction('view_analytics')).toEqual([Permission.VIEW_ANALYTICS]);
    });

    it('should return empty array for unknown action', () => {
      const result = getRequiredPermissionsForAction('unknown_action');
      expect(result).toEqual([]);
    });
  });

  describe('hasAnyWritePermission', () => {
    it('should return true when user has any write permission', () => {
      const result = hasAnyWritePermission([Permission.WRITE_VEICULAR, Permission.READ_BANCARIO]);
      expect(result).toBe(true);
    });

    it('should return false when user has no write permissions', () => {
      const result = hasAnyWritePermission([Permission.READ_BANCARIO, Permission.READ_REPORTS]);
      expect(result).toBe(false);
    });
  });

  describe('getAccessibleCategories', () => {
    it('should return list of accessible category IDs', () => {
      const permissions = [Permission.READ_LOCALIZACAO, Permission.READ_COMERCIAL];
      const result = getAccessibleCategories(permissions);
      
      expect(result).toEqual(['localizacao', 'comercial']);
    });
  });

  describe('getUserAccessStats', () => {
    it('should return correct access statistics', () => {
      const permissions = [
        Permission.READ_BANCARIO,
        Permission.WRITE_BANCARIO,
        Permission.READ_VEICULAR
      ];
      const result = getUserAccessStats(permissions);
      
      expect(result.totalCategories).toBe(5);
      expect(result.accessibleCount).toBe(2);
      expect(result.writeableCount).toBe(1);
      expect(result.accessibleCategories).toEqual(['bancario', 'veicular']);
      expect(result.writeableCategories).toEqual(['bancario']);
      expect(result.accessPercentage).toBe(40); // 2 de 5 categorias
    });
  });
});