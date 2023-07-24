import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'careers',
    loadChildren: () => import('./career/career.module').then(m => m.CareerModule)
  },
  {
    path: 'curriculums',
    loadChildren: () => import('./curriculum/curriculum.module').then(m => m.CurriculumModule)
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
