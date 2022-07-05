export interface PaginatorModel {
  currentPage: number;
  firstItem: number;
  lastPage: number;
  perPage: number;
  lastItem: number;
  totalItems: number;
}

export interface PaginatorDto extends Partial<PaginatorModel> {
}
