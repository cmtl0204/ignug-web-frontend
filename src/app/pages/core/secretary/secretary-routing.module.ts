import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecretaryFormComponent } from './secretary-form/secretary-form.component';

const routes: Routes = [
  {
    path:'',
    component: SecretaryFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecretaryRoutingModule { }
