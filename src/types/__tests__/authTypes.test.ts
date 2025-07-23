import { describe, it, expect } from 'vitest';
import {
  UserRole,
  UserEnvironment,
  Permission,
  validateSingleProfile,
  getActiveProfile,
  createProfile,
  getDefaultRedirectPath,
  canAccessEnvironment
} from '@/types/auth';

describe('Auth Types and Utilities', () => {
  describe('UserProfile Validation', () => {
    it('should validate single active profile correctly', () => {
      // Test cases for valid single profiles
      expect(validateSingleProfile({ isKsi: true, isFranchisee: false, isPartner: false })).toBe(true);
      expect(validateSingleProfile({ isKsi: false, isFranchisee: true, isPartner: false })).toBe(true);
      expect(validateSingleProfile({ isKsi: false, isFranchisee: false, isPartner: true })).toBe(true);

      // Test cases for invalid profiles
      expect(validateSingleProfile({ isKsi: true, isFranchisee: true, isPartner: false })).toBe(false);
      expect(validateSingleProfile({ isKsi: false, isFranchisee: true, isPartner: true })).toBe(false);
      expect(validateSingleProfile({ isKsi: true, isFranchisee: false, isPartner: true })).toBe(false);
      expect(validateSingleProfile({ isKsi: true, isFranchisee: true, isPartner: true })).toBe(false);
      expect(validateSingleProfile({ isKsi: false, isFranchisee: false, isPartner: false })).toBe(false);
    });
  });

  describe('getActiveProfile', () => {
    it('should return correct active environment', () => {
      expect(getActiveProfile({ isKsi: true, isFranchisee: false, isPartner: false })).toBe(UserEnvironment.KSI);
      expect(getActiveProfile({ isKsi: false, isFranchisee: true, isPartner: false })).toBe(UserEnvironment.FRANCHISEE);
      expect(getActiveProfile({ isKsi: false, isFranchisee: false, isPartner: true })).toBe(UserEnvironment.PARTNER);
    });

    it('should return null for invalid profiles', () => {
      expect(getActiveProfile({ isKsi: true, isFranchisee: true, isPartner: false })).toBeNull();
      expect(getActiveProfile({ isKsi: false, isFranchisee: false, isPartner: false })).toBeNull();
    });
  });

  describe('createProfile', () => {
    it('should create correct profile for each role', () => {
      // KSI roles
      expect(createProfile(UserRole.ADMIN)).toEqual({ isKsi: true, isFranchisee: false, isPartner: false });
      expect(createProfile(UserRole.FINANCEIRO)).toEqual({ isKsi: true, isFranchisee: false, isPartner: false });
      expect(createProfile(UserRole.SUPORTE)).toEqual({ isKsi: true, isFranchisee: false, isPartner: false });
      expect(createProfile(UserRole.DEVS)).toEqual({ isKsi: true, isFranchisee: false, isPartner: false });
      expect(createProfile(UserRole.MARKETING)).toEqual({ isKsi: true, isFranchisee: false, isPartner: false });
      expect(createProfile(UserRole.USER)).toEqual({ isKsi: true, isFranchisee: false, isPartner: false });

      // Franchisee and Partner roles
      expect(createProfile(UserRole.FRANCHISEE)).toEqual({ isKsi: false, isFranchisee: true, isPartner: false });
      expect(createProfile(UserRole.PARTNER)).toEqual({ isKsi: false, isFranchisee: false, isPartner: true });
    });
  });

  describe('getDefaultRedirectPath', () => {
    it('should return correct paths for each environment', () => {
      expect(getDefaultRedirectPath({ isKsi: true, isFranchisee: false, isPartner: false })).toBe('/ksi/');
      expect(getDefaultRedirectPath({ isKsi: false, isFranchisee: true, isPartner: false })).toBe('/franchisee/');
      expect(getDefaultRedirectPath({ isKsi: false, isFranchisee: false, isPartner: true })).toBe('/partner/');
    });

    it('should return access denied for invalid profiles', () => {
      expect(getDefaultRedirectPath({ isKsi: false, isFranchisee: false, isPartner: false })).toBe('/acesso-negado');
      expect(getDefaultRedirectPath({ isKsi: true, isFranchisee: true, isPartner: false })).toBe('/acesso-negado');
    });
  });

  describe('canAccessEnvironment', () => {
    it('should correctly determine environment access', () => {
      // KSI profile
      const ksiProfile = { isKsi: true, isFranchisee: false, isPartner: false };
      expect(canAccessEnvironment(ksiProfile, UserEnvironment.KSI)).toBe(true);
      expect(canAccessEnvironment(ksiProfile, UserEnvironment.FRANCHISEE)).toBe(false);
      expect(canAccessEnvironment(ksiProfile, UserEnvironment.PARTNER)).toBe(false);

      // Franchisee profile
      const franchiseeProfile = { isKsi: false, isFranchisee: true, isPartner: false };
      expect(canAccessEnvironment(franchiseeProfile, UserEnvironment.KSI)).toBe(false);
      expect(canAccessEnvironment(franchiseeProfile, UserEnvironment.FRANCHISEE)).toBe(true);
      expect(canAccessEnvironment(franchiseeProfile, UserEnvironment.PARTNER)).toBe(false);

      // Partner profile
      const partnerProfile = { isKsi: false, isFranchisee: false, isPartner: true };
      expect(canAccessEnvironment(partnerProfile, UserEnvironment.KSI)).toBe(false);
      expect(canAccessEnvironment(partnerProfile, UserEnvironment.FRANCHISEE)).toBe(false);
      expect(canAccessEnvironment(partnerProfile, UserEnvironment.PARTNER)).toBe(true);
    });

    it('should return false for invalid profiles', () => {
      const invalidProfile = { isKsi: false, isFranchisee: false, isPartner: false };
      expect(canAccessEnvironment(invalidProfile, UserEnvironment.KSI)).toBe(false);
      expect(canAccessEnvironment(invalidProfile, UserEnvironment.FRANCHISEE)).toBe(false);
      expect(canAccessEnvironment(invalidProfile, UserEnvironment.PARTNER)).toBe(false);
    });
  });

  describe('Permission and Role Enums', () => {
    it('should have all expected UserRoles', () => {
      expect(Object.values(UserRole)).toEqual([
        'admin',
        'financeiro',
        'suporte',
        'devs',
        'marketing',
        'USER',
        'franchisee',
        'partner'
      ]);
    });

    it('should have all expected UserEnvironments', () => {
      expect(Object.values(UserEnvironment)).toEqual([
        'ksi',
        'franchisee',
        'partner'
      ]);
    });

    it('should have all expected Permissions', () => {
      expect(Object.values(Permission)).toEqual([
        'read_dashboard',
        'read_reports',
        'write_reports',
        'delete_reports',
        'read_bancario',
        'write_bancario',
        'read_veicular',
        'write_veicular',
        'read_localizacao',
        'write_localizacao',
        'read_juridico',
        'write_juridico',
        'read_comercial',
        'write_comercial',
        'manage_users',
        'manage_permissions',
        'manage_system',
        'export_data',
        'view_analytics',
        'advanced_search',
        'WRITE_USERS'
      ]);
    });
  });
});