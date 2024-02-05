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
  FilesHttpService,
  MessageService,
  RoutesService,
  SchoolPeriodsHttpService
} from "@services/core";
import {BreadcrumbEnum, CatalogueTypeEnum, SkeletonEnum,SchoolPeriodFormEnum} from "@shared/enums";
import {isAfter} from "date-fns";

@Component({
  selector: 'app-school-period-form',
  templateUrl: './school-period-form.component.html',
  styleUrls: ['./school-period-form.component.scss']
})
export class SchoolPeriodFormComponent implements OnInit, OnExitInterface {
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected id: string | null = null;
  protected form: FormGroup;
  protected startedAt: Date = new Date();
  protected ordinaryStartedAt: Date = new Date();
  protected extraOrdinaryStartedAt: Date = new Date();
  protected especialStartedAt: Date = new Date();
  protected formErrors: string[] = [];
  protected readonly SchoolPeriodFormEnum = SchoolPeriodFormEnum;
  // Foreign Keys
  protected states: CatalogueModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private filesHttpService: FilesHttpService,
    private formBuilder: FormBuilder,
    protected messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private schoolPeriodsHttpService: SchoolPeriodsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.SCHOOL_PERIODS, routerLink: [this.routesService.schoolPeriods]},
      {label: BreadcrumbEnum.FORM},
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
    }

    this.form = this.newForm;
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched && this.form.dirty) {
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
    if (this.validateForm()) {
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
    this.states = this.cataloguesHttpService.findByType(CatalogueTypeEnum.SCHOOL_PERIODS_STATE);
  }

    /** Validations **/
    validateForm() {
      this.formErrors = [];
      if (this.codeField.errors) this.formErrors.push(SchoolPeriodFormEnum.code);
      if (this.codeSnieseField.errors) this.formErrors.push(SchoolPeriodFormEnum.codeSniese);
      if (this.nameField.errors) this.formErrors.push(SchoolPeriodFormEnum.name);
      if (this.shortNameField.errors) this.formErrors.push(SchoolPeriodFormEnum.shortName);
      if (this.startedAtField.errors) this.formErrors.push(SchoolPeriodFormEnum.startedAt);
      if (this.endedAtField.errors) this.formErrors.push(SchoolPeriodFormEnum.endedAt);
      if (this.ordinaryStartedAtField.errors) this.formErrors.push(SchoolPeriodFormEnum.ordinaryStartedAt);
      if (this.ordinaryEndedAtField.errors) this.formErrors.push(SchoolPeriodFormEnum.ordinaryEndedAt);
      if (this.extraOrdinaryStartedAtField.errors) this.formErrors.push(SchoolPeriodFormEnum.extraOrdinaryStartedAt);
      if (this.extraOrdinaryEndedAtField.errors) this.formErrors.push(SchoolPeriodFormEnum.extraOrdinaryEndedAt);
      if (this.especialEndedAtField.errors) this.formErrors.push(SchoolPeriodFormEnum.especialStartedAt);if (this.especialStartedAtField.errors) this.formErrors.push(SchoolPeriodFormEnum.especialEndedAt);
      //if (this.especialStartedAt.errors) this.formErrors.push('Estado');
      //if (this.webField.errors) this.formErrors.push(SchoolPeriodFormEnum.web);
        this.formErrors.sort();
      return this.formErrors.length === 0 && this.form.valid;
    }

  /** Form Getters **/
  get acronymField(): AbstractControl {
    return this.form.controls['acronym'];
  }
  get cellphoneField(): AbstractControl {
    return this.form.controls['cellphone'];
  }
  get denominationField(): AbstractControl {
    return this.form.controls['denomination'];
  }
  get emailField(): AbstractControl {
    return this.form.controls['email'];
  }
  get logoField(): AbstractControl {
    return this.form.controls['logo'];
  }

  get codeField(): AbstractControl {
    return this.form.controls['code'];
  }
  get phoneField(): AbstractControl {
    return this.form.controls['phone'];
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
  get sloganField(): AbstractControl {
    return this.form.controls['slogan'];
  }

  get stateField(): AbstractControl {
    return this.form.controls['state'];
  }
  get webField(): AbstractControl {
    return this.form.controls['web'];
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
