import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExitGuard} from "@shared/guards";
import {StudentListComponent} from './student-list/student-list.component';
import {StudentFormComponent} from './student-form/student-form.component';
import {EnrollmentApplicationComponent} from "../enrollment-application/enrollment-application.component";

const routes: Routes = [
  {
    path: '',
    component: StudentListComponent
  },
  {
    path: ':id',
    component: StudentFormComponent,
    canDeactivate: [ExitGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
