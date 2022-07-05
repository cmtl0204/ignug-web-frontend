import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {delay, Observable} from 'rxjs';
import {CreateUserDto, UpdateUserDto, UserModel} from '@models/auth';
import {map} from 'rxjs/operators';
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageService} from '@services/core';

@Injectable({
  providedIn: 'root'
})
export class UsersHttpService {
  HOST = `${environment.HOST}/users`;

  constructor(private httpClient: HttpClient,
              private coreService: CoreService,
              private messageService: MessageService) {
  }

  create(payload: CreateUserDto): Observable<UserModel> {
    const url = `${this.HOST}`;
    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map(response => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  findAll(): Observable<UserModel[]> {
    return this.httpClient.get<ServerResponse>(this.HOST).pipe(
      map(response => response.data)
    );
  }

  findOne(id: number): Observable<UserModel> {
    const url = `${this.HOST}/${id}`;
    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => response.data)
    );
  }

  update(id: number, payload: UpdateUserDto): Observable<UserModel> {
    const url = `${this.HOST}/${id}`;
    return this.httpClient.put<ServerResponse>(url, payload).pipe(
      map(response => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  remove(id: number): Observable<boolean> {
    const url = `${this.HOST}/${id}`;
    return this.httpClient.delete<ServerResponse>(url).pipe(
      map(response => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  removeAll(id: number[]): Observable<boolean> {
    const url = `${this.HOST}/${id}`;
    return this.httpClient.delete<ServerResponse>(url).pipe(
      map(response => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }
}
