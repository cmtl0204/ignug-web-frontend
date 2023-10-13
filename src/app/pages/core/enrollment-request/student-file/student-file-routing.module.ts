import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExitGuard} from "@shared/guards";
import { StudentFileFormComponent } from './student-file-form/student-file-form.component';


const routes: Routes = [
  {
    path: '',
    component: StudentFileFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentFileRoutingModule {
}
