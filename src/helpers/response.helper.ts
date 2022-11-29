import { HttpException } from "@nestjs/common";

export interface IResponseParam {
  data?: any | any[];
  status?: number;
  message?: string;
}

export class Response<T> {
  message: string;
  status: number;
  data: T;
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;

  constructor({ data, status, message }: IResponseParam) {
    this.message = message ?? "success";
    this.status = status ?? 200;
    this.data = data?.data || data;
    if (data?.page) this.page = data?.page;
    if (data?.limit) this.limit = data?.limit;
    if (data?.total) this.total = data?.total;
    if (data?.totalPage) this.totalPage = data?.totalPage;
  }
}

export const response = (param: IResponseParam): Response<any> =>
  new Response(param);

export const responseError = (
  message: string,
  status = 422
): Promise<HttpException> =>
  Promise.reject(new HttpException({ message: message, status }, status));
