import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse} from '@models/http-response';
import {PaginatorModel} from '@models/core';
import {CatalogueModel} from '@models/app';

@Injectable({
  providedIn: 'root'
})

export class CataloguesHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/app-catalogues`
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/app-catalogues`

  private paginator = new BehaviorSubject<PaginatorModel>({currentPage: 1, perPage: 15, totalItems: 0});
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  catalogue(type: string): Observable<CatalogueModel[]> {
    const params = new HttpParams().append('type', type);
    const url = `${this.API_URL_PUBLIC}/catalogue`;
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response.data)
      );
  }
}
