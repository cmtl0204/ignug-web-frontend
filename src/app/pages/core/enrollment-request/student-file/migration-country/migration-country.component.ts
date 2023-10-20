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
  selector: 'app-migration-country',
  templateUrl: './migration-country.component.html',
  styleUrls: ['./migration-country.component.scss']
})
export class MigrationCountryComponent {
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;

  protected houseTypes: CatalogueModel[] = [];
  protected housingTypes: CatalogueModel[] = [];
  protected roofTypes: CatalogueModel[] = []
  protected floorTypes: CatalogueModel[] = [];
  protected wallTypes: CatalogueModel[] = [];
  protected waterTypes: CatalogueModel[] = []
  protected yesno: CatalogueModel[] = []
  protected isOutages: CatalogueModel[] = []
  protected receives: CatalogueModel[] = []

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
    this.loaddisabilityTypes();
    this.loadRoffTypes();
    this.loadRoffTypes();
    this.loadWallTypes();
    this.loadWaterTypes();
    this.loadYesNo();
    this.loadOutage();
    this.loadReceives();

  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      housingData: this.housingDataForm,
    });
  }

  get housingDataForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      houseType: [null, [Validators.required]],
      housingType:[null, [Validators.required]],
      roofType:[null, [Validators.required]],
      floorType: [null, [Validators.required]],
      wallType: [null, [Validators.required]],
      waterType: [null, [Validators.required]],
      isLigth: [null, [Validators.required]],
      isOutage: [null, [Validators.required]],
      isPhone:[null, [Validators.required]],
      isSewer:[null, [Validators.required]],
      haveTecnologic:[null, [Validators.required]],
      haveInternet:[null, [Validators.required]],
      receive:[null, [Validators.required]],
      receiveBond:[null, [Validators.required]],
    });
  }

  loadIsDisabilities(): void {
    this.houseTypes = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.YES_NO_NA
    );
  }

  loadYesNo(): void {
    this.yesno = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.YES_NO_NA
    );
  }

  loaddisabilityTypes(): void {
    this.housingTypes = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.DISABILITY_TYPE
    );
  }

  loadRoffTypes(): void {
    this.roofTypes = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.DISABILITY_TYPE
    );
  }

  loadFloorTypes(): void {
    this.floorTypes = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.DISABILITY_TYPE
    );
  }

  loadWallTypes(): void {
    this.wallTypes = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.DISABILITY_TYPE
    );
  }

  loadWaterTypes(): void {
    this.waterTypes = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.DISABILITY_TYPE
    );
  }

  loadOutage(): void {
    this.isOutages = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.DISABILITY_TYPE
    );
  }

  loadReceives(): void {
    this.receives = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.DISABILITY_TYPE
    );
  }

  get housingDataField(): FormGroup {
    return this.form.controls['housingData'] as FormGroup;
  }

  get houseTypeField(): AbstractControl {
    return this.housingDataField.controls['houseType'];
  }

  get housingTypeField(): AbstractControl {
    return this.housingDataField.controls['housingType'];
  }

  get roofTypeField(): AbstractControl {
    return this.housingDataField.controls['roofType'];
  }

  get floorTypeField(): AbstractControl {
    return this.housingDataField.controls['floorType'];
  }
  
  get wallTypeField(): AbstractControl {
    return this.housingDataField.controls['wallType'];
  }

  get waterTypeField(): AbstractControl {
    return this.housingDataField.controls['waterType'];
  }

  get isLigthField(): AbstractControl {
    return this.housingDataField.controls['isLigth'];
  }

  get isOutageField(): AbstractControl {
    return this.housingDataField.controls['isOutage'];
  }

  get isPhoneField(): AbstractControl {
    return this.housingDataField.controls['isPhone'];
  }
  
  get isSewerField(): AbstractControl {
    return this.housingDataField.controls['isSewer'];
  }

  get haveTecnologicField(): AbstractControl {
    return this.housingDataField.controls['haveTecnologic'];
  }

  get haveInternetField(): AbstractControl {
    return this.housingDataField.controls['haveInternet'];
  }

  get receiveField(): AbstractControl {
    return this.housingDataField.controls['receive'];
  }

  get receiveBondField(): AbstractControl {
    return this.housingDataField.controls['receiveBond'];
  }
}
