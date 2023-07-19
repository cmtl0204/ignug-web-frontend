import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CreateCurriculmDto, UpdateCurriculmDto, CurriculmModel} from '@models/auth';
import {ServerResponse} from '@models/http-response';
import {MessageService} from "@services/core";

@Injectable({
  providedIn: 'root'
})
export class CurriculumsHttpService {
  API_URL = `${environment.API_URL}/curriculms`;

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }

  create(payload: CreateCurriculmDto): Observable<CurriculmModel> {
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
      .append('page', page)
      .append('search', search);

    return this.httpClient.get<ServerResponse>(url, {headers, params}).pipe(
      map((response) => {
        return response;
      })
    );
  }

  findOne(id: string): Observable<CurriculmModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  update(id: string, payload: UpdateCurriculmDto): Observable<CurriculmModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.put<ServerResponse>(url, payload).pipe(
      map(response => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  reactivate(id: string): Observable<CurriculmModel> {
    const url = `${this.API_URL}/${id}/reactivate`;

    return this.httpClient.put<ServerResponse>(url, null).pipe(
      map((response) => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  remove(id: string): Observable<CurriculmModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.delete<ServerResponse>(url).pipe(
      map((response) => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  removeAll(curriculms: CurriculmModel[]): Observable<CurriculmModel[]> {
    const url = `${this.API_URL}/remove-all`;

    return this.httpClient.patch<ServerResponse>(url, curriculms).pipe(
      map((response) => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  suspend(id: string): Observable<CurriculmModel> {
    const url = `${this.API_URL}/${id}/suspend`;

    return this.httpClient.put<ServerResponse>(url, null).pipe(
      map((response) => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }
}
