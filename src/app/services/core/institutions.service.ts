import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CreateInstitutionDto, UpdateInstitutionDto, InstitutionModel, SelectInstitutionDto} from '@models/core';
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
