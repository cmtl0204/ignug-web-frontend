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
  selector: 'app-curriculum-form',
  templateUrl: './curriculum-form.component.html',
  styleUrls: ['./curriculum-form.component.scss']
})
export class CurriculumFormComponent implements OnInit, OnExitInterface {
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;
  protected panelHeader: string = 'Crear';

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
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      code: [null, [Validators.required, Validators.email]],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      resolutionNumber: [{value: null, disabled: true}, [Validators.required, Validators.minLength(8)]],
      periodicAcademicNumber: [{value: true, disabled: true}],
      weeksNumber: [null, [Validators.required]],
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
    return this.form.controls['name'];
  }

  get isVisibleField(): AbstractControl {
    return this.form.controls['description'];
  }

  get nameField(): AbstractControl {
    return this.form.controls['resolutionNumber'];
  }

  get shortNameField(): AbstractControl {
    return this.form.controls['periodicAcademicNumber'];
  }

  get stateField(): AbstractControl {
    return this.form.controls['weeksNumber'];
  }
}
