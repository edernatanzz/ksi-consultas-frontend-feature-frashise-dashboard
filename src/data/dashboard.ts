'use client'

import { Permission, UserRole } from '@/types/auth'

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  children?: MenuItem[];
  requiredPermissions?: Permission[];
  allowedRoles?: UserRole[];
  adminOnly?: boolean;
}

export interface DashboardCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  path: string;
  category?: string;
  [key: string]: unknown;
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  path: string;
  serviceCount: number;
  [key: string]: unknown;
}

// Menus específicos por ambiente
export const ksiMenuItems: MenuItem[] = [
  {
    id: 'inicio',
    label: 'INÍCIO',
    icon: 'home',
    path: '/ksi',
  },
  {
    id: 'relatorios',
    label: 'RELATÓRIOS',
    icon: 'assessment',
    path: '/ksi/relatorios',
    requiredPermissions: [Permission.READ_REPORTS],
  },
  {
    id: 'admin-dashboard',
    label: 'PAINEL ADMIN',
    icon: 'admin_panel_settings',
    path: '/ksi/admin/dashboard',
    allowedRoles: [UserRole.ADMIN, UserRole.DEVS],
  },
  {
    id: 'central-custos',
    label: 'CENTRAL DE CUSTOS',
    icon: 'payments',
    path: '/ksi/admin/central-de-custos',
    allowedRoles: [UserRole.ADMIN, UserRole.DEVS],
  },
  {
    id: 'monitoramento',
    label: 'MONITORAMENTO',
    icon: 'monitor_heart',
    path: '/ksi/admin/monitoramento',
    allowedRoles: [UserRole.ADMIN, UserRole.DEVS],
  },
  {
    id: 'usuarios',
    label: 'USUÁRIOS',
    icon: 'people',
    path: '/ksi/admin/usuarios',
    requiredPermissions: [Permission.MANAGE_USERS],
  },
  {
    id: 'inadimplentes',
    label: 'INADIMPLENTES',
    icon: 'group_off',
    path: '/inadimplentes',
    allowedRoles: [UserRole.ADMIN, UserRole.DEVS],
  },
  {
    id: 'permissoes',
    label: 'PERMISSÕES',
    icon: 'security',
    path: '/ksi/admin/permissoes',
    requiredPermissions: [Permission.MANAGE_PERMISSIONS],
  },
  {
    id: 'configuracoes',
    label: 'CONFIGURAÇÕES',
    icon: 'settings',
    path: '/ksi/configuracoes',
  },
];

export const franchiseeMenuItems: MenuItem[] = [
  {
    id: 'inicio',
    label: 'INÍCIO',
    icon: 'home',
    path: '/franchisee',
  },
  {
    id: 'dashboard',
    label: 'DASHBOARD',
    icon: 'dashboard',
    path: '/franchisee/dashboard',
  },
  {
    id: 'clientes',
    label: 'CLIENTES',
    icon: 'people',
    path: '/franchisee/clientes',
  },
  {
    id: 'consultas',
    label: 'CONSULTAS',
    icon: 'search',
    path: '/franchisee/consultas',
  },
  {
    id: 'relatorios',
    label: 'RELATÓRIOS',
    icon: 'assessment',
    path: '/franchisee/relatorios',
  },
  {
    id: 'parceiros',
    label: 'PARCEIROS',
    icon: 'business',
    path: '/franchisee/parceiros',
  },
  {
    id: 'configuracoes',
    label: 'CONFIGURAÇÕES',
    icon: 'settings',
    path: '/franchisee/configuracoes',
  },
];

export const partnerMenuItems: MenuItem[] = [
  {
    id: 'inicio',
    label: 'INÍCIO',
    icon: 'home',
    path: '/partner',
  },
  {
    id: 'dashboard',
    label: 'DASHBOARD',
    icon: 'dashboard',
    path: '/partner/dashboard',
  },
  {
    id: 'clientes',
    label: 'CLIENTES',
    icon: 'people',
    path: '/partner/clients',
  },
  {
    id: 'consultas',
    label: 'CONSULTAS',
    icon: 'search',
    path: '/partner/consultas',
  },
  {
    id: 'servicos',
    label: 'SERVIÇOS',
    icon: 'build',
    path: '/partner/services',
  },
  {
    id: 'relatorios',
    label: 'RELATÓRIOS',
    icon: 'assessment',
    path: '/partner/relatorios',
  },
  {
    id: 'suporte',
    label: 'SUPORTE',
    icon: 'help_outline',
    path: '/partner/support',
  },
  {
    id: 'configuracoes',
    label: 'CONFIGURAÇÕES',
    icon: 'settings',
    path: '/partner/configuracoes',
  },
];

// Menu padrão (compatibilidade com código existente)
export const menuItems: MenuItem[] = ksiMenuItems;

