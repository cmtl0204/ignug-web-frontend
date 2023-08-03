import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule as NgCommonModule} from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';

// PrimeNg Modules
import {ButtonModule} from "primeng/button";
import {CalendarModule} from 'primeng/calendar';
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

// Components
import { StudentListComponent } from './student-list/student-list.component';
import { StudentFormComponent } from './student-form/student-form.component';
import {SharedModule} from "@shared/shared.module";
import {PanelModule} from "primeng/panel";
import {DividerModule} from "primeng/divider";
import {InputSwitchModule} from "primeng/inputswitch";

@NgModule({
  declarations: [
    StudentListComponent,
    StudentFormComponent,
  ],
  imports: [
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
    StudentRoutingModule,
    InputTextModule,
    SidebarModule,
    PanelMenuModule,
    SharedModule,
    PanelModule,
    DividerModule,
    InputSwitchModule
  ]
})
export class StudentModule {
}
