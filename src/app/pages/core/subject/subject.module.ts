import {NgModule} from '@angular/core';
import {CommonModule as NgCommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {SubjectRoutingModule} from './subject-routing.module';

// PrimeNg Modules
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

// Components
import {SubjectListComponent} from './subject-list/subject-list.component';
import {SubjectFormComponent} from './subject-form/subject-form.component';
import {SubjectRequirementComponent} from "./subject-requirement/subject-requirement.component";
import {PickListModule} from "primeng/picklist";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {StepsModule} from "primeng/steps";
import {TabViewModule} from "primeng/tabview";
import {AccordionModule} from "primeng/accordion";


@NgModule({
  declarations: [
    SubjectListComponent,
    SubjectFormComponent,
    SubjectRequirementComponent,
  ],
  imports: [
    NgCommonModule,
    ReactiveFormsModule,
    SubjectRoutingModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DialogModule,
    DividerModule,
    FileUploadModule,
    InputSwitchModule,
    InputTextModule,
    KeyFilterModule,
    MessageModule,
    MultiSelectModule,
    PaginatorModule,
    PanelMenuModule,
    PanelModule,
    PasswordModule,
    RippleModule,
    SharedModule,
    SidebarModule,
    SplitButtonModule,
    TableModule,
    TagModule,
    ToolbarModule,
    PickListModule,
    OverlayPanelModule,
    StepsModule,
    TabViewModule,
    AccordionModule,
  ]
})
export class SubjectModule {
}
