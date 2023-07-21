import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PrimeIcons} from "primeng/api";
import {OnExitInterface} from "@shared/interfaces";
import {CatalogueModel, SchoolPeriodModel} from "@models/core";
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  MessageService,
  RoutesService,
  SchoolPeriodsHttpService
} from "@services/core";
import {CatalogueCoreTypeEnum} from "@shared/enums";
import {isAfter, isBefore} from "date-fns";

@Component({
  selector: 'app-event-form',
  templateUrl: './school-period-form.component.html',
  styleUrls: ['./school-period-form.component.scss']
})
export class SchoolPeriodFormComponent implements OnInit, OnExitInterface {
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;
  protected panelHeader: string = 'Crear';
  protected startedAt: Date = new Date();
  protected ordinaryStartedAt: Date = new Date();
  protected extraOrdinaryStartedAt: Date = new Date();
  protected especialStartedAt: Date = new Date();

  // Foreign Keys
  protected states: CatalogueModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    protected messageService: MessageService,
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

    if (this.id) {
      this.get();
    }

    this.startedAtField.valueChanges.subscribe(value => {
      this.startedAt = new Date(value);
      if (isAfter(this.startedAt, new Date(this.endedAtField.value))) {
        this.endedAtField.setValue(this.startedAt);
      }
    });

    this.ordinaryStartedAtField.valueChanges.subscribe(value => {
      this.ordinaryStartedAt = new Date(value);
      if (isAfter(this.ordinaryStartedAt, new Date(this.ordinaryEndedAtField.value))) {
        this.ordinaryEndedAtField.setValue(this.ordinaryStartedAt);
      }
    });

    this.extraOrdinaryStartedAtField.valueChanges.subscribe(value => {
      this.extraOrdinaryStartedAt = new Date(value);
      if (isAfter(this.extraOrdinaryStartedAt, new Date(this.extraOrdinaryEndedAtField.value))) {
        this.extraOrdinaryEndedAtField.setValue(this.extraOrdinaryStartedAt);
      }
    });

    this.especialStartedAtField.valueChanges.subscribe(value => {
      this.especialStartedAt = new Date(value);
      if (isAfter(this.especialStartedAt, new Date(this.especialEndedAtField.value))) {
        this.especialEndedAtField.setValue(this.especialStartedAt);
      }
    });
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      code: [null, [Validators.required]],
      codeSniese: [null, []],
      isVisible: [true, [Validators.required]],
      name: [null, [Validators.required]],
      shortName: [null, [Validators.required]],
      state: [null, [Validators.required]],
      startedAt: [null, [Validators.required]],
      endedAt: [null, [Validators.required]],
      ordinaryStartedAt: [null, [Validators.required]],
      ordinaryEndedAt: [null, [Validators.required]],
      extraOrdinaryStartedAt: [null, [Validators.required]],
      extraOrdinaryEndedAt: [null, [Validators.required]],
      especialStartedAt: [null, [Validators.required]],
      especialEndedAt: [null, [Validators.required]],
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
    this.router.navigate([this.routesService.schoolPeriods]);
  }

  /** Actions **/
  create(item: SchoolPeriodModel): void {
    this.schoolPeriodsHttpService.create(item).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  update(item: SchoolPeriodModel): void {
    this.schoolPeriodsHttpService.update(this.id!, item).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  /** Load Data **/
  get(): void {
    this.schoolPeriodsHttpService.findOne(this.id!).subscribe((item) => {
      this.form.patchValue(item);
    });
  }

  loadStates(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.SCHOOL_PERIOD_STATE).subscribe((items) => this.states = items);
  }

  /** Form Getters **/
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
