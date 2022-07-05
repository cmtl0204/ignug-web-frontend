import {PaginatorModel} from '@models/core';

export interface ServerResponse {
  data?: any;
  msg?: Msg;
  token?: string;
}

export interface ServerResponsePaginator extends ServerResponse{
  meta: PaginatorModel;
  links?: Links;
}

interface Msg {
  summary: string;
  detail: string;
  code: string;
}

interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}
