import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthRoutesEnum} from '@shared/enums/routes.enum';

const routes: Routes = [
  {
    path: AuthRoutesEnum.LOGIN,
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
