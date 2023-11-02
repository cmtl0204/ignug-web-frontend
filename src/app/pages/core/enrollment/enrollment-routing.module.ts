import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExitGuard} from "@shared/guards";
import {EnrollmentListComponent} from "./enrollment-list/enrollment-list.component";
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component';
import { EnrollmentDetailListComponent } from './enrollment-detail/enrollment-detail-list/enrollment-detail-list.component';

const routes: Routes = [
  {
    path: '',
    component: EnrollmentListComponent,
  },
  {
    path: ':id',
    component: EnrollmentFormComponent,
    canDeactivate: [ExitGuard]
  },
  {
    path: ':id/enrollment-details',
    component: EnrollmentDetailListComponent,
  },
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule {
}
