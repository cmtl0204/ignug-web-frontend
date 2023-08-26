import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubjectRequirementComponent} from "./subject-requirement/subject-requirement.component";

const routes: Routes = [
  {
    path: 'dashboards',
    loadChildren: () => import('./dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule)
  },
  {
    path: 'careers',
    loadChildren: () => import('./career/career.module').then(m => m.CareerModule)
  },
  {
    path: 'curriculums',
    loadChildren: () => import('./curriculum/curriculum.module').then(m => m.CurriculumModule)
  },
  {
    path: 'enrollments',
    loadChildren: () => import('./enrollment/enrollment.module').then(m => m.EnrollmentModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./event/event.module').then(m => m.EventModule)
  },
  {
    path: 'institutions',
    loadChildren: () => import('./institution/institution.module').then(m => m.InstitutionModule)
  },
  {
    path: 'school-periods',
    loadChildren: () => import('./school-period/school-period.module').then(m => m.SchoolPeriodModule)
  },
  {
    path: 'students',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
  },
  {
    path: 'subjects',
    loadChildren: () => import('./subject/subject.module').then(m => m.SubjectModule)
  },
  {
    path: 'teachers',
    loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule)
  },
  {
    path: 'teacher-distributions',
    loadChildren: () => import('./teacher-distribution/teacher-distribution.module').then(m => m.TeacherDistributionModule)
  },
  {
    path: 'subject-requirements',
    component: SubjectRequirementComponent
  },
  {
    path: 'subject-grade',
    loadChildren: () => import('./subject-grade/subject-grade.module').then(m => m.SubjectGradeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
