import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EnrollmentDetailFormComponent} from "./enrollment-detail-form/enrollment-detail-form.component";
import {EnrollmentDetailListComponent} from "./enrollment-detail-list/enrollment-detail-list.component";

const routes: Routes = [
  {
    path: ':id',
    component: EnrollmentDetailFormComponent,
  },
  {
    path: '',
    component: EnrollmentDetailListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentDetailRoutingModule {
}
