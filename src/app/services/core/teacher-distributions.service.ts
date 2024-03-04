import {Injectable} from '@angular/core';
import {SelectTeacherDistributionDto, TeacherDistributionModel} from '@models/core';


@Injectable({
  providedIn: 'root'
})
export class TeacherDistributionsService {

  constructor() {

  }

  get teacherDistribution(): TeacherDistributionModel {
    return JSON.parse(String(sessionStorage.getItem('teacherDistribution'))) as TeacherDistributionModel;
  }

  set teacherDistribution(value: TeacherDistributionModel) {
    sessionStorage.setItem('teacherDistribution', JSON.stringify(value));
  }
}
