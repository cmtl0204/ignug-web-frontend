import {NgModule} from '@angular/core';
import {CommonModule as NgCommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {CoreRoutingModule} from './core-routing.module';
// PrimeNg Modules
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {MessageModule} from "primeng/message";
import {ToolbarModule} from "primeng/toolbar";
import {PaginatorModule} from "primeng/paginator";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {SplitButtonModule} from "primeng/splitbutton";
import {InputTextModule} from "primeng/inputtext";
import {SidebarModule} from "primeng/sidebar";
import {PanelMenuModule} from "primeng/panelmenu";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubjectRequirementComponent } from './subject-requirement/subject-requirement.component';
import {OrganizationChartModule} from "primeng/organizationchart";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";

@NgModule({
  declarations: [
    DashboardComponent,
          SubjectRequirementComponent,
  ],
  imports: [
    NgCommonModule,
    CoreRoutingModule,
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
    OrganizationChartModule,
    CardModule,
    DividerModule
  ]
})
export class CoreModule {
}
