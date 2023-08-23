import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {ServiceUnavailableComponent} from './service-unavailable/service-unavailable.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {InternalServerErrorComponent} from './internal-server-error/internal-server-error.component'

import {ExitGuard, RoleGuard} from '@shared/guards';

const routes: Routes = [
  {
    path: 'forbidden', component: ForbiddenComponent
  },
  {
    path: 'not-found', component: NotFoundComponent,
  },
  {
    path: 'service-unavailable', component: ServiceUnavailableComponent
  },
  {
    path: 'unauthorized', component: UnauthorizedComponent
  },
  {
    path: 'internal-server-error', component: InternalServerErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonRoutingModule {
}
