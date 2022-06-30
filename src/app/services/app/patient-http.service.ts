import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ClinicalHistoryModel, PatientModel, ResultModel} from '@models/app';
import {PaginatorModel} from '@models/core';
import {ServerResponse, ServerResponsePaginator} from '@models/http-response';
import {AuthService} from '@services/auth';
import {CoreService, MessageService} from '@services/core';

@Injectable({
  providedIn: 'root'
})

export class PatientHttpService {
  private API_URL_PRIVATE = `${environment.API_URL_PRIVATE}/patients`;
  private API_URL_PUBLIC = `${environment.API_URL_PUBLIC}/patients`;

  private resultsLastClinicalHistory = new BehaviorSubject<ResultModel>({});
  patient: PatientModel = {};

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private coreService: CoreService,
              private messageService: MessageService,
              private router: Router) {
  }

  index(page: number = 1, search: string = ''): Observable<PatientModel[]> {
    const url = `${this.API_URL_PRIVATE}`;

    const params = new HttpParams()
      .append('page', page)
      .append('search', search);


    return this.httpClient.get<ServerResponsePaginator>(url, {params})
      .pipe(
        map(response => {
          this.coreService.paginate(response.meta);
          return response.data;
        }),
      );
  }

  show(id:number): Observable<PatientModel> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response.data)
      );
  }

  showProfile(): Observable<PatientModel> {
    const url = `${this.API_URL_PRIVATE}/${this.authService.patient.id}/profile`;

    // this.appService.presentLoading();
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response.data),
        // tap(() => this.appService.dismissLoading())
      );
  }

  update(patient: PatientModel): Observable<PatientModel> {
    const url = `${this.API_URL_PRIVATE}/${this.authService.patient.id}/users`;

    // this.appService.presentLoading();
    return this.httpClient.put<ServerResponse>(url, patient)
      .pipe(
        map(response => response.data),
        // tap(() => this.appService.dismissLoading())
      );
  }

  showLastByPatient(): Observable<ClinicalHistoryModel> {
    const url = `${this.API_URL_PRIVATE}/${this.authService?.patient?.id}/clinical-histories/last`;

    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response.data),
      );
  }

  showLastClinicalHistory(): Observable<ClinicalHistoryModel> {
    const url = `${this.API_URL_PRIVATE}/${this.authService?.patient?.id}/clinical-histories/last`;
    // this.appService.presentLoading();
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response.data),
        // tap(() => this.appService.dismissLoading())
      );
  }

  showResultsLastClinicalHistory(): Observable<ResultModel> {
    const url = `${this.API_URL_PRIVATE}/${this.authService?.patient?.id}/clinical-histories/results`;

    // this.appService.presentLoading();
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => {
          this.resultsLastClinicalHistory.next(response.data);
          return response.data;
        }),
        // tap(() => this.appService.dismissLoading())
      );
  }

  storeClinicalHistory(clinicalHistory: ClinicalHistoryModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/${this.authService?.patient?.id}/clinical-histories`;

    // this.appService.presentLoading();
    return this.httpClient.post<ServerResponse>(url, clinicalHistory)
      .pipe(
        map(response => {
          this.messageService.success(response);
          return response.data;
        }),
        tap(() => {
          // this.appService.dismissLoading();
          this.router.navigateByUrl('/app/tabs/medical-data');
        })
      );
  }

  updateClinicalHistory(id: number, clinicalHistory: ClinicalHistoryModel): Observable<ClinicalHistoryModel> {
    const url = `${this.API_URL_PRIVATE}/${this.authService.patient.id}/clinical-histories/${id}`;

    // this.appService.presentLoading();
    return this.httpClient.put<ServerResponse>(url, clinicalHistory)
      .pipe(
        map(response => {
          this.messageService.success(response);
          return response.data;
        }),
        // tap(() => this.appService.dismissLoading())
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
}
