import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExitGuard} from "@shared/guards";
import {TeacherDistributiveListComponent} from "./teacher-distributive-list/teacher-distributive-list.component";
import {TeacherDistributiveFormComponent} from "./teacher-distributive-form/teacher-distributive-form.component";

const routes: Routes = [
  {
    path: '',
    component: TeacherDistributiveListComponent
  },
  {
    path: ':id',
    component: TeacherDistributiveFormComponent,
    canDeactivate: [ExitGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherDistributiveRoutingModule {
}
