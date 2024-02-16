import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherDistributionRoutingModule } from './teacher-distribution-routing.module';
import { TeacherDistributionListComponent } from './teacher-distribution-list/teacher-distribution-list.component';
import { GradeListComponent } from './grade-list/grade-list.component';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {ToolbarModule} from "primeng/toolbar";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "@shared/shared.module";
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
import {StudentRoutingModule} from "../../student/student-routing.module";
import {TableModule} from "primeng/table";
import {TabViewModule} from "primeng/tabview";
import {TagModule} from "primeng/tag";


@NgModule({
  declarations: [
    TeacherDistributionListComponent,
    GradeListComponent
  ],
  imports: [
    CommonModule,
    TeacherDistributionRoutingModule,
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
  ]
})
export class TeacherDistributionModule { }
