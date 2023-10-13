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
      informationStudent: this.informationStudentForm,
    });
  }

  get informationStudentForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      isDisability: [null, [Validators.required]],
      disabilityPercentage:[null, [Validators.required]],
      disabilityType:[null, [Validators.required]],
      carnet: [null, [Validators.required]],
      contactEmergencyName: [null, [Validators.required]],
      contactEmergencyKinship: [null, [Validators.required]],
      contactEmergencyPhone: [null, [Validators.required, Validators.pattern(/^09\d{8}$/)]],
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

  get aditionalField(): FormGroup {
    return this.form.controls['informationStudent'] as FormGroup;
  }

  get isDisabilityField(): AbstractControl {
    return this.aditionalField.controls['isDisability'];
  }

  get disabilityPercentageField(): AbstractControl {
    return this.aditionalField.controls['disabilityPercentage'];
  }

  get disabilityTypeField(): AbstractControl {
    return this.aditionalField.controls['disabilityType'];
  }

  get carnetField(): AbstractControl {
    return this.aditionalField.controls['carnet'];
  }
  
  get contactEmergencyNameField(): AbstractControl {
    return this.aditionalField.controls['contactEmergencyName'];
  }

  get contactEmergencyKinshipField(): AbstractControl {
    return this.aditionalField.controls['contactEmergencyKinship'];
  }

  get contactEmergencyPhoneField(): AbstractControl {
    return this.aditionalField.controls['contactEmergencyPhone'];
  }

}
