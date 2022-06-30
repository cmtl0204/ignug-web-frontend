import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse, ServerResponsePaginator} from '@models/http-response';
import {PaginatorModel} from '@models/core';
import {CatalogueModel, ClinicalHistoryModel, TreatmentModel} from '@models/app';
import {CoreService} from "@services/core";
import {AuthService} from '@services/auth';
import {MessageService} from '@services/core';
import {ProductModel} from "@models/app/product.model";

@Injectable({
  providedIn: 'root'
})

export class ProductHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/products`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/products`;

  constructor(private httpClient: HttpClient) {

  }

  catalogue(typeId: number): Observable<ProductModel[]> {
    const url = `${this.API_URL_PRIVATE}/catalogue`;
    const params = new HttpParams().append('typeId', typeId);
    return this.httpClient.get<ServerResponse>(url,{params})
      .pipe(
        map(response => response.data)
      );
  }
}
