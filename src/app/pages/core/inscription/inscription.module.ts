import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionRoutingModule } from './inscription-routing.module';
import { InscriptionComponent } from './inscription.component';
import { InscriptionListComponent } from './inscription-list/inscription-list.component';
import { InscriptionFormComponent } from './inscription-form/inscription-form.component';
import { InscriptionDetailListComponent } from './inscription-detail-list/inscription-detail-list.component';
import { InscriptionDetailFormComponent } from './inscription-detail-form/inscription-detail-form.component';


@NgModule({
  declarations: [
    InscriptionComponent,
    InscriptionListComponent,
    InscriptionFormComponent,
    InscriptionDetailListComponent,
    InscriptionDetailFormComponent
  ],
  imports: [
    CommonModule,
    InscriptionRoutingModule
  ]
})
export class InscriptionModule { }
