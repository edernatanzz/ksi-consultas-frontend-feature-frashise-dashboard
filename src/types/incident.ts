export interface IncidentItem {
  id: number;
  api: string;
  type: 'latency' | 'error' | 'maintenance';
  message: string;
  time: string;
  duration: string;
}