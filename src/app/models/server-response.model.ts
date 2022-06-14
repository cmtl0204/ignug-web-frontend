import {PaginatorModel} from './paginator.model';

export interface ServerResponseModel {
  data: any;
  message: any;
  paginator: PaginatorModel;
}

