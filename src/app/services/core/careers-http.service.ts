import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateCareerDto, UpdateCareerDto, CareerModel } from '@models/core';
import { ServerResponse } from '@models/http-response';
import { MessageService } from '@services/core';

@Injectable({
  providedIn: 'root'
})
export class CareersHttpService {
  API_URL = `${environment.API_URL}/careers`;

  constructor(private httpClient: HttpClient, private messageService: MessageService) {}

  create(payload: CreateCareerDto): Observable<CareerModel> {
    const url = `${this.API_URL}`;

    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map((response) => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  findAll(page: number = 0, search: string = ''): Observable<ServerResponse> {
    const url = this.API_URL;

    const headers = new HttpHeaders().append('pagination', 'true');
    const params = new HttpParams()
      .append('page', page.toString())
      .append('search', search);

    return this.httpClient.get<ServerResponse>(url, { headers, params }).pipe(
      map((response) => {
        return response;
      })
    );
  }

  findOne(id: string): Observable<CareerModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  update(id: string, payload: UpdateCareerDto): Observable<CareerModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.put<ServerResponse>(url, payload).pipe(
      map((response) => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  reactivate(id: string): Observable<CareerModel> {
    const url = `${this.API_URL}/${id}/reactivate`;

    return this.httpClient.put<ServerResponse>(url, null).pipe(
      map((response) => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  remove(id: string): Observable<CareerModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.delete<ServerResponse>(url).pipe(
      map((response) => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  removeAll(careers: CareerModel[]): Observable<CareerModel[]> {
    const url = `${this.API_URL}/remove-all`;

    return this.httpClient.patch<ServerResponse>(url, careers).pipe(
      map((response) => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  hide(id: string): Observable<CareerModel> {
    const url = `${this.API_URL}/${id}/hide`;

    return this.httpClient.put<ServerResponse>(url, null).pipe(
      map((response) => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }
}
