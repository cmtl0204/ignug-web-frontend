import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PrimeIcons} from "primeng/api";
import {RolesEnum} from "@shared/enums";
import {AuthHttpService, AuthService} from '@services/auth';
import {CoreService, MessageService, RoutesService} from '@services/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authHttpService: AuthHttpService,
              protected coreService: CoreService,
              public messageService: MessageService,
              protected authService: AuthService,
              private routesService: RoutesService) {
    this.form = this.newForm();
  }

  ngOnInit(): void {

  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      username: ['coordinator_career', [Validators.required]],
      // username: [null, [Validators.required]],
      password: ['12345678', [Validators.required]],
      // password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.login();
    } else {
      this.form.markAllAsTouched();
    }
  }

  login() {
    this.authHttpService.login(this.form.value)
      .subscribe(
        response => {
          if (this.authService.roles.length === 1) {
            this.authService.role = this.authService.roles[0];

            this.messageService.successCustom('Bienvenido', 'Ingreso Correcto');
            switch (this.authService.roles[0].code) {
              case RolesEnum.ADMIN: {
                this.routesService.dashboardAdmin();
                break;
              }
              case RolesEnum.RECTOR: {
                this.routesService.dashboardRector();
                break;
              }
              case RolesEnum.TEACHER: {
                this.routesService.dashboardTeacher();
                break;
              }
              case RolesEnum.STUDENT: {
                this.routesService.dashboardStudent();
                break;
              }
              case RolesEnum.COORDINATOR_ADMINISTRATIVE: {
                this.routesService.dashboardCoordinatorAdministrative();
                break;
              }
              case RolesEnum.COORDINATOR_CAREER: {
                this.routesService.dashboardCoordinatorCareer();
                break;
              }
            }
          } else {
            this.routesService.roleSelect();
          }

        });
  }

  redirectPasswordReset() {
    this.routesService.passwordReset();
  }

  get usernameField(): AbstractControl {
    return this.form.controls['username'];
  }

  get passwordField(): AbstractControl {
    return this.form.controls['password'];
  }
}
