import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeacherDistributionListComponent} from "./teacher-distribution-list/teacher-distribution-list.component";
import {GradeListComponent} from "./grade-list/grade-list.component";

const routes: Routes = [
  {
    path: '',
    component: TeacherDistributionListComponent
  },
  {
    path: 'grades',
    component: GradeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherDistributionRoutingModule {
}
