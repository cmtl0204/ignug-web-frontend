import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule as NgCommonModule} from '@angular/common';
import {EnrollmentRoutingModule} from './enrollment-routing.module';
import {SharedModule} from "@shared/shared.module";

// PrimeNg Modules
import {ButtonModule} from "primeng/button";
import {DialogModule} from 'primeng/dialog';
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
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { BadgeModule } from 'primeng/badge';

// Components
import {EnrollmentListComponent} from "./enrollment-list/enrollment-list.component";
import {EnrollmentSubjectListComponent} from "./enrollment-subject-list/enrollment-subject-list.component";
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component';
import { DownloadComponent } from '../download/download.component';
import { EnrollmentDetailListComponent } from './enrollment-detail/enrollment-detail-list/enrollment-detail-list.component';
import { EnrollmentDetailFormComponent } from './enrollment-detail/enrollment-detail-form/enrollment-detail-form.component';


@NgModule({
  declarations: [
    EnrollmentListComponent,
    EnrollmentSubjectListComponent,
    EnrollmentFormComponent,
    EnrollmentDetailListComponent,
    EnrollmentDetailFormComponent,
    DownloadComponent
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
    InputSwitchModule,
    TableModule,
    TabViewModule,
    CalendarModule,
    AccordionModule,
    DialogModule,
    DropdownModule,
    BadgeModule
  ]
})
export class EnrollmentModule {
}
