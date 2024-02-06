import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherDistributionRoutingModule } from './teacher-distribution-routing.module';
import { TeacherDistributionListComponent } from './teacher-distribution-list/teacher-distribution-list.component';
import { GradeListComponent } from './grade-list/grade-list.component';


@NgModule({
  declarations: [
    TeacherDistributionListComponent,
    GradeListComponent
  ],
  imports: [
    CommonModule,
    TeacherDistributionRoutingModule
  ]
})
export class TeacherDistributionModule { }
