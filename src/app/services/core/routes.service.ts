import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

export enum AppRoutesEnum {
  CORE = '/core',
  AUTH = '/auth',
  COMMON = '/common',
}

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private router: Router) {
  }

  get core(): string {
    return '/core';
  }

  get careers(): string {
    return this.core + '/careers';
  }

  get curriculums(): string {
    return this.core + '/curriculums';
  }
  get events(): string {
    return this.core + '/events';
  }
  get institutions(): string {
    return this.core + '/curriculums';
  }
  get schoolPeriods(): string {
    return this.core + '/school-periods';
  }
  get students(): string {
    return this.core + '/students';
  }
  get subjects(): string {
    return this.core + '/subjects';
  }
  get teachers(): string {
    return this.core + '/teachers';
  }

  get common(): string {
    return '/common';
  }

  get appRoutes(): string {
    return '';
  }

  login() {
    this.router.navigateByUrl(`${AppRoutesEnum.AUTH}/login`);
  }

  profile() {
    this.router.navigateByUrl(`${AppRoutesEnum.AUTH}/profile`);
  }

  dashboard() {
    this.router.navigateByUrl(`/`);
  }
}
