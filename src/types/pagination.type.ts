export class PaginationOptions {
  page: number;
  limit: number;
  offset: number;
}

export interface IPaginationResponse<T> {
  data: T;
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
}
