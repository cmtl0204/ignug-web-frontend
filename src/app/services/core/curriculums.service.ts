import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CreateCurriculumDto, UpdateCurriculumDto, CurriculumModel, SelectCurriculumDto} from '@models/core';
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
