import {NgModule} from '@angular/core';
import {CommonModule as NgCommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {MessageModule} from "primeng/message";
import {UserComponent} from './user.component';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    NgCommonModule,
    UserRoutingModule,
    ButtonModule,
    RippleModule,
    MessageModule
  ]
})
export class UserModule {
}
