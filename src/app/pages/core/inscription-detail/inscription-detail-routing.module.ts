import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  EnrollmentDetailListComponent
} from "../enrollment-detail/enrollment-detail-list/enrollment-detail-list.component";
import {
  EnrollmentDetailFormComponent
} from "../enrollment-detail/enrollment-detail-form/enrollment-detail-form.component";
import {ExitGuard} from "@shared/guards";
import {InscriptionDetailListComponent} from "./inscription-detail-list/inscription-detail-list.component";

const routes: Routes = [
  {
    path: 'inscriptions/:id',
    component: InscriptionDetailListComponent,
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
export class InscriptionDetailRoutingModule { }