export const getFilteredMenuItems = (
  userPermissions: Permission[] = [],
  userRole?: UserRole
): MenuItem[] => {
  return menuItems.filter(item => {
    // Admin KSI tem acesso a TODOS os itens
    if (userRole === 'admin' as UserRole) {
      return true;
    }

    // Se o item é adminOnly e o usuário não é admin, não deve aparecer
    if (item.adminOnly && userRole !== 'admin') {
      return false;
    }

    // Se o item tem allowedRoles, o usuário deve ter uma role válida
    if (item.allowedRoles) {
      if (!userRole || !item.allowedRoles.includes(userRole)) {
        return false;
      }
    }

    // Se o item tem requiredPermissions, o usuário deve ter as permissões
    if (item.requiredPermissions) {
      const hasRequiredPermission = item.requiredPermissions.some(permission =>
        userPermissions.includes(permission)
      );
      if (!hasRequiredPermission) {
        return false;
      }
    }

    return true;
  });
};

export const getMenuItemsByEnvironment = (environment: string): MenuItem[] => {
  switch (environment) {
    case 'ksi':
      return ksiMenuItems;
    case 'franchisee':
      return franchiseeMenuItems;
    case 'partner':
      return partnerMenuItems;
    default:
      return ksiMenuItems;
  }
};

export const detectEnvironmentFromPath = (pathname: string): string => {
  if (pathname.startsWith('/franchisee')) return 'franchisee';
  if (pathname.startsWith('/partner')) return 'partner';
  return 'ksi';
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'bancario',
    title: 'SERVIÇOS BANCÁRIOS',
    subtitle: 'Relatórios de crédito e análises',
    icon: 'account_balance',
    path: '/ksi/categorias/bancario',
    serviceCount: 6,
  },
  {
    id: 'veicular',
    title: 'CONSULTAS VEICULARES',
    subtitle: 'ATPV, histórico, débitos',
    icon: 'directions_car',
    path: '/ksi/categorias/veicular',
    serviceCount: 8,
  },
  {
    id: 'localizacao',
    title: 'LOCALIZAÇÃO E BENS',
    subtitle: 'Localizador de pessoas e bens',
    icon: 'location_on',
    path: '/ksi/categorias/localizacao',
    serviceCount: 5,
  },
  {
    id: 'juridico',
    title: 'CONSULTAS JURÍDICAS',
    subtitle: 'Antecedentes e ações judiciais',
    icon: 'gavel',
    path: '/ksi/categorias/juridico',
    serviceCount: 4,
  },
  {
    id: 'comercial',
    title: 'SERVIÇOS COMERCIAIS',
    subtitle: 'Comunicados e negativação',
    icon: 'business',
    path: '/ksi/categorias/comercial',
    serviceCount: 3,
  },
];

