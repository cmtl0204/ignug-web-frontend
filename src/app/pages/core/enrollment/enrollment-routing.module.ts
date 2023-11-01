import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExitGuard} from "@shared/guards";
import {EnrollmentListComponent} from "./enrollment-list/enrollment-list.component";
import {EnrollmentSubjectListComponent} from "./enrollment-subject-list/enrollment-subject-list.component";
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component';

const routes: Routes = [
  {
    path: '',
    component: EnrollmentListComponent,
    // canDeactivate: [ExitGuard]
  },
  {
    path: ':id',
    component: EnrollmentFormComponent,
    canDeactivate: [ExitGuard]
  },
  {
    path: ':id/subjects',
    component: EnrollmentSubjectListComponent,
    canDeactivate: [ExitGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule {
}
