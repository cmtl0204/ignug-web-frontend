import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentValidationRoutingModule } from './document-validation-routing.module';
import { DocumentValidationComponent } from './document-validation.component';
import { EnrollmentCertificateComponent } from './enrollment-certificate/enrollment-certificate.component';
import {PanelModule} from "primeng/panel";


@NgModule({
  declarations: [
    DocumentValidationComponent,
    EnrollmentCertificateComponent
  ],
    imports: [
        CommonModule,
        DocumentValidationRoutingModule,
        PanelModule
    ]
})
export class DocumentValidationModule { }
