import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EnrollmentDetailFormComponent} from "./enrollment-detail-form/enrollment-detail-form.component";

const routes: Routes = [
  {
    path: ':id',
    component: EnrollmentDetailFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentDetailRoutingModule {
}
