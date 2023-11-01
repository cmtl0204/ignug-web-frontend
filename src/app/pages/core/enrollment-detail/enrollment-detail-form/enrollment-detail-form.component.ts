import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {FormBuilder, AbstractControl, Validators, FormGroup} from '@angular/forms';
import {
  CatalogueModel,
  EnrollmentModel,
  SelectEnrollmentDto
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
  selector: 'app-enrollment-detail-form',
  templateUrl: './enrollment-detail-form.component.html',
  styleUrls: ['./enrollment-detail-form.component.scss']
})
export class EnrollmentDetailFormComponent implements OnInit, OnExitInterface{
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly ClassButtonActionEnum = ClassButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;
  protected formErrors: string[] = [];

  protected selectedItem: SelectEnrollmentDto = {};
  protected selectedItems: EnrollmentModel[] = [];
  protected items: EnrollmentModel[] = [];

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
    private location: Location,
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
      student: this.newStudentForm,
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

  get newStudentForm(): FormGroup {
    return this.formBuilder.group({
      informationStudent: [{value:null,disabled:true}, [Validators.required]],
      user: this.newUserForm,
    });
  }

  get newUserForm(): FormGroup {
    return this.formBuilder.group({
      identification: [{value:null,disabled:true}, [Validators.required]],
      lastname: [{value:null,disabled:true}, [Validators.required]],
      name: [{value:null,disabled:true}, [Validators.required]],
      email: [{value:null,disabled:true},, [Validators.required]],
      cellPhone: [{value:null,disabled:true},, [Validators.required]],
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
    this.location.back();
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

  approve() {
    this.enrollmentsHttpService.approve(this.id!).subscribe(item => {
      this.back();
    });
  }

  reject() {
    this.enrollmentsHttpService.reject(this.id!).subscribe(item => {
      this.back();
    });
  }

  get(): void {
    this.enrollmentsHttpService.findOne(this.id!).subscribe((enrollment) => {
      this.form.patchValue(enrollment);
      console.log(this.academicPeriodField.value)
    });
  }

  /** Load Enrollment Details Data **/

  loadStates(): void {
    this.states = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.ENROLLMENTS_STATE);
  }

  loadParallels(): void {
    this.parallels = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.PARALLEL);
  }

  loadAcademicPeriods(): void {
    this.academicPeriods = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.ACADEMIC_PERIOD);
    console.log(this.academicPeriods)
  }

  loadWorkdays(): void {
    this.workdays = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.ENROLLMENTS_WORKDAY);
  }

  loadTypes(): void {
    this.types = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.ENROLLMENTS_TYPE);
  }

  validateForm() {
    this.formErrors = [];
    if (this.identificationField.errors) this.formErrors.push('identification');
    if (this.lastnameField.errors) this.formErrors.push('lastname');
    if (this.nameField.errors) this.formErrors.push('name');
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

  get studentForm(): FormGroup {
    return this.form.controls['student'] as FormGroup;
  }

  get userForm(): FormGroup {
    return this.studentForm.controls['user'] as FormGroup;
  }

  get identificationField(): AbstractControl {
    return this.userForm.controls['identification'];
  }
  get lastnameField(): AbstractControl {
    return this.userForm.controls['lastname'];
  }
  get nameField(): AbstractControl {
    return this.userForm.controls['name'];
  }
  get emailField(): AbstractControl {
    return this.userForm.controls['email'];
  }
  get cellPhoneField(): AbstractControl {
    return this.userForm.controls['cellPhone'];
  }

  protected readonly SkeletonEnum = SkeletonEnum;
}
