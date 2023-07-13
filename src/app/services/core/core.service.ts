import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PaginatorModel} from "@models/core";

@Injectable({
  providedIn: 'root'
})

export class CoreService {
  private _isLoading: boolean = false;
  private _isProcessing: boolean = false;

  constructor() {
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading(value: boolean) {
    if (this._isLoading != value) {
      setTimeout(() => {
        this._isLoading = value;
      }, 1);
    }
  }

  get isProcessing(): boolean {
    return this._isProcessing;
  }

  set isProcessing(value: boolean) {
    if (this._isProcessing != value) {
      setTimeout(() => {
        this._isProcessing = value;
      }, 1);
    }
  }

  get paginator(): PaginatorModel {
    return {page: 0, limit: 10, totalItems: 0, firstItem: 1, lastPage: 1, lastItem: 1};
  }
}
