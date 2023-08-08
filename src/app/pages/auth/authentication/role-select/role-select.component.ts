import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PrimeIcons} from "primeng/api";
import {RolesEnum} from "@shared/enums";
import {RoleModel} from "@models/auth";
import {AuthService} from '@services/auth';
import {CoreService, MessageService, RoutesService} from '@services/core';

@Component({
  selector: 'app-role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.scss']
})
export class RoleSelectComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected form: FormGroup;
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

    if (this.authService.role.code === RolesEnum.ADMIN) {
      this.authService.selectDashboard();
      return;
    }

    if (this.authService.institutions.length === 1) {
      this.authService.institution = this.authService.institutions[0];
      this.authService.selectDashboard();
    } else {
      this.routesService.institutionSelect();
    }
  }

  get roleField() {
    return this.form.controls['role'];
  }
}
