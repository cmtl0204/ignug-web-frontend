import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExitGuard} from "@shared/guards";
import { EnrollmentRequestComponent } from './enrollment-request.component';


const routes: Routes = [
  {
    path: '',
    component: EnrollmentRequestComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRequestRoutingModule {
}