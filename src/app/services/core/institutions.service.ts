import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CreateInstitutionDto, UpdateInstitutionDto, InstitutionModel, SelectInstitutionDto} from '@models/core';
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageService} from '@services/core';

@Injectable({
  providedIn: 'root'
})
export class InstitutionsService {

  constructor(private coreService: CoreService, private httpClient: HttpClient, private messageService: MessageService) {

  }

  get selectedInstitution(): SelectInstitutionDto | {} {
    return sessionStorage.getItem('institution') as SelectInstitutionDto;
  }

  set selectedInstitution(value: SelectInstitutionDto) {
    sessionStorage.setItem('career', JSON.stringify(value));
  }
}
