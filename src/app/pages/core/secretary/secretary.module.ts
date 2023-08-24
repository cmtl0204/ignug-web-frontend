import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// PrimeNg Modules
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
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
import {InputNumberModule} from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { SecretaryRoutingModule } from './secretary-routing.module';
import { SecretaryFormComponent } from './secretary-form/secretary-form.component';
import {PanelModule} from "primeng/panel";
import {DividerModule} from "primeng/divider";

@NgModule({
  declarations: [
    SecretaryFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SecretaryRoutingModule,
    ButtonModule,
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
    InputNumberModule,
    CalendarModule,
    PanelModule,
    DividerModule,
  ]
})
export class SecretaryModule { }
