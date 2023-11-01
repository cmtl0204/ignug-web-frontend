import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExitGuard} from "@shared/guards";
import { CommonModule } from '@angular/common';

import { EnrollmentDetailModule } from './enrollment-detail.module';
import { EnrollmentDetailListComponent } from './enrollment-detail-list/enrollment-detail-list.component';
import { EnrollmentDetailFormComponent } from './enrollment-detail-form/enrollment-detail-form.component';

const routes: Routes = [
  {
    path: '',
    component: EnrollmentDetailListComponent,
    // canDeactivate: [ExitGuard]
  },
  {
    path: ':id',
    component: EnrollmentDetailFormComponent,
    canDeactivate: [ExitGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentDetailRoutingModule { }
