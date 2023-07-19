import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  AbstractControl,
  FormArray, FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateInstitutionDto, UpdateInstitutionDto} from '@models/core';
import {} from '@services/core';
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  InstitutionsHttpService,
  MessageService
} from '@services/core';
import {OnExitInterface} from '@shared/interfaces';
import {PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-institution-form',
  templateUrl: './institution-form.component.html',
  styleUrls: ['./institution-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstitutionFormComponent implements OnInit, OnExitInterface {
  protected readonly PrimeIcons = PrimeIcons;
  id: string = '';
  form: FormGroup;
  panelHeader: string = 'Create Institution';
  isChangePassword: FormControl = new FormControl(false);
  isLoadingSkeleton: boolean = false;
  isLoading: boolean = false;
  roles: RoleModel[] = [];

  constructor(
    private authHttpService: AuthHttpService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    private coreService: CoreService,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private router: Router,
    private rolesHttpService: RolesHttpService,
    private institutionsHttpService: InstitutionsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Institutions', routerLink: ['/administration/institutions']},
      {label: 'Form'},
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
      this.panelHeader = 'Update Institution';
    }

    this.form = this.newForm;
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched || this.form.dirty) {
      return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {
    this.loadRoles();

    if (this.id != '') {
      this.getInstitution();
      this.passwordField.clearValidators();
    } else {
      this.isChangePassword.setValue(true);
      this.passwordField.enable();
      this.passwordChangedField.enable();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      lastname: [null, [Validators.required]],
      name: [null, [Validators.required]],
      password: [{value: null, disabled: true}, [Validators.required, Validators.minLength(8)]],
      passwordChanged: [{value: true, disabled: true}],
      roles: [null, [Validators.required]],
      institutionname: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.id != '') {
        this.update(this.form.value);
      } else {
        this.create(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields.then();
    }
  }

  back(): void {
    this.router.navigate(['/administration/institutions']);
  }

  create(institution: CreateInstitutionDto): void {
    institution.passwordChanged = !institution.passwordChanged;
    this.institutionsHttpService.create(institution).subscribe(institution => {
      this.form.reset(institution);
      this.back();
    });
  }

  loadRoles(): void {
    this.rolesHttpService.findAll().subscribe((roles) => this.roles = roles);
  }

  getInstitution(): void {
    this.isLoadingSkeleton = true;
    this.institutionsHttpService.findOne(this.id).subscribe((institution) => {
      this.isLoadingSkeleton = false;
      this.form.patchValue(institution);
    });
  }

  handleChangePassword(event: any) {
    this.isChangePassword.setValue(event.checked);
    if (this.isChangePassword.value) {
      this.passwordChangedField.enable();
      this.passwordField.enable();
      this.passwordField.setValidators([Validators.required, Validators.minLength(8)]);
    } else {
      this.passwordChangedField.setValue(false);
      this.passwordChangedField.disable();
      this.passwordField.setValue(null);
      this.passwordField.disable();
      this.passwordField.clearValidators();
    }
    this.passwordField.updateValueAndValidity();
  }

  update(institution: UpdateInstitutionDto): void {
    institution.passwordChanged = !institution.passwordChanged;

    this.institutionsHttpService.update(this.id, institution).subscribe((institution) => {
      this.form.reset(institution);
      this.back()
    });
  }

  get emailField(): AbstractControl {
    return this.form.controls['email'];
  }

  get lastnameField(): AbstractControl {
    return this.form.controls['lastname'];
  }

  get nameField(): AbstractControl {
    return this.form.controls['name'];
  }

  get passwordField(): AbstractControl {
    return this.form.controls['password'];
  }

  get passwordChangedField(): AbstractControl {
    return this.form.controls['passwordChanged'];
  }

  get rolesField(): FormArray {
    return this.form.controls['roles'] as FormArray;
  }

  get institutionnameField(): AbstractControl {
    return this.form.controls['institutionname'];
  }
}

