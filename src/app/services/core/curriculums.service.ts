import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CreateCurriculumDto, UpdateCurriculumDto, CurriculumModel, SelectCurriculumDto} from '@models/core';
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageService} from '@services/core';

@Injectable({
  providedIn: 'root'
})
export class CurriculumsService {

  constructor(private coreService: CoreService, private httpClient: HttpClient, private messageService: MessageService) {

  }

  get selectedCurriculum(): SelectCurriculumDto | {} {
    return sessionStorage.getItem('curriculum') as SelectCurriculumDto;
  }

  set selectedCurriculum(value: SelectCurriculumDto) {
    sessionStorage.setItem('curriculum', JSON.stringify(value));
  }
}
