import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  CreateInstitutionDto,
  UpdateInstitutionDto,
  InstitutionModel,
  CreateEnrollmentDto,
  EnrollmentModel
} from '@models/core';
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageService} from "@services/core";

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsHttpService {
  API_URL = `${environment.API_URL}/enrollments`;

  constructor(private coreService: CoreService, private httpClient: HttpClient, private messageService: MessageService) {
  }

  create(payload: CreateEnrollmentDto): Observable<EnrollmentModel> {
    const url = `${this.API_URL}`;

    this.coreService.isProcessing = true;
    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map((response) => {
        this.coreService.isProcessing = false;
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  find(page: number = 0, search: string = ''): Observable<ServerResponse> {
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

  findEnrollmentDetailsByEnrollment( id: string,  page: number = 0, search: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL}/${id}`;

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

  findOne(id: string): Observable<EnrollmentModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  update(id: string, payload: UpdateInstitutionDto): Observable<EnrollmentModel> {
    const url = `${this.API_URL}/${id}`;

    this.coreService.isProcessing=true;
    return this.httpClient.put<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing=false;
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  reactivate(id: string): Observable<InstitutionModel> {
    const url = `${this.API_URL}/${id}/reactivate`;

    return this.httpClient.put<ServerResponse>(url, null).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  remove(id: string): Observable<InstitutionModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.delete<ServerResponse>(url).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  removeAll(institutions: EnrollmentModel[]): Observable<InstitutionModel[]> {
    const url = `${this.API_URL}/remove-all`;

    return this.httpClient.patch<ServerResponse>(url, institutions).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  hide(id: string): Observable<EnrollmentModel> {
    const url = `${this.API_URL}/${id}/hide`;

    return this.httpClient.patch<ServerResponse>(url, null).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  approve(id: string): Observable<EnrollmentModel> {
    const url = `${this.API_URL}/${id}/approve`;

    return this.httpClient.patch<ServerResponse>(url, null).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  reject(id: string): Observable<EnrollmentModel> {
    const url = `${this.API_URL}/${id}/reject`;

    return this.httpClient.patch<ServerResponse>(url, null).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  enroll(id: string): Observable<EnrollmentModel> {
    const url = `${this.API_URL}/${id}/enroll`;

    return this.httpClient.patch<ServerResponse>(url, null).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  revoke(id: string): Observable<EnrollmentModel> {
    const url = `${this.API_URL}/${id}/revoke`;

    return this.httpClient.patch<ServerResponse>(url, null).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }
}
