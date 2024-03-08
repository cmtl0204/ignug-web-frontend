import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentSubjectRoutingModule } from './enrollment-subject-routing.module';
import {EnrollmentSubjectListComponent} from "./enrollment-subject-list/enrollment-subject-list.component";
import {SharedModule} from "@shared/shared.module";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
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
import {StudentRoutingModule} from "../student-routing.module";
import {TableModule} from "primeng/table";
import {TabViewModule} from "primeng/tabview";
import {TagModule} from "primeng/tag";
import {CardModule} from "primeng/card";
import {DialogModule} from "primeng/dialog";
import {AutoFocusModule} from "primeng/autofocus";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [EnrollmentSubjectListComponent],
  imports: [
    CommonModule,
    EnrollmentSubjectRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ButtonModule,
    CalendarModule,
    DividerModule,
    InputSwitchModule,
    InputTextModule,
    MessageModule,
    PaginatorModule,
    PanelMenuModule,
    PanelModule,
    RippleModule,
    SidebarModule,
    SplitButtonModule,
    StudentRoutingModule,
    TableModule,
    TabViewModule,
    TagModule,
    ToolbarModule,
    CardModule,
    DialogModule,
    AutoFocusModule,
  ]
})
export class EnrollmentSubjectModule { }
