import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpInterceptorProviders} from './interceptors';
import {HttpClientModule} from '@angular/common/http';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {
  FooterComponent,
  TopbarComponent,
  SidebarComponent,
  BlankComponent,
  MainComponent,
  BreadcrumbComponent
} from '@layout/index';
import {DialogService} from 'primeng/dynamicdialog';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenubarModule} from 'primeng/menubar';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    MainComponent,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    BreadcrumbComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BreadcrumbModule,
    MenubarModule,
    ButtonModule,
    ConfirmDialogModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    HttpInterceptorProviders,
    DialogService,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
