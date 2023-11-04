import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CreateStudentDto, StudentModel, UpdateStudentDto} from '@models/core';
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageService} from '@services/core';

@Injectable({
  providedIn: 'root'
})
export class StudentsHttpService {
  API_URL = `${environment.API_URL}/students`;

  constructor(
    private coreService: CoreService,
    private httpClient: HttpClient,
    private messageService: MessageService,
  ) {
  }

  create(payload: CreateStudentDto): Observable<StudentModel> {
    const url = `${this.API_URL}`;

    this.coreService.isProcessing = true;
    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map((response) => {
        this.coreService.isProcessing = false;
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

  findOne(id: string): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  update(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}`;

    this.coreService.isProcessing = true;
    return this.httpClient.put<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updatePersonalInformation(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}/personal-information`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateOriginPlace(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    console.log(payload);

    const url = `${this.API_URL}/${id}/origin-place`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateResidencePlace(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    console.log(payload);

    const url = `${this.API_URL}/${id}/residence-place`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateCroquis(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    console.log(payload);

    const url = `${this.API_URL}/${id}/croquis`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateFamilyEconomic(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    console.log(payload);

    const url = `${this.API_URL}/${id}/family-economic`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateFamilyGroup(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    console.log(payload);

    const url = `${this.API_URL}/${id}/family-group`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateFamilyHealth(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    console.log(payload);

    const url = `${this.API_URL}/${id}/family-health`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateMigrationCountry(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    console.log(payload);

    const url = `${this.API_URL}/${id}/migration-country`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateAcademicData(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    console.log(payload);

    const url = `${this.API_URL}/${id}/academic-data`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateAdittionalEconomicData(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    console.log(payload);

    const url = `${this.API_URL}/${id}/other-academic-data`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateHousingData(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    console.log(payload);

    const url = `${this.API_URL}/${id}/housing-data`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updatePsychosocialSection(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    console.log(payload);

    const url = `${this.API_URL}/${id}/psychosocial-section`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  reactivate(id: string): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}/reactivate`;

    return this.httpClient.put<ServerResponse>(url, null).pipe(
      map((response) => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  remove(id: string): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.delete<ServerResponse>(url).pipe(
      map((response) => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  removeAll(users: StudentModel[]): Observable<StudentModel[]> {
    const url = `${this.API_URL}/remove-all`;

    return this.httpClient.patch<ServerResponse>(url, users).pipe(
      map((response) => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  hide(id: string): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}/hide`;

    return this.httpClient.patch<ServerResponse>(url, null).pipe(
      map((response) => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }
}
