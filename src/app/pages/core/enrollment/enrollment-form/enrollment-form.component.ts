import {Component, OnInit} from '@angular/core';
import {FormBuilder, AbstractControl, Validators, FormGroup} from '@angular/forms';
import {
  CatalogueModel,
  EnrollmentModel
} from '@models/core';
import {OnExitInterface} from '@shared/interfaces';
import {PrimeIcons} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  EnrollmentsHttpService,
  MessageService,
  RoutesService,
  SchoolPeriodsHttpService,
  StudentsHttpService,
} from '@services/core';
import {BreadcrumbEnum, CatalogueCoreTypeEnum, ClassButtonActionEnum, SkeletonEnum, LabelButtonActionEnum, IconButtonActionEnum} from '@shared/enums';

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.scss']
})
export class EnrollmentFormComponent implements OnInit, OnExitInterface {
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly ClassButtonActionEnum = ClassButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;
  protected formErrors: string[] = [];

  // Foreign Keys
  protected academicPeriods: CatalogueModel[] = [];
  protected parallels: CatalogueModel[] = [];
  protected states: CatalogueModel[] = [];
  protected types: CatalogueModel[] = [];
  protected workdays: CatalogueModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    protected messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private enrollmentsHttpService: EnrollmentsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.ENROLLMENTS, routerLink: [this.routesService.enrollments]},
      {label: BreadcrumbEnum.FORM},
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
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

    this.loadAcademicPeriods();
    this.loadParallels();
    this.loadStates();
    this.loadWorkdays();
    this.loadTypes();

    if (this.id) {
      this.get();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      identification: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      username: [null, [Validators.required]],
      date: [null, [Validators.required]],
      academicPeriod: [null, [ Validators.required]],
      type: [null, [ Validators.required]],
      workday: [null, [Validators.required]],
      parallel: [null, [Validators.required]],
      state: [null, [Validators.required]],
      folio: [null, [Validators.required]],
      observation: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.id) {
        this.update(this.form.value);
      } else {
        this.create(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields(this.formErrors);
    }
  }

  back(): void {
    this.router.navigate([this.routesService.enrollments]);
  }

  /** Actions **/
  create(enrollment: EnrollmentModel): void {
    this.enrollmentsHttpService.create(enrollment).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  update(enrollment: EnrollmentModel): void {
    this.enrollmentsHttpService.update(this.id!, enrollment).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  get(): void {
    this.enrollmentsHttpService.findOne(this.id!).subscribe((enrollment) => {
      this.form.patchValue(enrollment);
    });
  }

  /** Load Enrollment Details Data **/

  loadStates(): void {
    this.states = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.STATE);
  }

  loadParallels(): void {
    this.parallels = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.PARALLEL);
  }

  loadAcademicPeriods(): void {
    this.academicPeriods = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.ACADEMIC_PERIOD);
  }

  loadWorkdays(): void {
    this.workdays = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.WORKDAY);
  }

  loadTypes(): void {
    this.types = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.TYPE);
  }

  validateForm() {
    this.formErrors = [];
    if (this.identificationField.errors) this.formErrors.push('identification');
    if (this.lastnameField.errors) this.formErrors.push('lastname');
    if (this.usernameField.errors) this.formErrors.push('username');
    if (this.academicPeriodField.errors) this.formErrors.push('academicPeriod');
    if (this.dateField.errors) this.formErrors.push('date');
    if (this.typeField.errors) this.formErrors.push('type');
    if (this.workdayField.errors) this.formErrors.push(' workday');
    if (this.parallelField.errors) this.formErrors.push('parallel');
    if (this.stateField.errors) this.formErrors.push('state');
    if (this.folioField.errors) this.formErrors.push('folio');
    if (this.observationField.errors) this.formErrors.push('observation');

    this.formErrors.sort();
    return this.formErrors.length === 0 && this.form.valid;
  }


  /** Form Getters **/
  get identificationField(): AbstractControl {
    return this.form.controls['identification'];
  }
  get lastnameField(): AbstractControl {
    return this.form.controls['lastname'];
  }
  get usernameField(): AbstractControl {
    return this.form.controls['username'];
  }
  get academicPeriodField(): AbstractControl {
    return this.form.controls['academicPeriod'];
  }
  get dateField(): AbstractControl {
    return this.form.controls['date'];
  }
  get typeField(): AbstractControl {
    return this.form.controls['type'];
  }
  get workdayField(): AbstractControl {
    return this.form.controls['workday'];
  }
  get parallelField(): AbstractControl {
    return this.form.controls['parallel'];
  }
  get stateField(): AbstractControl {
    return this.form.controls['state'];
  }
  get folioField(): AbstractControl {
    return this.form.controls['folio'];
  }
  get observationField(): AbstractControl {
    return this.form.controls['observation'];
  }
  protected readonly SkeletonEnum = SkeletonEnum;
}
