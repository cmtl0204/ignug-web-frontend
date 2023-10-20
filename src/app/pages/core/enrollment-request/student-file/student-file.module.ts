import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentFileRoutingModule } from './student-file-routing.module';

// PrimeNg Modules
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { SharedModule } from '@shared/shared.module';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';

// Components
import { PickListModule } from 'primeng/picklist';
import { StudentFileFormComponent } from './student-file-form/student-file-form.component';
import { TabViewModule } from 'primeng/tabview';
import { PersonalInformationFormComponent } from './personal-information-form/personal-information-form.component';

import { AdditionalDataFormComponent } from './additional-data-form/additional-data-form.component';
import { InstitutionalDataFormComponent } from './institutional-data-form/institutional-data-form.component';
import { AccordionModule } from 'primeng/accordion';
import { StepsModule } from 'primeng/steps';
import { PlaceOriginComponent } from './place-origin/place-origin.component';
import { PlaceResidenceComponent } from './place-residence/place-residence.component';
import { FamilyGroupDataComponent } from './family-group-data/family-group-data.component';
import { FamilyEconomicDataComponent } from './family-economic-data/family-economic-data.component';
import { FamilyHealthAntsComponent } from './family-health-ants/family-health-ants.component';
import { StudentHousingDataComponent } from './student-housing-data/student-housing-data.component';
import { MigrationCountryComponent } from './migration-country/migration-country.component';
import { PsychosocialSectionComponent } from './psychosocial-section/psychosocial-section.component';
import { CroquisComponent } from './croquis/croquis.component';

@NgModule({
  declarations: [
    StudentFileFormComponent,
    PersonalInformationFormComponent,
    AdditionalDataFormComponent,
    InstitutionalDataFormComponent,
    PlaceOriginComponent,
    PlaceResidenceComponent,
    FamilyGroupDataComponent,
    FamilyEconomicDataComponent,
    FamilyHealthAntsComponent,
    StudentHousingDataComponent,
    MigrationCountryComponent,
    PsychosocialSectionComponent,
    CroquisComponent,
  ],
  exports: [StudentFileFormComponent],
  imports: [
    NgCommonModule,
    AccordionModule,
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
    TabViewModule,
  ],
})
export class StudentFileModule {}
