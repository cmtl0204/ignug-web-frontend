import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { OnExitInterface } from '@shared/interfaces';
import { CatalogueModel, StudentModel } from '@models/core';
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  MessageService,
  RoutesService,
  StudentsHttpService,
} from '@services/core';
import {
  BreadcrumbEnum,
  CatalogueCoreTypeEnum,
  SkeletonEnum,
} from '@shared/enums';

@Component({
  selector: 'app-place-origin',
  templateUrl: './place-origin.component.html',
  styleUrls: ['./place-origin.component.scss']
})
export class PlaceOriginComponent {
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;

  protected isDisabilities: CatalogueModel[] = [];
  protected disabilityTypes: CatalogueModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    protected messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private studentsHttpService: StudentsHttpService
  ) {
    this.breadcrumbService.setItems([
      {
        label: BreadcrumbEnum.STUDENTS,
        routerLink: [this.routesService.students],
      },
      { label: BreadcrumbEnum.FORM },
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
    }

    this.form = this.newForm;
  }

  ngOnInit(): void {
    this.loadIsDisabilities();
    this.loaddisabilityTypes()
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      placeOrigin: this.placeOriginForm,
    });
  }

  get placeOriginForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      address: [null, [Validators.required]],
      province:[null, [Validators.required]],
    });
  }

  loadIsDisabilities(): void {
    this.isDisabilities = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.YES_NO_NA
    );
  }

  loaddisabilityTypes(): void {
    this.disabilityTypes = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.DISABILITY_TYPE
    );
  }

  get placeOriginField(): FormGroup {
    return this.form.controls['placeOrigin'] as FormGroup;
  }

  get addressField(): AbstractControl {
    return this.placeOriginField.controls['address'];
  }

  get provinceField(): AbstractControl {
    return this.placeOriginField.controls['province'];
  }

}
