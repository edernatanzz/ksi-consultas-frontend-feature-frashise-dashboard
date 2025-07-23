import { describe, it, expect } from 'vitest'
import { 
  ksiMenuItems,
  franchiseeMenuItems,
  partnerMenuItems,
  menuItems,
  getFilteredMenuItems,
  getMenuItemsByEnvironment,
  detectEnvironmentFromPath,
  serviceCategories,
  dashboardCardsByCategory,
  dashboardCards
} from '../dashboard'
import { Permission, UserRole } from '@/types/auth'

// Tipo para as categorias de dashboard
type DashboardCategory = keyof typeof dashboardCardsByCategory

describe('Menu Items', () => {
  describe('Constant menus', () => {
    it('should have ksiMenuItems with correct structure', () => {
      expect(ksiMenuItems).toBeDefined()
      expect(ksiMenuItems.length).toBeGreaterThan(0)
      
      ksiMenuItems.forEach(item => {
        expect(item).toMatchObject({
          id: expect.any(String),
          label: expect.any(String),
          icon: expect.any(String),
          path: expect.any(String)
        })
        
        if (item.children) {
          expect(item.children).toBeInstanceOf(Array)
        }
        if (item.requiredPermissions) {
          expect(item.requiredPermissions).toBeInstanceOf(Array)
        }
        if (item.allowedRoles) {
          expect(item.allowedRoles).toBeInstanceOf(Array)
        }
        if (item.adminOnly) {
          expect(item.adminOnly).toBe(true)
        }
      })
    })

    it('should have franchiseeMenuItems with correct structure', () => {
      expect(franchiseeMenuItems).toBeDefined()
      expect(franchiseeMenuItems.length).toBeGreaterThan(0)
      expect(franchiseeMenuItems[0]).toMatchObject({
        id: 'inicio',
        label: 'INÍCIO',
        icon: 'home',
        path: '/franchisee'
      })
    })

    it('should have partnerMenuItems with correct structure', () => {
      expect(partnerMenuItems).toBeDefined()
      expect(partnerMenuItems.length).toBeGreaterThan(0)
      expect(partnerMenuItems[0]).toMatchObject({
        id: 'inicio',
        label: 'INÍCIO',
        icon: 'home',
        path: '/partner'
      })
    })

    it('should have menuItems defaulting to ksiMenuItems', () => {
      expect(menuItems).toEqual(ksiMenuItems)
    })
  })

  describe('getMenuItemsByEnvironment', () => {
    it('should return ksi menu for "ksi" environment', () => {
      const result = getMenuItemsByEnvironment('ksi')
      expect(result).toEqual(ksiMenuItems)
    })

    it('should return franchisee menu for "franchisee" environment', () => {
      const result = getMenuItemsByEnvironment('franchisee')
      expect(result).toEqual(franchiseeMenuItems)
    })

    it('should return partner menu for "partner" environment', () => {
      const result = getMenuItemsByEnvironment('partner')
      expect(result).toEqual(partnerMenuItems)
    })

    it('should default to ksi menu for unknown environment', () => {
      const result = getMenuItemsByEnvironment('unknown')
      expect(result).toEqual(ksiMenuItems)
    })
  })

  describe('detectEnvironmentFromPath', () => {
    it('should detect "franchisee" environment', () => {
      expect(detectEnvironmentFromPath('/franchisee/dashboard')).toBe('franchisee')
      expect(detectEnvironmentFromPath('/franchisee')).toBe('franchisee')
    })

    it('should detect "partner" environment', () => {
      expect(detectEnvironmentFromPath('/partner/clients')).toBe('partner')
      expect(detectEnvironmentFromPath('/partner')).toBe('partner')
    })

    it('should default to "ksi" environment', () => {
      expect(detectEnvironmentFromPath('/ksi/admin')).toBe('ksi')
      expect(detectEnvironmentFromPath('/')).toBe('ksi')
      expect(detectEnvironmentFromPath('/unknown')).toBe('ksi')
    })
  })

  describe('getFilteredMenuItems', () => {
    const testPermissions = [Permission.READ_REPORTS, Permission.MANAGE_USERS]
    const testAdminRole = UserRole.ADMIN
    const testDevRole = UserRole.DEVS
    const testUserRole = UserRole.USER

    it('should return all items for admin role', () => {
      const result = getFilteredMenuItems([], testAdminRole)
      expect(result.length).toBe(ksiMenuItems.length)
    })

    it('should filter items by required permissions', () => {
      const resultWithPermissions = getFilteredMenuItems(testPermissions, testUserRole)
      const resultWithoutPermissions = getFilteredMenuItems([], testUserRole)
      
      // Items que requerem permissões específicas
      const reportItem = ksiMenuItems.find(item => item.id === 'relatorios')!
      const usersItem = ksiMenuItems.find(item => item.id === 'usuarios')!
      
      expect(resultWithPermissions).toContainEqual(reportItem)
      expect(resultWithPermissions).toContainEqual(usersItem)
      expect(resultWithoutPermissions).not.toContainEqual(reportItem)
      expect(resultWithoutPermissions).not.toContainEqual(usersItem)
    })

    it('should filter items by allowed roles', () => {
      const devResult = getFilteredMenuItems([], testDevRole)
      const userResult = getFilteredMenuItems([], testUserRole)
      
      // Items restritos a ADMIN/DEVS
      const adminDashboardItem = ksiMenuItems.find(item => item.id === 'admin-dashboard')!
      
      expect(devResult).toContainEqual(adminDashboardItem)
      expect(userResult).not.toContainEqual(adminDashboardItem)
    })

    it('should filter adminOnly items', () => {
      const adminResult = getFilteredMenuItems([], testAdminRole)
      const userResult = getFilteredMenuItems([], testUserRole)
      
      const adminOnlyItems = ksiMenuItems.filter(item => item.adminOnly)
      
      adminOnlyItems.forEach(item => {
        expect(adminResult).toContainEqual(item)
        expect(userResult).not.toContainEqual(item)
      })
    })

    it('should return only truly public items when no role/permissions provided', () => {
    // Arrange
    const trulyPublicItems = ksiMenuItems.filter(item => 
        !item.requiredPermissions && 
        !item.allowedRoles && 
        !item.adminOnly
    );

    // Act
    const result = getFilteredMenuItems();

    // Debug: Mostrar os itens retornados
    console.log('Itens retornados:', result.map(item => item.id));
    console.log('Itens públicos esperados:', trulyPublicItems.map(item => item.id));

    // Assert
    expect(result).toEqual(trulyPublicItems);
    });
  })
})

