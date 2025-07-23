export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  profile: 'admin' | 'financial' | 'support' | 'developers' | 'marketing' | 'custom';
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'blocked' | 'pending';
  lastAccess: string;
  createdAt: string;
  phone: string;
  cpf: string;
  hasCustomPermissions: boolean;
  dailyQueryLimit: number;
  monthlyCostLimit: number;
  queriesThisMonth: number;
  costThisMonth: number;
  allowedAPIs?: {
    cpf: boolean;
    cnpj: boolean;
    vehicular: boolean;
    score: boolean;
    judicial: boolean;
  };
  workingHours?: {
    start: string;
    end: string;
  };
  allowedIPs?: string[];
  notifications?: {
    quotaReached: boolean;
    apiDown: boolean;
    newReport: boolean;
    systemUpdates: boolean;
  };
  notificationMethod?: 'email' | 'sms' | 'system';
  customPermissions?: string[];
  profileImageUrl?: string;
}

export interface UserFilters {
  searchTerm: string;
  profile: string;
  status: string;
  department: string;
}

export interface UserBulkAction {
  type: 'activate' | 'deactivate' | 'resetPassword' | 'delete';
  userIds: string[];
} 