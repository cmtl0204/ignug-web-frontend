import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlankComponent, MainComponent} from '@layout/index';
import {RolesEnum} from '@shared/enums';
import {RoleGuard, TokenGuard} from '@shared/guards';
import {CommonRoutesEnum, UserAdministrationRoutesEnum} from '@shared/enums/routes.enum';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {
        path: UserAdministrationRoutesEnum.ROOT,
        loadChildren: () => import('./pages/user-administration/user-administration.module').then(m => m.UserAdministrationModule),
        data: {
          roles: [RolesEnum.ADMIN]
        },
        canActivate: [TokenGuard, RoleGuard]
      }
    ]
  },
  {
    path: 'auth',
    component:BlankComponent,
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'common',
    component: BlankComponent,
    loadChildren: () => import('./pages/common/common.module').then(m => m.CommonModule)
  },
  {
    path: '**',
    redirectTo: CommonRoutesEnum.NOT_FOUND
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