export const dashboardCardsByCategory = {
  bancario: [
    {
      id: 'rating-bancario',
      title: 'RATING BANCÁRIO',
      subtitle: 'Nexourto de crédits',
      icon: 'description',
      path: '/ksi/consultas/rating-bancario',
      category: 'bancario',
    },
    {
      id: 'relatorio-top',
      title: 'RELATÓRIO TOP',
      subtitle: 'Retotoria',
      icon: 'article',
      path: '/ksi/consultas/relatorio-top',
      category: 'bancario',
    },
    {
      id: 'relatorio-ksi-master',
      title: 'RELATÓRIO KSI MASTER',
      subtitle: 'Relatório analítico de crédito',
      icon: 'star',
      path: '/ksi/consultas/relatorio-ksi-master',
      category: 'bancario',
    },
    {
      id: 'gold-reneira',
      title: 'GOLD',
      subtitle: 'Reneira crédito',
      icon: 'shield',
      path: '/ksi/consultas/relatorio-gold',
      category: 'bancario',
    },
    {
      id: 'scr-banco-central',
      title: 'SCR - BANCO CENTRAL',
      subtitle: 'Relatório analítico de crédito',
      icon: 'account_balance',
      path: '/ksi/consultas/relatorio-scr-banco-central',
      category: 'bancario',
    },
    {
      id: 'relatorio-plus',
      title: 'RELATÓRIO PLUS',
      subtitle: 'Relatório analítico de crédito - Plus',
      icon: 'person',
      path: '/ksi/consultas/relatorio-plus',
      category: 'bancario',
    },
  ],
  
  veicular: [
    {
      id: 'atpv-online',
      title: 'ATPV ONLINE',
      subtitle: 'Vsicolar compreiruretus',
      icon: 'local_shipping',
      path: '/ksi/consultas/atpv-online',
      category: 'veicular',
    },
    {
      id: 'veicular-completa',
      title: 'VEICULAR COMPLETA',
      subtitle: 'Veicular - Veicular completa',
      icon: 'directions_car',
      path: '/ksi/consultas/veicular-completa',
      category: 'veicular',
    },
    {
      id: 'historico-proprietario',
      title: 'HISTÓRICO DE PROPRIETÁRIO',
      subtitle: 'Comuiimersor du venitio',
      icon: 'history',
      path: '/ksi/consultas/historico-proprietario-1',
      category: 'veicular',
    },
    {
      id: 'denatran-plus',
      title: 'DENATRAN PLUS',
      subtitle: 'De xirion puins',
      icon: 'local_shipping',
      path: '/ksi/consultas/denatran-plus',
      category: 'veicular',
    },
    {
      id: 'atpv-renainf',
      title: 'ATPV - RENAINF',
      subtitle: 'Vsiocial ATHV',
      icon: 'commute',
      path: '/ksi/consultas/atpv-renainf',
      category: 'veicular',
    },
    {
      id: 'veicular-cautelar',
      title: 'VEICULAR CAUTELAR',
      subtitle: 'Veicular Cautelar',
      icon: 'security',
      path: '/ksi/consultas/veicular-cautelar',
      category: 'veicular',
    },
  ],
  
  localizacao: [
    {
      id: 'localizador-bens',
      title: 'LOCALIZADOR DE BENS',
      subtitle: 'Reqóira condals',
      icon: 'location_on',
      path: '/ksi/consultas/localizador-bens',
      category: 'localizacao',
    },
    {
      id: 'infobusca-nome',
      title: 'INFOBUSCA POR NOME',
      subtitle: 'Localizador - Infobusca por Nome',
      icon: 'person_search',
      path: '/ksi/consultas/infobusca-nome',
      category: 'localizacao',
    },
    {
      id: 'infobusca-cpf',
      title: 'INFOBUSCA POR CPF CNPJ',
      subtitle: 'Localizador - Infobusca por CPF/CNPJ',
      icon: 'badge',
      path: '/ksi/consultas/infobusca-cpf',
      category: 'localizacao',
    },
    {
      id: 'localizador-telefone',
      title: 'LOCALIZADOR POR TELEFONE',
      subtitle: 'Localizador - Telefone',
      icon: 'phone',
      path: '/ksi/consultas/localizador-telefone',
      category: 'localizacao',
    },
    {
      id: 'localizador-veiculo',
      title: 'LOCALIZADOR DE VEICULO',
      subtitle: 'CPF/CNPJ - Base DETRAN',
      icon: 'car_rental',
      path: '/ksi/consultas/localizador-veiculo',
      category: 'localizacao',
    },
  ],
  
  juridico: [
    {
      id: 'antecedente-criminal',
      title: 'ANTECEDENTE CRIMINAL',
      subtitle: 'Amesadietra Chimmt',
      icon: 'warning',
      path: '/ksi/consultas/antecedente-criminal',
      category: 'juridico',
    },
    {
      id: 'acao-trabalhista',
      title: 'AÇÃO TRABALHISTA',
      subtitle: 'Apjad ittaiaimeo',
      icon: 'work',
      path: '/ksi/consultas/acao-trabalhista',
      category: 'juridico',
    },
    {
      id: 'acoes-judiciais',
      title: 'AÇÕES JUDICIAIS',
      subtitle: 'Localizador - Ações Judiciais',
      icon: 'gavel',
      path: '/ksi/consultas/acoes-judiciais',
      category: 'juridico',
    },
    {
      id: 'protesto-online',
      title: 'PROTESTO ONLINE',
      subtitle: 'Protesto Online',
      icon: 'warning',
      path: '/ksi/consultas/protesto-online',
      category: 'juridico',
    },
  ],
  
  comercial: [
    {
      id: 'comunicado-vendas',
      title: 'COMUNICADO DE VENDAS',
      subtitle: 'Vsiolar comprete',
      icon: 'event_note',
      path: '/ksi/consultas/comunicado-vendas',
      category: 'comercial',
    },
    {
      id: 'negativacao-online',
      title: 'NEGATIVAÇÃO ONLINE',
      subtitle: 'Negativação Online',
      icon: 'block',
      path: '/ksi/consultas/negativacao-online',
      category: 'comercial',
    },
    {
      id: 'cheque-roubado',
      title: 'CHEQUE ROUBADO E SUSTADO',
      subtitle: 'Cheque roubado e sustado',
      icon: 'receipt',
      path: '/ksi/consultas/cheque-roubado',
      category: 'comercial',
    },
  ],
};

export const dashboardCards: DashboardCard[] = serviceCategories.map(category => ({
  id: category.id,
  title: category.title,
  subtitle: category.subtitle,
  icon: category.icon,
  path: category.path,
  category: category.id
}));