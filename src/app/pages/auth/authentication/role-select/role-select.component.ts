import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "@shared/validators";
import {AuthHttpService, AuthService} from '@services/auth';
import {CoreService, MessageService, RoutesService} from '@services/core';
import {PrimeIcons} from "primeng/api";
import {RoleModel} from "@models/auth";
import {RolesEnum} from "@shared/enums";

@Component({
  selector: 'app-role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.scss']
})
export class RoleSelectComponent implements OnInit {
  protected form: FormGroup;
  protected readonly PrimeIcons = PrimeIcons;
  protected roles: RoleModel[] = [];

  constructor(
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    protected authService: AuthService,
    protected routesService: RoutesService) {
    this.form = this.newForm();
  }

  ngOnInit(): void {
    this.roles = this.authService.roles;
  }

  newForm(): FormGroup {
    return this.formBuilder.group({role: [null, [Validators.required]]});
  }

  onSubmit() {
    if (this.form.valid) {
      this.selectRole();
    } else {
      this.form.markAllAsTouched();
    }
  }

  selectRole() {
    this.authService.role = this.roleField.value;
    this.messageService.successCustom('Bienvenido', 'Ingreso Correcto');
    switch (this.roleField.value.code) {
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

  }

  get roleField() {
    return this.form.controls['role'];
  }
}
