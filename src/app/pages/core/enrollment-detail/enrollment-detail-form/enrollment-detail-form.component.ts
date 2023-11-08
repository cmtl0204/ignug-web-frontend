import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {FormBuilder, AbstractControl, Validators, FormGroup, FormControl} from '@angular/forms';
import {
  CatalogueModel,
  EnrollmentDetailModel,
  EnrollmentModel,
  SelectEnrollmentDetailDto,
  SelectEnrollmentDto,
  SubjectModel
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
  SubjectsHttpService,
} from '@services/core';

import {BreadcrumbEnum, CatalogueCoreTypeEnum, ClassButtonActionEnum, SkeletonEnum, LabelButtonActionEnum, IconButtonActionEnum} from '@shared/enums';
import { EnrollmentDetailsHttpService } from '@services/core/enrollment-details-http.service';

@Component({
  selector: 'app-enrollment-detail-form',
  templateUrl: './enrollment-detail-form.component.html',
  styleUrls: ['./enrollment-detail-form.component.scss']
})
export class EnrollmentDetailFormComponent implements OnInit, OnExitInterface{
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly ClassButtonActionEnum = ClassButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;
  protected formErrors: string[] = [];

  protected selectedItem: SelectEnrollmentDetailDto = {};
  protected selectedItems: EnrollmentDetailModel[] = [];
  protected items: EnrollmentDetailModel[] = [];
  protected selectedSubject: FormControl = new FormControl();
  protected selectedAcademicPeriod: FormControl = new FormControl();

  // Foreign Keys
  protected academicPeriods: CatalogueModel[] = [];
  protected parallels: CatalogueModel[] = [];
  protected states: CatalogueModel[] = [];
  protected types: CatalogueModel[] = [];
  protected workdays: CatalogueModel[] = [];
  protected subjects: SubjectModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    protected messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private location: Location,
    private enrollmentsHttpService: EnrollmentsHttpService,
    private enrollmentDetailsHttpService: EnrollmentDetailsHttpService,
    private subjectsHttpService: SubjectsHttpService,
    ) {
    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
    }

    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.ENROLLMENTS, routerLink: [this.routesService.enrollments]},
      {label: BreadcrumbEnum.ENROLLMENT_DETAILS, routerLink: [this.routesService.enrollmentsDetailList,this.id]},
      {label: BreadcrumbEnum.FORM},
    ]);

    this.form = this.newForm;

    this.selectedSubject.valueChanges.subscribe(value => {
      this.findSubjectsByacademicPeriod();
  });


  this.selectedAcademicPeriod.valueChanges.subscribe(value => {
    this.findSubjectsByacademicPeriod();
});
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
    this.loadSubjects();
    this.findSubjectsByacademicPeriod();

    if (this.id) {
      this.get();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      number: [null, [Validators.required, Validators.min(1),Validators.maxLength(3)]],
      date: [null, [Validators.required]],
      academicPeriod: [null, [ Validators.required]],
      subject: [null],
      type: [null, [ Validators.required]],
      workday: [null, [Validators.required]],
      parallel: [null, [Validators.required]],
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
    this.location.back();
  }

  findSubjectsByacademicPeriod(page: number = 0) {
    if (this.selectedSubject.value && this.selectedAcademicPeriod.value){
     this.enrollmentDetailsHttpService.findSubjectsByAcademicPeriod(this.selectedSubject.value, this.selectedAcademicPeriod.value)
     .subscribe((response) => {
       this.items = response.data
     });
    }
   }

  /** Actions **/
  create(enrollmentDetail: EnrollmentDetailModel): void {
    this.enrollmentDetailsHttpService.create(enrollmentDetail).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  update(enrollmentDetail: EnrollmentDetailModel): void {
    this.enrollmentDetailsHttpService.update(this.id!, enrollmentDetail).subscribe(() => {
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
    this.enrollmentDetailsHttpService.findOne(this.id!).subscribe((enrollment) => {
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
  loadSubjects(): void {
    this.subjectsHttpService.getAllSubjects()
      .subscribe((items) => this.subjects = items);
  }

  validateForm() {
    this.formErrors = [];
    if (this.academicPeriodField.errors) this.formErrors.push('Periodo Académico');
    if (this.dateField.errors) this.formErrors.push('Fecha');
    if (this.typeField.errors) this.formErrors.push('Tipo');
    if (this.workdayField.errors) this.formErrors.push(' Jornada');
    if (this.parallelField.errors) this.formErrors.push('Paralelo');
    if (this.observationField.errors) this.formErrors.push('Observación');
    if (this.numberField.errors) this.formErrors.push('Número');

    this.formErrors.sort();
    return this.formErrors.length === 0 && this.form.valid;
  }


  /** Form Getters **/
  get academicPeriodField(): AbstractControl {
    return this.form.controls['academicPeriod'];
  }
  get subjectField(): AbstractControl {
    return this.form.controls['subject'];
  }
  get dateField(): AbstractControl {
    return this.form.controls['date'];
  }
  get numberField(): AbstractControl {
    return this.form.controls['number'];
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
  get observationField(): AbstractControl {
    return this.form.controls['observation'];
  }
}
