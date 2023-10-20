import { NgModule } from '@angular/core';
import {CommonModule as NgCommonModule} from '@angular/common';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from "primeng/divider";
import {FileUploadModule} from 'primeng/fileupload';
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {KeyFilterModule} from "primeng/keyfilter";
import {MessageModule} from "primeng/message";
import {MultiSelectModule} from "primeng/multiselect";
import {PaginatorModule} from "primeng/paginator";
import {PanelMenuModule} from "primeng/panelmenu";
import {PanelModule} from "primeng/panel";
import {PasswordModule} from "primeng/password";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "@shared/shared.module";
import {SidebarModule} from "primeng/sidebar";
import {SplitButtonModule} from "primeng/splitbutton";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToolbarModule} from "primeng/toolbar";
import { ReactiveFormsModule } from '@angular/forms';
import { PickListModule } from 'primeng/picklist';
import { EnrollmentRequestRoutingModule } from './enrollment-request-routing.module';
import { EnrollmentRequestComponent } from './enrollment-request.component';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { StudentFileModule } from './student-file/student-file.module';


@NgModule({
  declarations: [
    EnrollmentRequestComponent,
  ],
  imports: [
    NgCommonModule,
    ReactiveFormsModule,
    EnrollmentRequestRoutingModule,
    AccordionModule,
    NgCommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    RippleModule,
    MessageModule,
    ToolbarModule,
    PaginatorModule,
    TableModule,
    TabViewModule,
    TagModule,
    SplitButtonModule,
    InputTextModule,
    SidebarModule,
    PanelMenuModule,
    SharedModule,
    PanelModule,
    DividerModule,
    InputSwitchModule,
    StudentFileModule
  ]
})
export class EnrollmentRequestModule { }
