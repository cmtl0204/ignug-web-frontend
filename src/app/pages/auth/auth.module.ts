import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {CardModule} from 'primeng/card';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import {PasswordResetComponent} from './password-reset/password-reset.component';

@NgModule({
  declarations: [LoginComponent, PasswordResetComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    CardModule,
    PasswordModule,
    DividerModule,
  ]
})
export class AuthModule {
}
