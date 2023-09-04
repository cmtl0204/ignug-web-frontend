import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule as NgCommonModule} from '@angular/common';
import {InstitutionRoutingModule} from './institution-routing.module';

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
import {InstitutionListComponent} from "./institution-list/institution-list.component";
import {InstitutionFormComponent} from './institution-form/institution-form.component';
import {SharedModule} from "@shared/shared.module";
import {PanelModule} from "primeng/panel";
import {DividerModule} from "primeng/divider";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputMaskModule} from "primeng/inputmask";
import {OverlayPanelModule} from "primeng/overlaypanel";

@NgModule({
  declarations: [
    InstitutionListComponent,
    InstitutionFormComponent,
  ],
  imports: [
    NgCommonModule,
    InstitutionRoutingModule,
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
    InputMaskModule,
    OverlayPanelModule
  ]
})
export class InstitutionModule {
}
