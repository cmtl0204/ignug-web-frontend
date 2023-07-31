import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule as NgCommonModule} from '@angular/common';
import {EnrollmentRoutingModule} from './enrollment-routing.module';
import {SharedModule} from "@shared/shared.module";

// PrimeNg Modules
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {MessageModule} from "primeng/message";
import {PaginatorModule} from "primeng/paginator";
import {PanelMenuModule} from "primeng/panelmenu";
import {PanelModule} from "primeng/panel";
import {RippleModule} from "primeng/ripple";
import {SidebarModule} from "primeng/sidebar";
import {SplitButtonModule} from "primeng/splitbutton";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToolbarModule} from "primeng/toolbar";

// Components
import {EnrollmentListComponent} from "./enrollment-list/enrollment-list.component";
import {InstitutionFormComponent} from './institution-form/institution-form.component';
import {EnrollmentSubjectListComponent} from "./enrollment-subject-list/enrollment-subject-list.component";

@NgModule({
  declarations: [
    EnrollmentListComponent,
    InstitutionFormComponent,
    EnrollmentSubjectListComponent
  ],
  imports: [
    NgCommonModule,
    EnrollmentRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    RippleModule,
    MessageModule,
    ToolbarModule,
    PaginatorModule,
    TableModule,
    TagModule,
    SplitButtonModule,
    InputTextModule,
    SidebarModule,
    PanelMenuModule,
    SharedModule,
    PanelModule,
    DividerModule,
    InputSwitchModule
  ]
})
export class EnrollmentModule {
}
