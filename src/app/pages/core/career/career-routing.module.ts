import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from "../../auth/user/user.component";
import {ProfileComponent} from "../../auth/user/profile/profile.component";
import {UserFormComponent} from "../../auth/user/user-form/user-form.component";
import {ExitGuard} from "@shared/guards";
import {CareerListComponent} from "./career-list/career-list.component";
import {CareerFormComponent} from "./career-form/career-form.component";

const routes: Routes = [
  {
    path: '',
    component: CareerListComponent
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
