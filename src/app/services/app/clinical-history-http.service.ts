import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse, ServerResponsePaginator} from '@models/http-response';
import {PaginatorModel} from '@models/core';
import {ClinicalHistoryModel} from '@models/app';
import {CoreService} from "@services/core";
import {AuthService} from '@services/auth';
import {MessageService} from '@services/core';

@Injectable({
  providedIn: 'root'
})

export class ClinicalHistoryHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/clinical-histories`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/clinical-histories`;

  private clinicalHistories = new BehaviorSubject<ClinicalHistoryModel[]>([]);
  public clinicalHistories$ = this.clinicalHistories.asObservable();

  private optionField = new BehaviorSubject<string>('');
  public optionField$ = this.optionField.asObservable();

  private clinicalHistoryModel: ClinicalHistoryModel = {};
  private clinicalHistory = new BehaviorSubject<ClinicalHistoryModel>({});
  public clinicalHistory$ = this.clinicalHistory.asObservable()


  private paginator = new BehaviorSubject<PaginatorModel>({currentPage: 1, perPage: 15, totalItems: 0});
  public paginator$ = this.paginator.asObservable();

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private appService: CoreService,
              private messageService: MessageService) {

  }

  index(page: number = 1, search: string = ''): Observable<ClinicalHistoryModel[]> {
    const url = `${this.API_URL_PRIVATE}`;

    const params = new HttpParams()
      .append('page', page)
      .append('search', search);


    return this.httpClient.get<ServerResponsePaginator>(url, {params})
      .pipe(
        map(response => {
          this.paginator.next(response.meta);
          return response.data;
        }),
      );
  }

  show(id: number): Observable<ClinicalHistoryModel> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response.data)
      );
  }

  store(clinicalHistory: ClinicalHistoryModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/patients/${this.authService?.patient?.id}`;

    return this.httpClient.post<ServerResponse>(url, clinicalHistory)
      .pipe(
        map(response => {
          this.messageService.success(response);
          return response.data;
        })
      );
  }

  update(id: number, clinicalHistory: ClinicalHistoryModel): Observable<ClinicalHistoryModel> {
    const url = `${this.API_URL_PRIVATE}/${id}/patients/${this.authService.patient.id}`;

    return this.httpClient.put<ServerResponse>(url, clinicalHistory)
      .pipe(
        map(response => {
          this.messageService.success(response);
          return response.data;
        })
      );
  }

  destroy(id: number): Observable<boolean> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response.data)
      );
  }

  destroys(ids: (number | undefined)[]): Observable<boolean> {
    const url = `${this.API_URL_PRIVATE}/destroys`;

    return this.httpClient.patch<ServerResponse>(url, {ids})
      .pipe(
        map(response => response.data)
      );
  }

  getByPatient(): Observable<ClinicalHistoryModel[]> {
    const url = `${this.API_URL_PRIVATE}/patients/${this.authService.patient.id}`;

    // this.appService.presentLoading();
    return this.httpClient.get<ServerResponsePaginator>(url)
      .pipe(
        map(response => {
          this.clinicalHistories.next(response.data);
          this.paginator.next(response.meta);
          return response.data;
        }),
        // tap(() => this.appService.dismissLoading())
      );
  }

  set optionFieldData(value: string) {
    this.optionField.next(value);
  }
}
