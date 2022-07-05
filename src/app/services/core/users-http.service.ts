import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersHttpService {
  HOST = `${environment.HOST}/users`;

  constructor(private httpClient: HttpClient) {
  }

  create(payload: any): Observable<any> {
    const url = `${this.HOST}`;
    return this.httpClient.post(url, payload);
  }

  findAll(): Observable<any> {
    return this.httpClient.get(this.HOST);
  }

  findOne(id: number): Observable<any> {
    const url = `${this.HOST}/${id}`;
    return this.httpClient.get(url);
  }

  update(id: number, payload: any): Observable<any> {
    const url = `${this.HOST}/${id}`;
    return this.httpClient.put(url, payload);
  }

  remove(id: number): Observable<any> {
    const url = `${this.HOST}/${id}`;
    return this.httpClient.delete(url);
  }
}
