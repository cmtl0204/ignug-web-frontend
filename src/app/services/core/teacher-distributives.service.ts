import {Injectable} from '@angular/core';
import { SelectTeacherDistributiveDto } from '@models/core';


@Injectable({
  providedIn: 'root'
})
export class TeacherDistributivesService {

  constructor() {

  }

  get teacherDistributive(): SelectTeacherDistributiveDto {
    return JSON.parse(String(sessionStorage.getItem('teacher-distributive'))) as SelectTeacherDistributiveDto;
  }

  set teacherDistributive(value: SelectTeacherDistributiveDto) {
    sessionStorage.setItem('teacher-distributive', JSON.stringify(value));
  }
}
