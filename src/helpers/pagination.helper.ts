import { PaginationInput, PaginationOptions } from "../types";
import * as isEmpty from "is-empty";

export const createPaginationOptions = (
  pageParam: PaginationInput
): PaginationOptions => {
  const pagination = new PaginationOptions();
  pagination.page =
    isEmpty(pageParam?.page) || pageParam.page <= 0
      ? 1
      : Number(pageParam.page);

  pagination.limit =
    pageParam && pageParam.limit && pageParam.limit <= 20
      ? Number(pageParam.limit)
      : 20;

  pagination.offset = (pagination.page - 1) * pagination.limit;

  return pagination;
};
