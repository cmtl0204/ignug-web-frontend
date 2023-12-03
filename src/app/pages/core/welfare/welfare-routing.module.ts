import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EnrollmentListComponent} from "./enrollment-list/enrollment-list.component";

const routes: Routes = [
  {path: 'enrollments', component: EnrollmentListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelfareRoutingModule {
}
