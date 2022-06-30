import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {environment} from '@env/environment';
import {ProductModel} from '@models/app/product.model';
import {ServerResponseModel} from '@models/server-response.model';
import {PaginatorModel} from '@models/paginator.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API = `${environment.API}/products`;
  private paginator = new BehaviorSubject<PaginatorModel>({});
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  index(): Observable<ProductModel[]> {
    return this.httpClient.get<ServerResponseModel>(this.API).pipe(
      map(response => {
        this.paginator.next(response.paginator);
        return response.data
      })
    );
  }

  show(id: number): Observable<ProductModel> {
    return this.httpClient.get<ServerResponseModel>(`${this.API}/${id}`).pipe(
      map(response => response.data
      )
    );
  }

  store(data: any): Observable<ProductModel> {
    return this.httpClient.post<ServerResponseModel>(this.API, data).pipe(
      map(response => response.data)
    );
  }

  update(id: number, data: any): Observable<ProductModel> {
    return this.httpClient.put<ServerResponseModel>(`${this.API}/${id}`, data).pipe(
      map(response => response.data)
    );
  }

  destroy(id: number): Observable<boolean> {
    return this.httpClient.delete<ServerResponseModel>(`${this.API}/${id}`).pipe(
      map(response => response.data)
    );
  }
}
