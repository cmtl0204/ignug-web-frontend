import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { OnExitInterface } from '@shared/interfaces';
import { CatalogueModel, SubjectModel } from '@models/core';
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  MessageService,
  RoutesService,
  SubjectsHttpService,
} from '@services/core';
import { CatalogueCoreTypeEnum } from '@shared/enums';

@Component({
  selector: 'app-event-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss'],
})
export class SubjectFormComponent implements OnInit, OnExitInterface {
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;
  protected panelHeader: string = 'Crear';

  // Foreign Keys
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
    private subjectsHttpService: SubjectsHttpService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Asignaturas', routerLink: [this.routesService.subjects] },
      { label: 'Form' },
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
    this.loadStates();
    this.loadAcademicPeriods();
    this.loadTypes();

    if (this.id) {
      this.get();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      autonomousHour: [null, [Validators.required]],
      code: [null, []],
      credits: [null, []],
      isVisible: [true, []],
      name: [null, [Validators.required]],
      practicalHour: [null, [Validators.required]],
      scale: [null, [Validators.required]],
      teacherHour: [null, [Validators.required]],
      academicPeriod: [null, []],
      state: [null, []],
      type: [null, []],
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
      this.messageService.errorsFields.then();
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

  loadStates(): void {
    this.cataloguesHttpService
      .catalogue(CatalogueCoreTypeEnum.SCHOOL_PERIOD_STATE)
      .subscribe((items) => (this.states = items));
  }

  loadAcademicPeriods(): void {
    this.cataloguesHttpService
      .catalogue(CatalogueCoreTypeEnum.ACADEMIC_PERIOD)
      .subscribe((items) => (this.academicPeriods = items));
  }

  loadTypes(): void {
    this.cataloguesHttpService
      .catalogue(CatalogueCoreTypeEnum.REGISTRATION_TYPE )
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
}