describe('Dashboard Items', () => {
  describe('serviceCategories', () => {
    it('should have correct structure', () => {
      expect(serviceCategories).toBeDefined()
      expect(serviceCategories.length).toBeGreaterThan(0)
      
      serviceCategories.forEach(category => {
        expect(category).toMatchObject({
          id: expect.any(String),
          title: expect.any(String),
          subtitle: expect.any(String),
          icon: expect.any(String),
          path: expect.any(String),
          serviceCount: expect.any(Number)
        })
      })
    })
  })

  describe('dashboardCardsByCategory', () => {
    it('should have cards for each category', () => {
      const categories = Object.keys(dashboardCardsByCategory) as DashboardCategory[]
      expect(categories.length).toBe(serviceCategories.length)
      
      categories.forEach(category => {
        const cards = dashboardCardsByCategory[category]
        expect(cards.length).toBeGreaterThan(0)
        
        cards.forEach(card => {
          expect(card).toMatchObject({
            id: expect.any(String),
            title: expect.any(String),
            subtitle: expect.any(String),
            icon: expect.any(String),
            path: expect.any(String),
            category: expect.any(String)
          })
        })
      })
    })
  })

  describe('dashboardCards', () => {
    it('should have one card per service category', () => {
      expect(dashboardCards.length).toBe(serviceCategories.length)
    })

    it('should match service categories data', () => {
      dashboardCards.forEach(card => {
        const category = serviceCategories.find(c => c.id === card.id)
        expect(category).toBeDefined()
        expect(card.title).toBe(category?.title)
        expect(card.subtitle).toBe(category?.subtitle)
        expect(card.icon).toBe(category?.icon)
        expect(card.path).toBe(category?.path)
        expect(card.category).toBe(category?.id)
      })
    })
  })
})