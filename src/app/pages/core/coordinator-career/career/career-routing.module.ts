import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExitGuard} from "@shared/guards";
import {CareerFormComponent} from "./career-form/career-form.component";
import {CareerListComponent} from "./career-list/career-list.component";
import {ParallelCapacityComponent} from "./parallel-capacity/parallel-capacity.component";

const routes: Routes = [
  {
    path: '',
    component: CareerListComponent
  },
  {
    path: 'parallel-capacity',
    component: ParallelCapacityComponent,
    canDeactivate: [ExitGuard]
  },
  {
    path: ':id',
    component: CareerFormComponent,
    canDeactivate: [ExitGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerRoutingModule {
}
