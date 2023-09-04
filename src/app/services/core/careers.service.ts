import {Injectable} from '@angular/core';
import {SelectCareerDto} from '@models/core';

@Injectable({
  providedIn: 'root'
})
export class CareersService {

  constructor() {

  }

  get career(): SelectCareerDto {
    return JSON.parse(String(sessionStorage.getItem('career')));
  }

  set career(value: SelectCareerDto) {
    sessionStorage.setItem('career', JSON.stringify(value));
  }

  get careers(): SelectCareerDto[] {
    return JSON.parse(String(sessionStorage.getItem('careers')));
  }

  set careers(value: SelectCareerDto[]) {
    sessionStorage.setItem('careers', JSON.stringify(value));
  }
}
