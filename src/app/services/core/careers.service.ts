import {Injectable} from '@angular/core';
import {SelectCareerDto} from '@models/core';

@Injectable({
  providedIn: 'root'
})
export class CareersService {

  constructor() {

  }

  get career(): SelectCareerDto {
    return JSON.parse(String(sessionStorage.getItem('career'))) as SelectCareerDto;
  }

  set career(value: SelectCareerDto) {
    sessionStorage.setItem('career', JSON.stringify(value));
  }
}
