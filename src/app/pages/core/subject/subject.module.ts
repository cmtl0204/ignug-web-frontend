import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule as NgCommonModule} from '@angular/common';
import { SubjectRoutingModule } from './subject-routing.module';

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

// Components
import {CheckboxModule} from "primeng/checkbox";
import {DividerModule} from "primeng/divider";
import {InputSwitchModule} from "primeng/inputswitch";
import {KeyFilterModule} from "primeng/keyfilter";
import {MultiSelectModule} from "primeng/multiselect";
import {PanelModule} from "primeng/panel";
import {PasswordModule} from "primeng/password";
import {SharedModule} from "@shared/shared.module";
import {CalendarModule} from "primeng/calendar";
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectFormComponent } from './subject-form/subject-form.component';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    SubjectListComponent,
    SubjectFormComponent,
  ],
  imports: [
    NgCommonModule,
    SubjectRoutingModule,
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
    CheckboxModule,
    DividerModule,
    InputSwitchModule,
    KeyFilterModule,
    MultiSelectModule,
    PanelModule,
    PasswordModule,
    SharedModule,
    CalendarModule,
    FileUploadModule,
    DialogModule
  ]
})
export class SubjectModule {
}
