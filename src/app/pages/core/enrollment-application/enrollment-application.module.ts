import { NgModule } from '@angular/core';
import {CommonModule as NgCommonModule} from '@angular/common';
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
import {SharedModule} from "@shared/shared.module";
import {SidebarModule} from "primeng/sidebar";
import {SplitButtonModule} from "primeng/splitbutton";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToolbarModule} from "primeng/toolbar";
import { ReactiveFormsModule } from '@angular/forms';
import { EnrollmentApplicationRoutingModule } from './enrollment-application-routing.module';
import { EnrollmentApplicationComponent } from './enrollment-application.component';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { SocioeconomicFormModule } from './socioeconomic-form/socioeconomic-form.module';
import { SocioeconimcReportComponent } from './socioeconimc-report/socioeconimc-report.component';
import { ApplicationAttachmentComponent } from './application-attachment/application-attachment.component';
import { ApplicationComponent } from './application/application.component';


@NgModule({
  declarations: [
    EnrollmentApplicationComponent,
    SocioeconimcReportComponent,
    ApplicationAttachmentComponent,
    ApplicationComponent,
  ],
  imports: [
    NgCommonModule,
    ReactiveFormsModule,
    EnrollmentApplicationRoutingModule,
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
    SocioeconomicFormModule
  ]
})
export class EnrollmentApplicationModule { }
