export interface ApiResponse<T> {
  status: string;
  data: T;
  next_page?: number;
  prev_page?: number | null;
}
