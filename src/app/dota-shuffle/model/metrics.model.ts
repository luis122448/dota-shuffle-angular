export interface MetricsModel {
  id: number;
  project_id: number;
  metrics_type: string;
  name: string;
  value_integer?: number;
  value_float?: number;
  value_string?: string;
  value_date?: string;
  value_boolean?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface NumberMetricsModel {
  id: number;
  project_id: number;
  value_integer: number;
}
