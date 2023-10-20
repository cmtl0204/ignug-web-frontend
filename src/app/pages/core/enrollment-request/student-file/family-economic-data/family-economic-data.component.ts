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
  selector: 'app-family-economic-data',
  templateUrl: './family-economic-data.component.html',
  styleUrls: ['./family-economic-data.component.scss']
})
export class FamilyEconomicDataComponent {
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;

  protected yesno: CatalogueModel[] = [];
  protected houses: CatalogueModel[] = [];

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
      FamilyData: this.FamilyDataForm,
    });
  }

  get FamilyDataForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      isCar: [null, [Validators.required]],
      anotherHouse:[null, [Validators.required]],
      house:[null, [Validators.required]],
    });
  }

  loadIsDisabilities(): void {
    this.yesno = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.YES_NO_NA
    );
  }

  loaddisabilityTypes(): void {
    this.houses = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.DISABILITY_TYPE
    );
  }

  get FamilyDataField(): FormGroup {
    return this.form.controls['FamilyData'] as FormGroup;
  }

  get isCarField(): AbstractControl {
    return this.FamilyDataField.controls['isCar'];
  }

  get anotherHouseField(): AbstractControl {
    return this.FamilyDataField.controls['anotherHouse'];
  }

  get houseField(): AbstractControl {
    return this.FamilyDataField.controls['house'];
  }
}
