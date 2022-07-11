import {NgModule} from '@angular/core';
import {CommonModule as NgCommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {UserRoutingModule} from './user-routing.module';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {TableModule} from 'primeng/table';
import {MessageModule} from "primeng/message";
import {UserComponent} from './user.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserFormComponent} from './user-form/user-form.component';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {InputTextModule} from 'primeng/inputtext';
import {SharedModule} from '@shared/shared.module';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {PasswordModule} from 'primeng/password';
import {CardModule} from "primeng/card";
import {ToastModule} from "primeng/toast";
import {PaginatorModule} from "primeng/paginator";
import {KeyFilterModule} from "primeng/keyfilter";
import {DialogModule} from "primeng/dialog";

@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent,
    UserListComponent
  ],
    imports: [
        NgCommonModule,
        UserRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        //PrimeNg
        ButtonModule,
        CardModule,
        CalendarModule,
        DropdownModule,
        InputTextModule,
        RippleModule,
        MessageModule,
        PasswordModule,
        TableModule,
        ToolbarModule,
        TooltipModule,
        ToastModule,
        PaginatorModule,
        KeyFilterModule,
        DialogModule,
    ]
})
export class UserModule {
}
