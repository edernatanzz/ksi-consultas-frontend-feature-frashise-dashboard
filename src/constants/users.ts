import { User } from '@/types/user';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@ksi.com.br',
    profile: 'admin',
    department: 'TI',
    position: 'Administrador de Sistema',
    status: 'active',
    lastAccess: '2024-01-15 14:30',
    createdAt: '2023-06-15',
    phone: '(11) 99999-9999',
    cpf: '123.456.789-00',
    hasCustomPermissions: false,
    dailyQueryLimit: 10000,
    monthlyCostLimit: 5000,
    queriesThisMonth: 2450,
    costThisMonth: 1230.50
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@ksi.com.br',
    profile: 'financial',
    department: 'Financeiro',
    position: 'Analista Financeiro',
    status: 'active',
    lastAccess: '2024-01-15 16:45',
    createdAt: '2023-08-20',
    phone: '(11) 88888-8888',
    cpf: '987.654.321-00',
    hasCustomPermissions: true,
    dailyQueryLimit: 5000,
    monthlyCostLimit: 2000,
    queriesThisMonth: 1890,
    costThisMonth: 945.75
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro.costa@ksi.com.br',
    profile: 'support',
    department: 'Suporte',
    position: 'Analista de Suporte',
    status: 'inactive',
    lastAccess: '2024-01-10 09:15',
    createdAt: '2023-09-10',
    phone: '(11) 77777-7777',
    cpf: '456.789.123-00',
    hasCustomPermissions: false,
    dailyQueryLimit: 3000,
    monthlyCostLimit: 1500,
    queriesThisMonth: 0,
    costThisMonth: 0
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    email: 'ana.oliveira@ksi.com.br',
    profile: 'developers',
    department: 'Desenvolvimento',
    position: 'Desenvolvedora Senior',
    status: 'active',
    lastAccess: '2024-01-15 18:20',
    createdAt: '2023-07-05',
    phone: '(11) 66666-6666',
    cpf: '789.123.456-00',
    hasCustomPermissions: true,
    dailyQueryLimit: 8000,
    monthlyCostLimit: 3000,
    queriesThisMonth: 3200,
    costThisMonth: 1600.25
  },
  {
    id: '5',
    name: 'Carlos Ferreira',
    email: 'carlos.ferreira@ksi.com.br',
    profile: 'marketing',
    department: 'Marketing',
    position: 'Analista de Marketing',
    status: 'pending',
    lastAccess: 'Nunca',
    createdAt: '2024-01-14',
    phone: '(11) 55555-5555',
    cpf: '321.654.987-00',
    hasCustomPermissions: false,
    dailyQueryLimit: 1000,
    monthlyCostLimit: 500,
    queriesThisMonth: 0,
    costThisMonth: 0
  }
];

export const DEPARTMENTS = [
  'TI',
  'Financeiro',
  'Suporte',
  'Desenvolvimento',
  'Marketing',
  'Comercial'
];

export const PROFILE_CONFIG = {
  admin: { name: 'Administrador', color: 'bg-primary-500 text-white' },
  financial: { name: 'Financeiro', color: 'bg-secondary-800 text-white' },
  support: { name: 'Suporte', color: 'bg-green-500 text-white' },
  developers: { name: 'Desenvolvedores', color: 'bg-purple-500 text-white' },
  marketing: { name: 'Marketing', color: 'bg-orange-500 text-white' },
  custom: { name: 'Customizado', color: 'bg-gray-500 text-white' }
};

export const STATUS_CONFIG = {
  active: { name: 'Ativo', color: 'bg-green-100 text-green-800', icon: '●' },
  inactive: { name: 'Inativo', color: 'bg-gray-100 text-gray-800', icon: '⏸' },
  blocked: { name: 'Bloqueado', color: 'bg-red-100 text-red-800', icon: '⚠' },
  pending: { name: 'Pendente', color: 'bg-yellow-100 text-yellow-800', icon: '🕐' }
}; 