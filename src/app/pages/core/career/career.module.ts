import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule as NgCommonModule} from '@angular/common';
import {CareerRoutingModule} from './career-routing.module';

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
import {CareerListComponent} from "./career-list/career-list.component";
import {CareerFormComponent} from './career-form/career-form.component';
import {CheckboxModule} from "primeng/checkbox";
import {DividerModule} from "primeng/divider";
import {InputSwitchModule} from "primeng/inputswitch";
import {KeyFilterModule} from "primeng/keyfilter";
import {MultiSelectModule} from "primeng/multiselect";
import {PanelModule} from "primeng/panel";
import {SharedModule} from "@shared/shared.module";
import {CalendarModule} from "primeng/calendar";
import {OverlayPanelModule} from "primeng/overlaypanel";
import { ParallelCapacityComponent } from './parallel-capacity/parallel-capacity.component';

@NgModule({
    declarations: [
        CareerListComponent,
        CareerFormComponent,
        ParallelCapacityComponent,
    ],
    imports: [
        NgCommonModule,
        CareerRoutingModule,
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
        SharedModule,
        CalendarModule,
        OverlayPanelModule
    ]
})
export class CareerModule {
}
