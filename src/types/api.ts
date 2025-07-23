export type ApiStatus = 'healthy' | 'warning' | 'slow' | 'error';

export interface ApiDataItem {
  id: string;
  name: string;
  provider: string;
  status: ApiStatus;
  usage: number;
  latency: number;
  errors: number;
}