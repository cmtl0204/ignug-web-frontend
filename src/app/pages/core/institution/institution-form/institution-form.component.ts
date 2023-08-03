import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PrimeIcons} from "primeng/api";
import {OnExitInterface} from "@shared/interfaces";
import {CatalogueModel, InstitutionModel} from "@models/core";
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  MessageService,
  RoutesService,
  InstitutionsHttpService
} from "@services/core";
import {BreadcrumbEnum, CatalogueCoreTypeEnum, SkeletonEnum} from "@shared/enums";

@Component({
  selector: 'app-institution-form',
  templateUrl: './institution-form.component.html',
  styleUrls: ['./institution-form.component.scss']
})
export class InstitutionFormComponent implements OnInit, OnExitInterface {
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
    private institutionsHttpService: InstitutionsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.INSTITUTIONS, routerLink: [this.routesService.institutions]},
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
    this.loadStates();

    if (this.id) {
      this.get();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      acronym: [null, [Validators.required]],
      cellphone: [null, [Validators.required]],
      code: [null, [Validators.required]],
      codeSniese: [null, []],
      denomination: [null, [Validators.required]],
      email: [null,[Validators.required, Validators.email]],
      isVisible: [true, [Validators.required]],
      logo: [null, [Validators.required]],
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      shortName: [null, [Validators.required]],
      slogan: [null, [Validators.required]],
      state: [null, [Validators.required]],
      web: [null, [Validators.required]],
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
    this.router.navigate([this.routesService.institutions]);
  }

  /** Actions **/
  create(item: InstitutionModel): void {
    this.institutionsHttpService.create(item).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  update(item: InstitutionModel): void {
    this.institutionsHttpService.update(this.id!, item).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  /** Load Data **/
  get(): void {
    this.institutionsHttpService.findOne(this.id!).subscribe((item) => {
      this.form.patchValue(item);
    });
  }

  loadStates(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.INSTITUTIONS_STATE).subscribe((items) => this.states = items);
  }

  /** Form Getters **/
  get acronymField(): AbstractControl {
    return this.form.controls['acronym'];
  }

  get cellphoneField(): AbstractControl {
    return this.form.controls['cellphone'];
  }

  get codeField(): AbstractControl {
    return this.form.controls['code'];
  }

  get codeSnieseField(): AbstractControl {
    return this.form.controls['codeSniese'];
  }

  get denominationField(): AbstractControl {
    return this.form.controls['denomination'];
  }

  get emailField(): AbstractControl {
    return this.form.controls['email'];
  }

  get isVisibleField(): AbstractControl {
    return this.form.controls['isVisible'];
  }

  get logoField(): AbstractControl {
    return this.form.controls['logo'];
  }

  get nameField(): AbstractControl {
    return this.form.controls['name'];
  }

  get phoneField(): AbstractControl {
    return this.form.controls['phone'];
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

  protected readonly SkeletonEnum = SkeletonEnum;
}
