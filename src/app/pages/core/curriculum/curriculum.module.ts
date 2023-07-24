import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule as NgCommonModule} from '@angular/common';
import {CurriculumRoutingModule} from './curriculum-routing.module';

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
import {CurriculumListComponent} from "./curriculum-list/curriculum-list.component";
import {CurriculumFormComponent} from "./curriculum-form/curriculum-form.component";
import {SharedModule} from "@shared/shared.module";
import {PanelModule} from "primeng/panel";
import {DividerModule} from "primeng/divider";
import {InputSwitchModule} from "primeng/inputswitch";


@NgModule({
  declarations: [
    CurriculumListComponent,
    CurriculumFormComponent
  ],
  imports: [
    NgCommonModule,
    CurriculumRoutingModule,
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
    InputSwitchModule
  ]
})
export class CurriculumModule {
}
