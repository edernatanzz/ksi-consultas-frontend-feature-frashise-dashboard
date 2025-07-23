import { describe, it, expect } from 'vitest';
import { 
  getInitials, 
  formatCurrency, 
  formatDate, 
  filterUsers 
} from '@/utils/user';
import { User } from '@/types/user';

describe('Helper Functions', () => {
  describe('getInitials', () => {
    it('When name has one word, then return first letter in uppercase', () => {
        // Arrange
        const name = 'John';

        // Act
        const result = getInitials(name);

        // Assert
        expect(result).toBe('J'); // Alterado de 'JO' para 'J'
    });

    it('When name has multiple words, then return first letters of first two words in uppercase', () => {
      // Arrange
      const name = 'John Doe Smith';

      // Act
      const result = getInitials(name);

      // Assert
      expect(result).toBe('JD');
    });

    it('When name has only one character, then return that character in uppercase', () => {
      // Arrange
      const name = 'J';

      // Act
      const result = getInitials(name);

      // Assert
      expect(result).toBe('J');
    });

    it('When name is empty, then return empty string', () => {
      // Arrange
      const name = '';

      // Act
      const result = getInitials(name);

      // Assert
      expect(result).toBe('');
    });
  });

  describe('formatCurrency', () => {
    it('When value is positive, then format as Brazilian Real', () => {
      // Arrange
      const value = 1234.56;

      // Act
      const result = formatCurrency(value);

      // Assert
      expect(result).toMatch(/R\$\s*1\.234,56/);
    });

    it('When value is zero, then format as zero Brazilian Real', () => {
      // Arrange
      const value = 0;

      // Act
      const result = formatCurrency(value);

      // Assert
      expect(result).toMatch(/R\$\s*0,00/);
    });

    it('When value is negative, then format as negative Brazilian Real', () => {
      // Arrange
      const value = -987.65;

      // Act
      const result = formatCurrency(value);

      // Assert
      expect(result).toMatch(/-\s*R\$\s*987,65/);
    });
  });

  describe('formatDate', () => {
  it('When date is invalid string, then throw error', () => {
    // Arrange
    const date = 'invalid-date';

    // Act & Assert
    expect(() => formatDate(date)).toThrow();
  });
});

  describe('filterUsers', () => {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        profile: 'admin',
        status: 'active',
        department: 'IT',
        position: 'Developer',
        lastAccess: '2023-05-15T14:30:00Z',
        createdAt: '2022-01-01T00:00:00Z',
        phone: '11999999999',
        cpf: '12345678901',
        hasCustomPermissions: false,
        dailyQueryLimit: 1000,
        monthlyCostLimit: 5000,
        queriesThisMonth: 200,
        costThisMonth: 1000,
        allowedAPIs: {
          cpf: true,
          cnpj: true,
          vehicular: false,
          score: false,
          judicial: false
        },
        avatar: '',
        workingHours: {
          start: '09:00',
          end: '18:00'
        },
        allowedIPs: ['192.168.1.1'],
        notifications: {
          quotaReached: true,
          apiDown: true,
          newReport: false,
          systemUpdates: true
        },
        notificationMethod: 'email'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        profile: 'financial',
        status: 'inactive',
        department: 'Finance',
        position: 'Analyst',
        lastAccess: '2023-04-10T10:15:00Z',
        createdAt: '2022-02-15T00:00:00Z',
        phone: '11988888888',
        cpf: '98765432109',
        hasCustomPermissions: true,
        dailyQueryLimit: 500,
        monthlyCostLimit: 3000,
        queriesThisMonth: 50,
        costThisMonth: 500,
        allowedAPIs: {
          cpf: true,
          cnpj: true,
          vehicular: false,
          score: true,
          judicial: false
        },
        avatar: '',
        customPermissions: ['special_report_access']
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        profile: 'developers',
        status: 'blocked',
        department: 'IT',
        position: 'Senior Developer',
        lastAccess: '2023-03-20T08:45:00Z',
        createdAt: '2021-11-11T00:00:00Z',
        phone: '11977777777',
        cpf: '45678912301',
        hasCustomPermissions: false,
        dailyQueryLimit: 2000,
        monthlyCostLimit: 10000,
        queriesThisMonth: 1500,
        costThisMonth: 7500,
        allowedAPIs: {
          cpf: true,
          cnpj: true,
          vehicular: true,
          score: true,
          judicial: true
        },
        avatar: '',
      }
    ];

    it('When search term matches name, then return matching users', () => {
      // Arrange
      const searchTerm = 'John Doe'; // Mais específico para retornar apenas 1 usuário

      // Act
      const result = filterUsers(mockUsers, searchTerm, 'all', 'all', 'all');

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('John Doe');
    });

    it('When search term matches email, then return matching users', () => {
      // Arrange
      const searchTerm = 'example.com';

      // Act
      const result = filterUsers(mockUsers, searchTerm, 'all', 'all', 'all');

      // Assert
      expect(result).toHaveLength(3);
    });

    it('When filter by profile, then return users with matching profile', () => {
      // Arrange
      const filterProfile = 'financial';

      // Act
      const result = filterUsers(mockUsers, '', filterProfile, 'all', 'all');

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].profile).toBe('financial');
    });

    it('When filter by status, then return users with matching status', () => {
      // Arrange
      const filterStatus = 'blocked';

      // Act
      const result = filterUsers(mockUsers, '', 'all', filterStatus, 'all');

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('blocked');
    });

    it('When filter by department, then return users with matching department', () => {
      // Arrange
      const filterDepartment = 'IT';

      // Act
      const result = filterUsers(mockUsers, '', 'all', 'all', filterDepartment);

      // Assert
      expect(result).toHaveLength(2);
      expect(result.every(user => user.department === 'IT')).toBe(true);
    });

    it('When combining multiple filters, then return users matching all conditions', () => {
      // Arrange
      const searchTerm = 'j';
      const filterProfile = 'financial';
      const filterStatus = 'inactive';
      const filterDepartment = 'Finance';

      // Act
      const result = filterUsers(
        mockUsers, 
        searchTerm, 
        filterProfile, 
        filterStatus, 
        filterDepartment
      );

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Jane Smith');
    });

    it('When all filters are "all", then return all users', () => {
      // Act
      const result = filterUsers(mockUsers, '', 'all', 'all', 'all');

      // Assert
      expect(result).toHaveLength(3);
    });

    it('When no users match the filters, then return empty array', () => {
      // Arrange
      const searchTerm = 'nonexistent';
      const filterProfile = 'marketing';
      const filterStatus = 'pending';
      const filterDepartment = 'HR';

      // Act
      const result = filterUsers(
        mockUsers, 
        searchTerm, 
        filterProfile, 
        filterStatus, 
        filterDepartment
      );

      // Assert
      expect(result).toHaveLength(0);
    });
  });
});