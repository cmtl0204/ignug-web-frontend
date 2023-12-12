import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule as NgCommonModule} from '@angular/common';
import {TeacherDistributionRoutingModule} from './teacher-distribution-routing.module';
import {SharedModule} from "@shared/shared.module";

// PrimeNg Modules
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {MessageModule} from "primeng/message";
import {ToolbarModule} from "primeng/toolbar";
import {PaginatorModule} from "primeng/paginator";
import {TableModule} from "primeng/table";
import {TabViewModule} from 'primeng/tabview';
import {TagModule} from "primeng/tag";
import {SplitButtonModule} from "primeng/splitbutton";
import {InputTextModule} from "primeng/inputtext";
import {SidebarModule} from "primeng/sidebar";
import {PanelMenuModule} from "primeng/panelmenu";
import {InputNumberModule} from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
// Components
import {TeacherDistributionListComponent} from "./teacher-distribution-list/teacher-distribution-list.component";
import {TeacherDistributionFormComponent} from "./teacher-distribution-form/teacher-distribution-form.component";
import {PanelModule} from "primeng/panel";
import {DividerModule} from "primeng/divider";

@NgModule({
  declarations: [
    TeacherDistributionListComponent,
    TeacherDistributionFormComponent,
  ],
  imports: [
    NgCommonModule,
    TeacherDistributionRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ButtonModule,
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
    InputNumberModule,
    CalendarModule,
    PanelModule,
    DividerModule,
  ]
})
export class TeacherDistributionModule {
}
