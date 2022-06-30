import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {CatalogueModel, FileModel, LocationModel, PaginatorModel} from '@models/core';
import {ServerResponse} from '@models/http-response';
import {MessageService} from "@services/core";

@Injectable({
  providedIn: 'root'
})

export class CoreHttpService {
  API_URL_PRIVATE: string = environment.API_URL_PRIVATE;
  API_URL_PUBLIC: string = environment.API_URL_PUBLIC;

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }

  getCatalogues(type: string | undefined): Observable<CatalogueModel[]> {
    const params = new HttpParams().append('type', String(type));
    const url = `${this.API_URL_PUBLIC}/core-catalogue/catalogue`;
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response.data)
      );
  }

  getInstitutions(): Observable<ServerResponse> {
    const url = `${this.API_URL_PUBLIC}/institution/catalogue`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response)
      );
  }

  getCareers(): Observable<ServerResponse> {
    const url = `${this.API_URL_PUBLIC}/career/catalogue`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response)
      );
  }

  getCareersByInstitution(institutionId: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PUBLIC}/institution/${institutionId}/careers`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response)
      );
  }

  getCatalogues2(type: string | undefined, paginator: PaginatorModel): Observable<ServerResponse> {
    const params = new HttpParams()
      .append('type', String(type))
      .append('page', paginator.currentPage!)
      .append('perPage', paginator.perPage!);
    const url = this.API_URL_PUBLIC + '/catalogue/all';
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response)
      );
  }

  getLocations(type: string | undefined): Observable<LocationModel[]> {
    const params = new HttpParams().set('type', String(type));
    const url = this.API_URL_PUBLIC + '/locations';
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response.data)
      );
  }

  uploadFiles(url: string, data: FormData, params = new HttpParams()): Observable<ServerResponse> {
    url = this.API_URL_PUBLIC + url;
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post<ServerResponse>(url, data, {params, headers})
      .pipe(
        map(response => response)
      );
  }

  downloadFile(file: FileModel) {
    this.getFile(file.id!).subscribe(response => {
      const binaryData = [] as BlobPart[];
      binaryData.push(response as BlobPart);
      const filePath = URL.createObjectURL(new Blob(binaryData, {type: 'pdf'}));
      const downloadLink = document.createElement('a');
      downloadLink.href = filePath;
      downloadLink.setAttribute('download', file.fullName!);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }, error => {
      this.messageService.error(error);
    });
  }

  getFiles(url: string, paginator: PaginatorModel, filter: string = ''): Observable<ServerResponse> {
    url = this.API_URL_PUBLIC + url;
    let params = new HttpParams()
      .set('page', paginator.currentPage!)
      .set('perPage', paginator.perPage!);
    // El filtro depende de los campos propios que sean cadenas de texto
    if (filter !== '') {
      params = params.append('name', filter).append('description', filter);
    }
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response)
      );
  }

  getFile(fileId: number, params = new HttpParams()) {
    const url = `${this.API_URL_PUBLIC}/file/${fileId}/download`;
    return this.httpClient.get(url, {params, responseType: 'blob' as 'json'});
  }

  updateFile(file: FileModel, params = new HttpParams()): Observable<ServerResponse> {
    const url = this.API_URL_PUBLIC + '/file/update/' + file.id;
    return this.httpClient.put<ServerResponse>(url, file, {params})
      .pipe(
        map(response => response)
      );
  }

  deleteFiles(ids: (number | undefined)[], params = new HttpParams()): Observable<ServerResponse> {
    const url = this.API_URL_PUBLIC + '/file/destroys';
    return this.httpClient.patch<ServerResponse>(url, {ids}, {params})
      .pipe(
        map(response => response)
      );
  }
}
