import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PrimeIcons} from "primeng/api";
import {RolesEnum} from "@shared/enums";
import {RoleModel} from "@models/auth";
import {AuthService} from '@services/auth';
import {CoreService, MessageService, RoutesService} from '@services/core';
import {InstitutionModel} from "@models/core";

@Component({
  selector: 'app-institution-select',
  templateUrl: './institution-select.component.html',
  styleUrls: ['./institution-select.component.scss']
})
export class InstitutionSelectComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected form: FormGroup;
  protected institutions: InstitutionModel[] = [];

  constructor(
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    protected authService: AuthService,
    protected routesService: RoutesService) {
    this.form = this.newForm();
  }

  ngOnInit(): void {
    this.institutions = this.authService.institutions;
  }

  newForm(): FormGroup {
    return this.formBuilder.group({institution: [null, [Validators.required]]});
  }

  onSubmit() {
    if (this.form.valid) {
      this.selectInstitution();
    } else {
      this.form.markAllAsTouched();
    }
  }

  selectInstitution() {
    this.authService.institution = this.institutionField.value;
    this.authService.selectDashboard();
  }

  get institutionField() {
    return this.form.controls['institution'];
  }
}
