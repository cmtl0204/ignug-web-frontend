import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeacherSubjectRoutingModule} from './teacher-subject-routing.module';
import {TeacherSubjectListComponent} from './teacher-subject-list/teacher-subject-list.component';


@NgModule({
  declarations: [
    TeacherSubjectListComponent
  ],
  imports: [
    CommonModule,
    TeacherSubjectRoutingModule
  ]
})
export class TeacherSubjectModule {
}
