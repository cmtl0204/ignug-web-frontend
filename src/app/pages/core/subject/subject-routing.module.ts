import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExitGuard} from "@shared/guards";
import {SubjectListComponent} from "./subject-list/subject-list.component";
import {SubjectFormComponent} from "./subject-form/subject-form.component";

const routes: Routes = [
  {
    path: '',
    component: SubjectListComponent
  },
  {
    path: ':id',
    component: SubjectFormComponent,
    canDeactivate: [ExitGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule {
}
