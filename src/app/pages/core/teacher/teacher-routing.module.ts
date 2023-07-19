import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from "../../auth/user/user.component";
import {ProfileComponent} from "../../auth/user/profile/profile.component";
import {UserFormComponent} from "../../auth/user/user-form/user-form.component";
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
