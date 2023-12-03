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

  get administration(): string {
    return '/administration';
  }

  get core(): string {
    return '/core';
  }

  get users(): string {
    return this.administration + '/users';
  }

  get careers(): string {
    return this.core + '/careers';
  }

  get curriculums(): string {
    return this.core + '/curriculums';
  }

  get enrollments(): string {
    return this.core + '/enrollments';
  }

  enrollmentsDetailList(enrollmentId: string): string {
    return this.core + `/enrollments/${enrollmentId}/enrollment-details/`;
  }

  enrollmentsDetailForm(enrollmentId: string): string {
    return this.core + `/enrollments/${enrollmentId}/enrollment-details/`;
  }

  get inscriptions(): string {
    return this.core + '/inscriptions';
  }

  inscriptionsDetailList(enrollmentId: string): string {
    return this.core + `/inscriptions/${enrollmentId}/inscription-details`;
  }

  inscriptionsDetailForm(enrollmentId: string): string {
    return this.core + `/inscriptions/${enrollmentId}/inscription-details`;
  }

  get events(): string {
    return this.core + '/events';
  }

  get institutions(): string {
    return this.core + '/institutions';
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

  get parallelCapacity(): string {
    return this.core + '/careers/parallel-capacity';
  }

  get teachers(): string {
    return this.core + '/teachers';
  }

  get teacherDistributions(): string {
    return this.core + '/teacher-distributions';
  }

  get common(): string {
    return '/common';
  }

  get appRoutes(): string {
    return '';
  }

  login() {
    this.router.navigateByUrl(`/login`);
  }

  institutionSelect() {
    this.router.navigateByUrl(`/auth/authentication/institution-select`);
  }

  roleSelect() {
    this.router.navigateByUrl(`/auth/authentication/role-select`);
  }

  profile() {
    this.router.navigateByUrl(`/profile`);
  }

  dashboardAdmin() {
    this.router.navigateByUrl(`/core/dashboards/admin`);
  }

  dashboardRector() {
    this.router.navigateByUrl(`/core/dashboards/rector`);
  }

  dashboardTeacher() {
    this.router.navigateByUrl(`/core/dashboards/teacher`);
  }

  dashboardStudent() {
    this.router.navigateByUrl(`/core/enrollment-application`);
  }

  dashboardCoordinatorAdministrative() {
    this.router.navigateByUrl(`/core/dashboards/coordinator-administrative`);
  }

  dashboardCoordinatorCareer() {
    this.router.navigateByUrl(`/core/dashboards/coordinator-career`);
  }

  dashboardReviewer() {
    this.router.navigateByUrl(`/core/inscriptions`);
  }

  dashboardSecretary() {
    this.router.navigateByUrl(`/core/enrollments`);
  }

  dashboardWelfare() {
    this.router.navigateByUrl(`/core/welfare/enrollments`);
  }

  passwordReset() {
    this.router.navigateByUrl(`/password-reset`);
  }
}
