import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RolesEnum} from "@shared/enums";
import {RoleGuard} from "@shared/guards";

const routes: Routes = [
  {
    path: 'teacher-distributions',
    loadChildren: () => import('./teacher-distribution/teacher-distribution.module').then(m => m.TeacherDistributionModule),
    canActivate: [RoleGuard],
    data: {roles: [RolesEnum.TEACHER]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
