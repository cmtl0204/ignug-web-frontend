import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExitGuard} from "@shared/guards";
import {SubjectGradeListComponent } from "./subject-list/subject-grade-list.component";

const routes: Routes = [
  {
    path: '',
    component: SubjectGradeListComponent ,
    // canDeactivate: [ExitGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectGradeListRoutingModule {
}
