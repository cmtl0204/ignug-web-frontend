import {PaginatorModel} from '@models/core';

export interface ServerResponse {
  data: any;
  message: string;
  token?: string;
}

export interface ServerResponsePaginator extends ServerResponse{
  meta: PaginatorModel;
  links?: Links;
}

interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}
