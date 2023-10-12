import {NgModule} from '@angular/core';
import {CommonModule as NgCommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {StudentFileRoutingModule} from './student-file-routing.module';

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
import {PickListModule} from "primeng/picklist";
import { StudentFileFormComponent } from './student-file-form/student-file-form.component';
import { TabViewModule } from 'primeng/tabview';
import { PersonalInformationFormComponent } from './personal-information-form/personal-information-form.component';
import { ContactInformationFormComponent } from './contact-information-form/contact-information-form.component';
import { AdditionalDataFormComponent } from './additional-data-form/additional-data-form.component';
import { AdditionalEmergencyInformationFormComponent } from './additional-emergency-information-form/additional-emergency-information-form.component';
import { InstitutionalDataFormComponent } from './institutional-data-form/institutional-data-form.component';
import { AccordionModule } from 'primeng/accordion';
import { StepsModule } from 'primeng/steps';

@NgModule({
  declarations: [
    StudentFileFormComponent,
    PersonalInformationFormComponent,
    ContactInformationFormComponent,
    AdditionalDataFormComponent,
    AdditionalEmergencyInformationFormComponent,
    InstitutionalDataFormComponent
  ],
  imports: [
    NgCommonModule,
    AccordionModule ,
    StepsModule,
    ReactiveFormsModule,
    StudentFileRoutingModule,
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
    TabViewModule
  ]
})
export class StudentFileModule {
}
