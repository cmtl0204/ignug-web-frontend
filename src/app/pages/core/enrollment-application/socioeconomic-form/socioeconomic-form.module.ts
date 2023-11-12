import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SocioeconomicFormRoutingModule } from './socioeconomic-form-routing.module';

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
import { SocioeconomicFormComponent } from './socioeconomic-form.component';
import { TabViewModule } from 'primeng/tabview';
import { PersonalInformationFormComponent } from './personal-information/personal-information-form.component';


import { AccordionModule } from 'primeng/accordion';
import { StepsModule } from 'primeng/steps';
import { OriginPlaceComponent } from './origin-place/origin-place.component';
import { ResidencePlaceComponent } from './residence-place/residence-place.component';
import { FamilyGroupDataComponent } from './family-group/family-group-data.component';
import { FamilyEconomicDataComponent } from './family-economic/family-economic-data.component';
import { FamilyHealthAntsComponent } from './family-health/family-health-ants.component';
import { StudentHousingDataComponent } from './housing-data/student-housing-data.component';
import { MigrationCountryComponent } from './migration-country/migration-country.component';
import { PsychosocialSectionComponent } from './psychosocial-section/psychosocial-section.component';
import { AdditionalDataFormComponent } from './other-academic-data/other-academic-data-form.component';
import { AcademicDataFormComponent } from './academic-data/academic-data-form.component';

@NgModule({
  declarations: [
    SocioeconomicFormComponent,
    PersonalInformationFormComponent,
    AdditionalDataFormComponent,
    AcademicDataFormComponent,
    OriginPlaceComponent,
    ResidencePlaceComponent,
    FamilyGroupDataComponent,
    FamilyEconomicDataComponent,
    FamilyHealthAntsComponent,
    StudentHousingDataComponent,
    MigrationCountryComponent,
    PsychosocialSectionComponent,
  ],
  exports: [SocioeconomicFormComponent],
  imports: [
    NgCommonModule,
    AccordionModule,
    StepsModule,
    ReactiveFormsModule,
    SocioeconomicFormRoutingModule,
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
export class SocioeconomicFormModule {}
