import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CreateCareerDto, UpdateCareerDto, CareerModel, SelectCareerDto} from '@models/core';
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageService} from '@services/core';

@Injectable({
  providedIn: 'root'
})
export class CareersService {

  constructor(private coreService: CoreService, private httpClient: HttpClient, private messageService: MessageService) {

  }

  get selectedCareer(): SelectCareerDto | {} {
    return sessionStorage.getItem('career') as SelectCareerDto;
  }

  set selectedCareer(value: SelectCareerDto) {
    sessionStorage.setItem('career', JSON.stringify(value));
  }
}
