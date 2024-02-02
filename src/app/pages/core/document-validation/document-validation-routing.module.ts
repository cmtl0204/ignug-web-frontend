import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EnrollmentCertificateComponent} from "./enrollment-certificate/enrollment-certificate.component";

const routes: Routes = [
  {
    path: 'enrollment-certificate/:enrollmentId',
    component: EnrollmentCertificateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentValidationRoutingModule {
}
