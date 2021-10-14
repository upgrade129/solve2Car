export interface Option<T = any> {
  key: string | number;
  label: string;
  value: T;
}

export interface Pagination {
  page: number;
  size: number;
}
