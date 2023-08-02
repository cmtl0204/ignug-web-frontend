import {Injectable} from '@angular/core';
import {SelectInstitutionDto} from '@models/core';

@Injectable({
  providedIn: 'root'
})
export class InstitutionsService {

  constructor() {

  }

  get institution(): SelectInstitutionDto {
    return JSON.parse(String(sessionStorage.getItem('institution'))) as SelectInstitutionDto;
  }

  set institution(value: SelectInstitutionDto) {
    sessionStorage.setItem('institution', JSON.stringify(value));
  }
}
