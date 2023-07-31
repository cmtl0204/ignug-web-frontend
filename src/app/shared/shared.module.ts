import {NgModule,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolesPermissionsDirective} from '@shared/directives/roles-permissions.directive';
import {ErrorMessageDirective} from '@shared/directives/error-message.directive';
import {TokenDirective} from '@shared/directives/token.directive';
import {SkeletonModule} from 'primeng/skeleton';
import {TableModule} from 'primeng/table';
import {LabelDirective} from './directives/label.directive';
import {ProgressBarModule} from "primeng/progressbar";
import {ProgressBarComponent} from './components/progress-bar/progress-bar.component';
import {SkeletonComponent} from '@shared/components/skeleton/skeleton.component';
import {PaginatorModule} from "primeng/paginator";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {TooltipModule} from "primeng/tooltip";
import {FileUploadModule} from "primeng/fileupload";
import {MessageModule} from "primeng/message";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DividerModule} from "primeng/divider";
import {CardModule} from "primeng/card";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {ReactiveFormsModule} from "@angular/forms";
import {SearchComponent} from './components/search/search.component';
import {ActivePipe, DateFormatPipe, ExtensionsPipe, RolePipe} from '@shared/pipes';
import {UserStatePipe} from "@shared/pipes/auth/userState.pipe";
import {SchoolPeriodsStatePipe} from "@shared/pipes/core/school-periods-state.pipe";
import { LocationComponent } from './components/location/location.component';
import {TagModule} from "primeng/tag";
import { FileListComponent } from './components/file-list/file-list.component';

@NgModule({
  declarations: [
    SkeletonComponent,
    ProgressBarComponent,
    SearchComponent,
    ErrorMessageDirective,
    LabelDirective,
    RolesPermissionsDirective,
    TokenDirective,
    ExtensionsPipe,
    DateFormatPipe,
    RolePipe,
    ActivePipe,
    UserStatePipe,
    SchoolPeriodsStatePipe,
    LocationComponent,
    FileListComponent,
  ],
  exports: [
    SkeletonComponent,
    ProgressBarComponent,
    SearchComponent,
    LocationComponent,
    ErrorMessageDirective,
    LabelDirective,
    RolesPermissionsDirective,
    TokenDirective,
    ExtensionsPipe,
    DateFormatPipe,
    RolePipe,
    ActivePipe,
    UserStatePipe,
    SchoolPeriodsStatePipe,
    FileListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SkeletonModule,
    TableModule,
    ProgressBarModule,
    PaginatorModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    TooltipModule,
    FileUploadModule,
    MessageModule,
    InputTextareaModule,
    DividerModule,
    CardModule,
    OverlayPanelModule,
    TagModule,
  ]
})
export class SharedModule {
}
