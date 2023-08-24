import {Injectable} from '@angular/core';
import { SelectSubjectDto } from '@models/core';


@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor() {

  }

  get subject(): SelectSubjectDto {
    return JSON.parse(String(sessionStorage.getItem('subject'))) as SelectSubjectDto;
  }

  set Subject(value: SelectSubjectDto) {
    sessionStorage.setItem('subject', JSON.stringify(value));
  }
}
