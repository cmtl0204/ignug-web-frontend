import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PaginatorModel} from "@models/core";

@Injectable({
  providedIn: 'root'
})

export class CoreService {
  private loaded = new BehaviorSubject<boolean>(false);
  public loaded$ = this.loaded.asObservable();
  private paginatorModel = new BehaviorSubject<PaginatorModel>(this.paginator);
  public paginator$ = this.paginatorModel.asObservable();

  constructor() {
  }

  paginate(paginator: PaginatorModel): void {
    this.paginatorModel.next(paginator);
  }


  showLoad(): void {
    console.log('loaded true');
    this.loaded.next(true);
  }

  hideLoad(): void {
    console.log('loaded false');
    this.loaded.next(false);
  }

  get paginator(): PaginatorModel {
    return {currentPage: 1, perPage: 15, totalItems: 0, firstItem: 1, lastPage: 1, lastItem: 1};
  }
}
