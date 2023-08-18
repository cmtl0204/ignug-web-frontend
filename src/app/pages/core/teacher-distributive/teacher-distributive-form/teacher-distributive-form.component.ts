import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PrimeIcons} from 'primeng/api';
import {OnExitInterface} from '@shared/interfaces';
import {TeacherDistributiveModel, CatalogueModel, SchoolPeriodModel, SubjectModel, TeacherModel} from '@models/core';
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  MessageService,
  RoutesService,
  TeacherDistributivesHttpService,
  SchoolPeriodsService,
  SubjectsService,
  TeachersService,
  CareersHttpService,
} from '@services/core';
import {BreadcrumbEnum, CatalogueCoreTypeEnum, SkeletonEnum} from '@shared/enums';

@Component({
  selector: 'app-teacher-distributive-form',
  templateUrl: './teacher-distributive-form.component.html',
  styleUrls: ['./teacher-distributive-form.component.scss']
})
export class TeacherDistributiveFormComponent implements OnInit, OnExitInterface {
  protected PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;
  protected panelHeader = 'Crear';

  // Foreign Keys
  protected schoolPeriods: SchoolPeriodModel[] = [];
  protected subjects: SubjectModel[] = [];
  protected teachers: TeacherModel[] = [];
  protected parallels: CatalogueModel[] = [];
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
    private teacherDistributivesHttpService: TeacherDistributivesHttpService,
    private schoolPeriodsService: SchoolPeriodsService,
    private subjectsService: SubjectsService,
    private teachersService: TeachersService,
    private careersHttpService: CareersHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.TEACHER_DISTRIBUTIVES, routerLink: [this.routesService.teacherDistributives]},
      {label: BreadcrumbEnum.FORM},
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
      this.panelHeader = 'Actualizar';
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
    this.loadParallels();
    this.loadWorkdays();
    this.loadTeachersByCareer();

    if (this.id) {
      this.get();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      parallel: [null, [Validators.required]],
      teacher: [this.teachersService.teacher, [Validators.required]],
      schoolPeriod: [this.schoolPeriodsService.schoolPeriod, [Validators.required]],
      subject: [this.subjectsService.subject, [Validators.required]],
      workday: [null, [Validators.required]],
      hours: [null, []],
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
      this.messageService.errorsFields;
    }
  }

  back(): void {
    this.router.navigate([this.routesService.teacherDistributives]);
  }

  /** Actions **/
  create(item: TeacherDistributiveModel): void {
    this.teacherDistributivesHttpService.create(item).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  update(item: TeacherDistributiveModel): void {
    this.teacherDistributivesHttpService.update(this.id!, item).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  /** Load Data **/
  get(): void {
    this.teacherDistributivesHttpService.findOne(this.id!).subscribe((item) => {
      this.form.patchValue(item);
    });
  }

  loadParallels(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.PARALLEL)
      .subscribe((items) => this.parallels = items);
  }

  loadWorkdays(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.ENROLLMENTS_WORKDAY)
      .subscribe((items) => this.workdays = items);
  }

   loadTeachersByCareer(): void {
    this.careersHttpService.findTeachersByCareer('676d65c4-64a4-4626-8c08-1147dccc502c')
      .subscribe((items) => this.teachers = items);
  }

 

  /** Form Getters **/
  get hoursField(): AbstractControl {
    return this.form.controls['hours'];
  }
  
  get parallelField(): AbstractControl {
    return this.form.controls['parallel'];
  }
  
  get teacherField(): AbstractControl {
    return this.form.controls['teacher'];
  }
  
  get schoolPeriodField(): AbstractControl {
    return this.form.controls['schoolPeriod'];
  }
  
  get subjectField(): AbstractControl {
    return this.form.controls['subject'];
  }
  
  get workdayField(): AbstractControl {
    return this.form.controls['workday'];
  }
  
  protected readonly SkeletonEnum = SkeletonEnum;
  }
