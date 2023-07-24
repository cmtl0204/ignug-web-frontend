import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PrimeIcons} from "primeng/api";
import {OnExitInterface} from "@shared/interfaces";
import {CatalogueModel, EventModel} from "@models/core";
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  EventsHttpService, EventsService,
  MessageService,
  RoutesService
} from "@services/core";
import {CatalogueCoreTypeEnum} from "@shared/enums";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit, OnExitInterface {
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
    private eventsHttpService: EventsHttpService,
    private eventsService: EventsService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Eventos', routerLink: [this.routesService.events]},
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
      name: [null, [Validators.required]],
      schoolPeriod: [null, []],
      isVisible: [true, [Validators.required]],
      state: [null, [Validators.required]],
      description: [null, [Validators.required]],
      startedAt: [null, [Validators.required]],
      endedAt: [null, [Validators.required]],
      order: [null, [Validators.required]],
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
    this.router.navigate([this.routesService.events]);
  }

  /** Actions **/
  create(item: EventModel): void {
    this.eventsHttpService.create(this.eventsService.model.entity.id, item).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  update(item: EventModel): void {
    this.eventsHttpService.update(this.id!, item).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  /** Load Data **/
  get(): void {
    this.eventsHttpService.findOne(this.id!).subscribe((item) => {
      this.form.patchValue(item);
    });
  }

  loadStates(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.SCHOOL_TYPE).subscribe((items) => this.states = items);
  }

  /** Form Getters **/
  get isVisibleField(): AbstractControl {
    return this.form.controls['isVisible'];
  }

  get nameField(): AbstractControl {
    return this.form.controls['name'];
  }

  get schoolPeriodField(): AbstractControl {
    return this.form.controls['schoolPeriod'];
  }

  get descriptionField(): AbstractControl {
    return this.form.controls['description'];
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

  get orderField(): AbstractControl {
    return this.form.controls['order'];
  }
}
