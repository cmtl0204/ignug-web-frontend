import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse, ServerResponsePaginator} from '@models/http-response';
import {PaginatorModel} from '@models/core';
import {ClinicalHistoryModel, TreatmentModel, TreatmentOptionModel} from '@models/app';
import {CoreService} from "@services/core";
import {AuthService} from '@services/auth';
import {MessageService} from '@services/core';
import {ProductModel} from "@models/app/product.model";
import {TreatmentDetailModel} from "@models/app/treatment-detail.model";

@Injectable({
  providedIn: 'root'
})

export class TreatmentHttpService {
  private API_URL_PRIVATE: string = `${environment.API_URL_PRIVATE}/treatments`;
  private API_URL_PUBLIC: string = `${environment.API_URL_PUBLIC}/treatments`;

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

  store(treatment: TreatmentModel, patientId: number): Observable<TreatmentModel> {
    const url = `${this.API_URL_PRIVATE}/patients/${patientId}`;

    return this.httpClient.post<ServerResponse>(url, treatment)
      .pipe(
        map(response => {
          this.messageService.success(response);
          return response.data;
        })
      );
  }

  storeTreatmentDetail(treatmentDetail: TreatmentDetailModel, treatmentId: number): Observable<TreatmentModel> {
    const url = `${this.API_URL_PRIVATE}/${treatmentId}/treatment-details`;

    return this.httpClient.post<ServerResponse>(url, treatmentDetail)
      .pipe(
        map(response => {
          this.messageService.success(response);
          return response.data;
        })
      );
  }

  storeTreatmentOption(treatmentOption: TreatmentOptionModel, treatmentDetailId: number): Observable<TreatmentModel> {
    const url = `${environment.API_URL_PRIVATE}/treatment-details/${treatmentDetailId}/treatment-options`;

    return this.httpClient.post<ServerResponse>(url, treatmentOption)
      .pipe(
        map(response => {
          // this.messageService.success(response);
          return response.data;
        })
      );
  }

  update(id: number, treatment: TreatmentModel): Observable<TreatmentModel> {
    const url = `${this.API_URL_PRIVATE}/${id}`;

    return this.httpClient.put<ServerResponse>(url, treatment)
      .pipe(
        map(response => {
          this.messageService.success(response);
          return response.data;
        })
      );
  }

  updateTreatmentDetail(id: number, treatmentDetail: TreatmentDetailModel): Observable<TreatmentModel> {
    const url = `${this.API_URL_PRIVATE}/treatment-details/${id}`;

    return this.httpClient.put<ServerResponse>(url, treatmentDetail)
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

  destroyTreatmentDetail(id: number): Observable<boolean> {
    const url = `${this.API_URL_PRIVATE}/treatment-details/${id}`;

    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => {
          this.messageService.success(response);
          return response.data;
        })
      );
  }

  destroys(ids: (number | undefined)[]): Observable<boolean> {
    const url = `${this.API_URL_PRIVATE}/destroys`;

    return this.httpClient.patch<ServerResponse>(url, {ids})
      .pipe(
        map(response => response.data)
      );
  }

  getLastByPatient(patientId: number): Observable<TreatmentModel> {
    const url = `${this.API_URL_PRIVATE}/patients/${patientId}/last`;

    // this.appService.presentLoading();
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response.data),
        // tap(() => this.appService.dismissLoading())
      );
  }

  getTreatmentDetails(treatmentId: number): Observable<TreatmentDetailModel[]> {
    const url = `${this.API_URL_PRIVATE}/${treatmentId}/treatment-details`;

    // this.appService.presentLoading();
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response.data),
        // tap(() => this.appService.dismissLoading())
      );
  }

  getProducts(): Observable<ProductModel[]> {
    const url = `${this.API_URL_PRIVATE}/products`;

    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response.data)
      );
  }
}
