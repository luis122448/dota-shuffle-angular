export interface ApiResponseList<T> {
  status: number;
  message: string;
  list: T[];
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponseObject<T> {
  status: number;
  message: string;
  object: T;
  created_at?: string;
  updated_at?: string;
}
