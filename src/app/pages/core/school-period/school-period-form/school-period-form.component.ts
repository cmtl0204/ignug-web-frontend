import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PrimeIcons} from "primeng/api";
import {OnExitInterface} from "@shared/interfaces";
import {CatalogueModel, CreateSchoolPeriodDto, UpdateSchoolPeriodDto} from "@models/core";
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  MessageService,
  RoutesService,
  SchoolPeriodsHttpService
} from "@services/core";

@Component({
  selector: 'app-school-period-form',
  templateUrl: './school-period-form.component.html',
  styleUrls: ['./school-period-form.component.scss']
})
export class SchoolPeriodFormComponent implements OnInit, OnExitInterface {
  protected readonly PrimeIcons = PrimeIcons;
  id: string = '';
  form: FormGroup;
  panelHeader: string = 'Crear';
  states: CatalogueModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private schoolPeriodsHttpService: SchoolPeriodsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Periodos Lectivos', routerLink: [this.routesService.schoolPeriods]},
      {label: 'Form'},
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
    this.loadStates();

    if (this.id != '') {
      this.getItem();
    }
  }

  get newForm(): FormGroup {
    const currentDate = new Date();
    return this.formBuilder.group({
      code: [null, [Validators.required]],
      codeSniese: [null, []],
      isVisible: [true, [Validators.required]],
      name: [null, [Validators.required]],
      shortName: [null, [Validators.required]],
      state: [null, [Validators.required]],
      startedAt: [currentDate, [Validators.required]],
      endedAt: [currentDate, [Validators.required]],
      ordinaryStartedAt: [currentDate, [Validators.required]],
      ordinaryEndedAt: [currentDate, [Validators.required]],
      extraOrdinaryStartedAt: [currentDate, [Validators.required]],
      extraOrdinaryEndedAt: [currentDate, [Validators.required]],
      especialStartedAt: [currentDate, [Validators.required]],
      especialEndedAt: [currentDate, [Validators.required]],
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
    this.router.navigate([this.routesService.schoolPeriods]);
  }

  create(item: CreateSchoolPeriodDto): void {
    this.schoolPeriodsHttpService.create(item).subscribe(item => {
      this.form.reset(item);
      this.back();
    });
  }

  loadStates(): void {
    this.cataloguesHttpService.findAll().subscribe((items) => this.states = items);
  }

  getItem(): void {
    this.schoolPeriodsHttpService.findOne(this.id).subscribe((item) => {
      this.form.patchValue(item);
    });
  }

  update(item: UpdateSchoolPeriodDto): void {
    this.schoolPeriodsHttpService.update(this.id, item).subscribe((item) => {
      this.form.reset(item);
      this.back();
    });
  }

  get codeField(): AbstractControl {
    return this.form.controls['code'];
  }

  get codeSnieseField(): AbstractControl {
    return this.form.controls['codeSniese'];
  }

  get isVisibleField(): AbstractControl {
    return this.form.controls['isVisible'];
  }

  get nameField(): AbstractControl {
    return this.form.controls['name'];
  }

  get shortNameField(): AbstractControl {
    return this.form.controls['shortName'];
  }

  get stateField(): AbstractControl {
    return this.form.controls['state'];
  }

  get startedAtField(): AbstractControl {
    return this.form.controls['startedAt'];
  }

  get endedAtField(): AbstractControl {
    return this.form.controls['endedAt'];
  }

  get ordinaryStartedAtField(): AbstractControl {
    return this.form.controls['ordinaryStartedAt'];
  }

  get ordinaryEndedAtField(): AbstractControl {
    return this.form.controls['ordinaryEndedAt'];
  }

  get extraOrdinaryStartedAtField(): AbstractControl {
    return this.form.controls['extraOrdinaryStartedAt'];
  }

  get extraOrdinaryEndedAtField(): AbstractControl {
    return this.form.controls['extraOrdinaryEndedAt'];
  }

  get especialStartedAtField(): AbstractControl {
    return this.form.controls['especialStartedAt'];
  }

  get especialEndedAtField(): AbstractControl {
    return this.form.controls['especialEndedAt'];
  }
}
