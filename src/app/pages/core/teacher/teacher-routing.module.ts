import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExitGuard} from "@shared/guards";
import {TeacherListComponent} from "./teacher-list/teacher-list.component";
import {TeacherFormComponent} from "./teacher-form/teacher-form.component";

const routes: Routes = [
  {
    path: '',
    component: TeacherListComponent
  },
  {
    path: ':id',
    component: TeacherFormComponent,
    canDeactivate: [ExitGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
