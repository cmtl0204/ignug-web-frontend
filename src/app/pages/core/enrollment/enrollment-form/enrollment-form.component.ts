import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Validators, FormGroup } from '@angular/forms';
import { CatalogueModel, CurriculumModel, EnrollmentModel, SchoolPeriodModel, StudentModel, SubjectModel } from '@models/core';
import { OnExitInterface } from '@shared/interfaces';
import { PrimeIcons } from 'primeng/api';
import { EnrollmentModule } from '../enrollment.module';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService, CataloguesHttpService, CoreService, CurriculumsService, EnrollmentsHttpService, MessageService, RoutesService, SchoolPeriodsService, StudentsHttpService, StudentsService, SubjectsService } from '@services/core';
import { BreadcrumbEnum, CatalogueCoreTypeEnum, SkeletonEnum } from '@shared/enums';

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.scss']
})
export class EnrollmentFormComponent implements OnInit, OnExitInterface{
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;
  protected panelHeader: string = 'Crear';

  // Foreign Keys Enrollment Details
  protected academicStates: CatalogueModel[] = [];
  protected enrollments: EnrollmentModule[] = [];
  protected parallels: CatalogueModel[] = [];
  protected states: CatalogueModel[] = [];
  protected subjects: SubjectModel[] = [];
  protected types: CatalogueModel[] = [];
  protected workdays: CatalogueModel[] = [];

  // Foreign Keys Enrollment
  protected students: StudentModel[] = [];
  protected academicPeriods: CatalogueModel[] = [];
  protected curriculums: CurriculumModel[] = [];
  //parallel
  protected schoolPeriods: SchoolPeriodModel[] = [];
  //state
  //type
  //workday


  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    protected messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private studentService: StudentsService,
    protected curriculumService: CurriculumsService,
    protected schoolPeriodService: SchoolPeriodsService,
    private enrollmentsHttpService: EnrollmentsHttpService,
    private subjectService: SubjectsService,

  ) {
    this.breadcrumbService.setItems([
      { label: BreadcrumbEnum.ENROLLMENTS, routerLink: [this.routesService.enrollments] },
      { label: BreadcrumbEnum.FORM },
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
      this.panelHeader = 'Actualizar';
    }

    this.form = this.enrollmentDetailForm;
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched || this.form.dirty) {
      return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {
  }

  get enrollmentDetailForm(): FormGroup{
    return this.formBuilder.group({
      number: [null],
      date: [null, [Validators.required]],
      finalAttendance: [null],
      finalGrade: [null],
      observation: [null],
      //fk
      academicState: [null],
      parallel: [null],
      state: [null],
      subject: [null],
      type: [null],
      workday: [null]
    })
  }

  get enrollmentForm(): FormGroup{
    return this.formBuilder.group({
      id: [null],
      date: [null],
      aplicationsAt: [null],
      folio: [null],
      observation: [null],
      //fk
      student: [this.studentService.student, [Validators.required]],
      academicPeriod: [null],
      curriculum: [this.curriculumService.curriculum, [Validators.required]],
      parallel: [null],
      schoolPeriod: [this.schoolPeriodService.schoolPeriod, [Validators.required]],
      state: [null],
      type: [null],
      workday: [null],
      enrollmentDetails: [[this.enrollmentDetailForm]]
    })
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
      this.messageService.errorsFields.then();
    }
  }

  back(): void {
    this.router.navigate([this.routesService.students]);
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

  loadAcademicStates(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.ACADEMIC_STATE).subscribe((items) => this.academicStates = items);
  }

  loadParallels(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.PARALLEL).subscribe((items) => this.parallels = items);
  }

  loadStates(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.STATE).subscribe((items) => this.states = items);
  }

  loadTypes(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.TYPE).subscribe((items) => this.types = items);
  }

  loadWorkdays(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.WORKDAY).subscribe((items) => this.workdays = items);
  }

  /** Load Enrollment Data **/

  loadAcademicPeriods(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.ACADEMIC_PERIOD).subscribe((items) => this.academicPeriods = items);
  }

  /** Form Getters **/

  /** Enrollment detail Form **/
  get numberEnrollmentDetailField(): AbstractControl {
    return this.enrollmentDetailForm.controls['number'];
  }

  get dateEnrollmentDetailField(): AbstractControl {
    return this.enrollmentDetailForm.controls['date'];
  }

  get finalAttendanceEnrollmentDetailField(): AbstractControl {
    return this.enrollmentDetailForm.controls['finalAttendance'];
  }

  get finalGradeEnrollmentDetailField(): AbstractControl {
    return this.enrollmentDetailForm.controls['finalGrade'];
  }

  get observationEnrollmentDetailField(): AbstractControl {
    return this.enrollmentDetailForm.controls['observation'];
  }

  get academicStateEnrollmentDetailField(): AbstractControl {
    return this.enrollmentDetailForm.controls['academicState'];
  }

  get enrollmentEnrollmentDetailField(): AbstractControl {
    return this.enrollmentDetailForm.controls['enrollment'];
  }

  get parallelEnrollmentDetailField(): AbstractControl {
    return this.enrollmentDetailForm.controls['parallel'];
  }

  get stateEnrollmentDetailField(): AbstractControl {
    return this.enrollmentDetailForm.controls['state'];
  }

  get subjectEnrollmentDetailField(): AbstractControl {
    return this.enrollmentDetailForm.controls['subject'];
  }

  get typeEnrollmentDetailField(): AbstractControl {
    return this.enrollmentDetailForm.controls['type'];
  }

  get workdayEnrollmentDetailField(): AbstractControl {
    return this.enrollmentDetailForm.controls['workday'];
  }

   /** Enrollment Form **/
  get dateEnrollmentField(): AbstractControl {
    return this.enrollmentForm.controls['date'];
  }

  get aplicationsAtEnrollmentField(): AbstractControl {
    return this.enrollmentForm.controls['aplicationsAt'];
  }

  get folioEnrollmentField(): AbstractControl {
    return this.enrollmentForm.controls['folio'];
  }

  get observationEnrollmentField(): AbstractControl {
    return this.enrollmentForm.controls['observation'];
  }

  get studentEnrollmentField(): AbstractControl {
    return this.enrollmentForm.controls['student'];
  }

  get academicPeriodEnrollmentField(): AbstractControl {
    return this.enrollmentForm.controls['academicPeriod'];
  }

  get curriculumEnrollmentField(): AbstractControl {
    return this.enrollmentForm.controls['curriculum'];
  }

  get parallelEnrollmentField(): AbstractControl {
    return this.enrollmentForm.controls['parallel'];
  }

  get schoolPeriodEnrollmentField(): AbstractControl {
    return this.enrollmentForm.controls['schoolPeriod'];
  }

  get stateEnrollmentField(): AbstractControl {
    return this.enrollmentDetailForm.controls['state'];
  }

  get typeEnrollmentField(): AbstractControl {
    return this.enrollmentDetailForm.controls['type'];
  }

  get workdayEnrollmentField(): AbstractControl {
    return this.enrollmentDetailForm.controls['workday'];
  }

  get enrollmentDetailField(): AbstractControl {
    return this.enrollmentDetailForm.controls['enrollmentDetail'];
  }

  protected readonly SkeletonEnum = SkeletonEnum;

}
