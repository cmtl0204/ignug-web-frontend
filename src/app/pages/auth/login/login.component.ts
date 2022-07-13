import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthHttpService, AuthService} from '@services/auth';
import {CoreService, MessageService} from '@services/core';
import {RolesEnum} from "@shared/enums";
import {AuthRoutesEnum} from '@shared/enums/routes.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  progressBar: boolean = false;
  // loaded$ = this.coreService.loaded$;
  isPasswordReset = false;

  constructor(private formBuilder: FormBuilder,
              private authHttpService: AuthHttpService,
              private coreService: CoreService,
              public messageService: MessageService,
              private authService: AuthService,
              private router: Router) {
    this.formLogin = this.newFormLogin();
  }

  ngOnInit(): void {

  }

  newFormLogin(): FormGroup {
    return this.formBuilder.group({
      // username: ['1234567891', [Validators.required]],
      username: [null, [Validators.required]],
      // password: ['12345678', [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.formLogin.valid) {
      this.login();
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

  login() {
    this.progressBar = true;
    this.authHttpService.login(this.formLogin.value)
      .subscribe(
        response => {
          this.progressBar = false;
          switch (this.authService.role?.name) {
            case RolesEnum.ADMIN:
              this.redirectAdmin();
              break;
            default:
              this.redirectHome();
          }
        });
  }

  showPasswordReset() {
    this.isPasswordReset = true;
  }

  hidePasswordReset() {
    this.isPasswordReset = false;
  }

  requestPasswordReset() {
    if (this.usernameField.valid) {
      this.authHttpService.requestPasswordReset(this.usernameField.value)
        .subscribe(
          token => {
            this.router.navigate([AuthRoutesEnum.PASSWORD_RESET]);
          });
    } else {
      this.usernameField.markAsTouched();
    }
  }

  requestUserUnlock() {
    this.progressBar = true;
    this.authHttpService.login(this.usernameField.value)
      .subscribe(
        response => {
          this.progressBar = false;
          // this.redirect();
        }, error => {
          this.messageService.error(error);
          this.progressBar = false;
        });
  }

  redirectAdmin() {
    this.router.navigate(['/user-administration']);
  }

  redirectSupport() {
    this.router.navigate(['/patients']);
  }

  redirectHome() {
    this.router.navigate(['/']);
  }

  get usernameField() {
    return this.formLogin.controls['username'];
  }

  get passwordField() {
    return this.formLogin.controls['password'];
  }
}
