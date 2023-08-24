import {Injectable} from '@angular/core';
import { SelectSchoolPeriodDto } from '@models/core';


@Injectable({
  providedIn: 'root'
})
export class SchoolPeriodsService {

  constructor() {

  }

  get schoolPeriod(): SelectSchoolPeriodDto {
    return JSON.parse(String(sessionStorage.getItem('schoolPeriod'))) as SelectSchoolPeriodDto;
  }

  set schoolPeriod(value: SelectSchoolPeriodDto) {
    sessionStorage.setItem('schoolPeriod', JSON.stringify(value));
  }
}
