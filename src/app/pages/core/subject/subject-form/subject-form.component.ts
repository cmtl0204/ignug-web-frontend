import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PrimeIcons} from 'primeng/api';
import {OnExitInterface} from '@shared/interfaces';
import {CatalogueModel, CurriculumModel, SubjectModel} from '@models/core';
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  FilesHttpService,
  MessageService,
  RoutesService,
  SubjectsHttpService,
} from '@services/core';
import {BreadcrumbEnum, CatalogueCoreTypeEnum, SkeletonEnum} from '@shared/enums';
import {CurriculumsService} from '@services/core';


@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss'],
})
export class SubjectFormComponent implements OnInit, OnExitInterface {
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected id: string | null = null;
  protected form: FormGroup;
  protected panelHeader: string = 'Crear';

  // Foreign Keys
  protected curriculum: CurriculumModel[] = [];
  protected states: CatalogueModel[] = [];
  protected academicPeriods: CatalogueModel[] = [];
  protected types: CatalogueModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    protected messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private subjectsHttpService: SubjectsHttpService,
    protected curriculumService: CurriculumsService,
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.INSTITUTIONS, routerLink: [this.routesService.institutions]},
      {label: BreadcrumbEnum.CAREERS, routerLink: [this.routesService.careers]},
      {label: BreadcrumbEnum.CURRICULUMS, routerLink: [this.routesService.curriculums]},
      {label: BreadcrumbEnum.SUBJECTS, routerLink: [this.routesService.subjects]},
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
      return await this.messageService
        .questionOnExit()
        .then((result) => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {
    this.loadAcademicPeriods();
    this.loadStates();
    this.loadTypes();

    if (this.id) {
      this.get();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      autonomousHour: [null, [Validators.required]],
      code: [null, [Validators.required]],
      credits: [null, [Validators.required]],
      isVisible: [true, [Validators.required]],
      name: [null, [Validators.required]],
      practicalHour: [null, [Validators.required]],
      scale: [null, [Validators.required, Validators.maxLength(1)]],
      teacherHour: [null, [Validators.required]],
      academicPeriod: [null, [Validators.required]],
      state: [null, [Validators.required]],
      type: [null, [Validators.required]],
      curriculum: [this.curriculumService.curriculum, [Validators.required]],
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
      this.messageService.errorsFields();
    }
  }

  back(): void {
    this.router.navigate([this.routesService.subjects]);
  }

  /** Actions **/
  create(item: SubjectModel): void {
    this.subjectsHttpService.create(item).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  update(item: SubjectModel): void {
    this.subjectsHttpService.update(this.id!, item).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  /** Load Data **/
  get(): void {
    this.subjectsHttpService.findOne(this.id!).subscribe((item) => {
      this.form.patchValue(item);
    });
  }

  loadAcademicPeriods(): void {
    this.cataloguesHttpService
      .catalogue(CatalogueCoreTypeEnum.ACADEMIC_PERIOD)
      .subscribe((items) => (this.academicPeriods = items));
  }

  loadStates(): void {
    this.cataloguesHttpService
      .catalogue(CatalogueCoreTypeEnum.SUBJECTS_STATE)
      .subscribe((items) => (this.states = items));
  }

  loadTypes(): void {
    this.cataloguesHttpService
      .catalogue(CatalogueCoreTypeEnum.REGISTRATION_TYPE)
      .subscribe((items) => (this.types = items));
  }


  /** Form Getters **/
  get autonomousHourField(): AbstractControl {
    return this.form.controls['autonomousHour'];
  }

  get codeField(): AbstractControl {
    return this.form.controls['code'];
  }

  get isVisibleField(): AbstractControl {
    return this.form.controls['isVisible'];
  }

  get creditsField(): AbstractControl {
    return this.form.controls['credits'];
  }

  get nameField(): AbstractControl {
    return this.form.controls['name'];
  }

  get practicalHourField(): AbstractControl {
    return this.form.controls['practicalHour'];
  }

  get scaleField(): AbstractControl {
    return this.form.controls['scale'];
  }

  get teacherHourField(): AbstractControl {
    return this.form.controls['teacherHour'];
  }

  get academicPeriodField(): AbstractControl {
    return this.form.controls['academicPeriod'];
  }

  get stateField(): AbstractControl {
    return this.form.controls['state'];
  }

  get typeField(): AbstractControl {
    return this.form.controls['type'];
  }

  get curriculumField(): AbstractControl {
    return this.form.controls['curriculum'];
  }
}
