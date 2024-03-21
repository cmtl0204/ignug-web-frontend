import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  CreateCurriculumDto,
  UpdateCurriculumDto,
  CurriculumModel,
  SubjectModel,
  GradeModel,
  TeacherDistributionModel
} from '@models/core';
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageService} from "@services/core";
import {UserModel} from "@models/auth";
import {format} from "date-fns";

@Injectable({
  providedIn: 'root'
})
export class GradesHttpService {
  API_URL = `${environment.API_URL}/grades`;
  API_URL_IMPORTS = `${environment.API_URL}/imports/grades`;
  API_URL_REPORTS = `${environment.API_URL}/reports/grades`;

  constructor(private coreService: CoreService, private httpClient: HttpClient, private messageService: MessageService) {
  }

  create(payload: GradeModel): Observable<CurriculumModel> {
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

  findOne(id: string): Observable<CurriculumModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  findSubjectsByCurriculum(id: string): Observable<SubjectModel[]> {
    const url = `${this.API_URL}/${id}/subjects`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  findSubjectsAllByCurriculum(id: string): Observable<SubjectModel[]> {
    const url = `${this.API_URL}/${id}/subjects/all`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  update(id: string, payload: GradeModel): Observable<CurriculumModel> {
    const url = `${this.API_URL}/${id}`;

    this.coreService.isProcessing = true;
    return this.httpClient.put<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  reactivate(id: string): Observable<CurriculumModel> {
    const url = `${this.API_URL}/${id}/reactivate`;

    return this.httpClient.patch<ServerResponse>(url, null).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  remove(id: string): Observable<CurriculumModel> {
    const url = `${this.API_URL}/${id}`;

    this.coreService.isProcessing = true;
    return this.httpClient.delete<ServerResponse>(url).pipe(
      map((response) => {
        this.coreService.isProcessing = false;
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  removeAll(curriculums: CurriculumModel[]): Observable<CurriculumModel[]> {
    const url = `${this.API_URL}/remove-all`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, curriculums).pipe(
      map((response) => {
        this.coreService.isProcessing = false;
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  hide(id: string): Observable<CurriculumModel> {
    const url = `${this.API_URL}/${id}/hide`;

    return this.httpClient.patch<ServerResponse>(url, null).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  uploadGrades(payload: FormData): Observable<UserModel> {
    const url = `${this.API_URL_IMPORTS}`;

    this.coreService.isProcessing = true;
    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map((response) => {
        this.coreService.isProcessing = false;
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  downloadGradesByTeacherDistribution(teacherDistribution: TeacherDistributionModel) {
    const url = `${this.API_URL_REPORTS}/teacher-distributions/${teacherDistribution.id}`;
    this.coreService.isProcessing = true;

    this.httpClient.get<BlobPart>(url, {responseType: 'blob' as 'json'})
      .subscribe(response => {
        const currentDate = new Date();
        const fileName = `calificaciones_${teacherDistribution.subject.code}_${format(new Date(), 'yyyy_MM_dd HH_mm_ss')}`;
        // const filePath = URL.createObjectURL(new Blob(binaryData, {type: file.extension}));
        const filePath = URL.createObjectURL(new Blob([response]));
        const downloadLink = document.createElement('a');
        downloadLink.href = filePath;
        downloadLink.setAttribute('download', `${fileName}.xlsx`);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        this.coreService.isProcessing = false;
      });
  }

  downloadErrorReport(teacherDistributionId: string) {
    const url = `${this.API_URL_REPORTS}/teacher-distributions/${teacherDistributionId}/error-report`;
    this.coreService.isProcessing = true;

    this.httpClient.get<BlobPart>(url, {responseType: 'blob' as 'json'})
      .subscribe(response => {
        // const filePath = URL.createObjectURL(new Blob(binaryData, {type: file.extension}));
        const filePath = URL.createObjectURL(new Blob([response]));
        const downloadLink = document.createElement('a');
        downloadLink.href = filePath;
        downloadLink.setAttribute('download', 'Errores.xlsx');
        document.body.appendChild(downloadLink);
        downloadLink.click();
        this.coreService.isProcessing = false;
      });
  }

  saveGradesByTeacher(enrollmentDetailId: string, payload: any): Observable<GradeModel[]> {
    const url = `${this.API_URL}/enrollment-details/${enrollmentDetailId}`;

    this.coreService.isProcessing = true;
    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map((response) => {
        this.coreService.isProcessing = false;
        this.messageService.success(response);
        return response.data;
      })
    );
  }
}
