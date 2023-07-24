import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  AbstractControl,
  FormArray, FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthHttpService, AuthService, RolesHttpService} from '@services/auth';
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  CurriculumsHttpService,
  MessageService
} from '@services/core';
import {OnExitInterface} from '@shared/interfaces';
import {PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-curriculum-form',
  templateUrl: './curriculum-form.component.html',
  styleUrls: ['./curriculum-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CurriculumFormComponent implements OnInit, OnExitInterface {
  protected readonly PrimeIcons = PrimeIcons;
  id: string = '';
  form: FormGroup;
  panelHeader: string = 'Create Curriculum';
  isChangePassword: FormControl = new FormControl(false);
  isLoadingSkeleton: boolean = false;
  isLoading: boolean = false;

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
    private curriculumsHttpService: CurriculumsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Curriculums', routerLink: ['/administration/curriculums']},
      {label: 'Form'},
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
      this.panelHeader = 'Update Curriculum';
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
      this.getCurriculum();
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
      username: [null, [Validators.required]],
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
    this.router.navigate(['/administration/curriculums']);
  }

  create(curriculum: CreateCurriculumDto): void {
    curriculum.passwordChanged = !curriculum.passwordChanged;
    this.curriculumsHttpService.create(curriculum).subscribe(curriculum => {
      this.form.reset(curriculum);
      this.back();
    });
  }

  loadRoles(): void {
    this.rolesHttpService.findAll().subscribe((roles) => this.roles = roles);
  }

  getCurriculum(): void {
    this.isLoadingSkeleton = true;
    this.curriculumsHttpService.findOne(this.id).subscribe((curriculum) => {
      this.isLoadingSkeleton = false;
      this.form.patchValue(curriculum);
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

  update(curriculum: UpdateCurriculumDto): void {
    curriculum.passwordChanged = !curriculum.passwordChanged;

    this.curriculumsHttpService.update(this.id, curriculum).subscribe((curriculum) => {
      this.form.reset(curriculum);
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

  get curriculumnameField(): AbstractControl {
    return this.form.controls['curriculumname'];
  }
}
