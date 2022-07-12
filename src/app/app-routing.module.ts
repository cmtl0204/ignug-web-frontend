import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlankComponent, MainComponent} from '@layout/index';
import {RolesEnum} from '@shared/enums';
import { RoleGuard, TokenGuard} from '@shared/guards';
import {CommonRoutesEnum, UserAdministrationRoutesEnum} from '@shared/enums/routes.enum';
import {UserComponent} from './pages/auth/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {
        path: 'core',
        loadChildren: () => import('./pages/core/core.module').then(m => m.CoreModule),
      },
      {
        path: 'administration',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
      },
    ]
  },
  {
    path: 'auth',
    component: BlankComponent,
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'common',
    component: BlankComponent,
    loadChildren: () => import('./pages/common/common.module').then(m => m.CommonModule),
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
