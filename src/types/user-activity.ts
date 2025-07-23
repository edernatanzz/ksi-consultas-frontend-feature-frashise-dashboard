export interface UserActivityMetrics {
  totalQueries: number;
  totalCost: number;
  averagePerDay: number;
  costPerQuery: number;
  successRate: number;
  averageSessionDuration: string; // e.g., "45min"
}

export interface DailyActivityData {
  date: string; // e.g., "31/12"
  value1: number;
  value2: number;
}

export interface CostDistributionData {
  api: string;
  cost: number;
}

export type ActivityType = 'consulta' | 'relatorio' | 'login';

export interface ActivityTimelineItem {
  id: string;
  type: ActivityType;
  description: string;
  timestamp: string; // e.g., "15/01/2024, 16:45:32"
  details?: {
    api?: string;
    cost?: number;
    period?: string;
    ip?: string;
  };
  icon?: string; // Optional: if we decide to use specific icons for each type
}

export interface UserActivityData {
  metrics: UserActivityMetrics;
  dailyActivity: DailyActivityData[];
  costDistribution: CostDistributionData[];
  timeline: ActivityTimelineItem[];
} 