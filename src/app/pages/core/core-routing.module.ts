import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboards',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
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
    path: 'inscriptions',
    loadChildren: () => import('./inscription/inscription.module').then(m => m.InscriptionModule)
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
    path: 'teacher-subjects',
    loadChildren: () => import('./teacher-subject/teacher-subject.module').then(m => m.TeacherSubjectModule)
  },
  {
    path: 'subject-grade',
    loadChildren: () => import('./subject-grade/subject-grade.module').then(m => m.SubjectGradeModule)
  },
  {
    path: 'consolidated-notes',
    loadChildren: () => import('./consolidated-notes/consolidated-notes.module').then(m => m.ConsolidatedNotesModule)
  },
  {
    path: 'enrollment-application',
    loadChildren: () => import('./enrollment-application/enrollment-application.module').then(m => m.EnrollmentApplicationModule)
  },
  {
    path: 'welfare',
    loadChildren: () => import('./welfare/welfare.module').then(m => m.WelfareModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
