import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExitGuard} from "@shared/guards";
import {InscriptionListComponent} from "./inscription-list/inscription-list.component";
import {InscriptionFormComponent} from "./inscription-form/inscription-form.component";

const routes: Routes = [
  {
    path: '',
    component: InscriptionListComponent,
  },
  {
    path: ':id',
    component: InscriptionFormComponent,
    canDeactivate: [ExitGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionRoutingModule {
}
