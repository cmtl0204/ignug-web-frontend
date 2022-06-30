import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {UserModel} from '@models/auth';
import {PaginatorModel} from '@models/core';
import {ServerResponse, ServerResponsePaginator} from '@models/http-response';
import {CoreService} from "@services/core/core.service";

@Injectable({
  providedIn: 'root'
})

export class UserAdministrationHttpService {
  private API_URL_PRIVATE: string = environment.API_URL_PRIVATE;

  private usersList: ServerResponse = {};
  private users = new BehaviorSubject<ServerResponse>({});
  public users$ = this.users.asObservable();

  private userModel: UserModel = {};
  private user = new BehaviorSubject<UserModel>({});
  public user$ = this.user.asObservable();

  constructor(private httpClient: HttpClient,private coreService:CoreService) {

  }

  getUsers(page: number = 1, search: string = ''): Observable<UserModel[]> {
    const url = `${this.API_URL_PRIVATE}/users`;

    const params = new HttpParams()
      .set('sort', 'lastname') //optional
      .append('page', page) // conditional
      .append('search', search); // conditional

    this.coreService.showLoad();
    return this.httpClient.get<ServerResponsePaginator>(url, {params})
      .pipe(
        map(response => {
          this.coreService.hideLoad();
          this.coreService.paginate(response.meta);
          return response.data;
        })
      );
  }

  getUser(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/users/${id}`;

    this.coreService.showLoad();
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => {
          this.coreService.hideLoad();
          return response.data;
        })
      );
  }

  storeUser(user: UserModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/users`;

    this.coreService.showLoad();
    return this.httpClient.post<ServerResponse>(url, user)
      .pipe(
        map(response => {
          this.coreService.hideLoad();
          return response.data;
        })
      );
  }

  updateUser(id: number, user: UserModel): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/users/${id}`;

    this.coreService.showLoad();
    return this.httpClient.put<ServerResponse>(url, user)
      .pipe(
        map(response => {
          this.coreService.hideLoad();
          return response.data;
        })
      );
  }

  deleteUser(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/users/${id}`;

    this.coreService.showLoad();
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => {
          this.coreService.hideLoad();
          return response.data;
        })
      );
  }

  deleteUsers(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/user/destroys`;

    this.coreService.showLoad();
    return this.httpClient.patch<ServerResponse>(url, {ids})
      .pipe(
        map(response => {
          this.coreService.hideLoad();
          return response.data;
        })
      );
  }

  suspendUser(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/users/${id}/suspend`;

    this.coreService.showLoad();
    return this.httpClient.patch<ServerResponse>(url, null)
      .pipe(
        map(response => {
          this.coreService.hideLoad();
          return response.data;
        })
      );
  }

  reactiveUser(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL_PRIVATE}/users/${id}/reactive`;

    this.coreService.showLoad();
    return this.httpClient.patch<ServerResponse>(url, null)
      .pipe(
        map(response => {
          this.coreService.hideLoad();
          return response.data;
        })
      );
  }

  selectUser(user: UserModel) {
    this.user.next(user);
  }
}
