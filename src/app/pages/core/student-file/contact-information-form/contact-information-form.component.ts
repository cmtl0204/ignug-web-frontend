import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PrimeIcons, MenuItem} from "primeng/api";
import {OnExitInterface} from "@shared/interfaces";
import {CatalogueModel, StudentModel} from "@models/core";
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  MessageService,
  RoutesService,
  StudentsHttpService
} from "@services/core";
import {BreadcrumbEnum, CatalogueCoreTypeEnum, SkeletonEnum} from '@shared/enums';

@Component({
  selector: 'app-contact-information-form',
  templateUrl: './contact-information-form.component.html',
  styleUrls: ['./contact-information-form.component.scss']
})
export class ContactInformationFormComponent {
  protected isDisabilities: CatalogueModel[] = [];
  protected disabilityTypes: CatalogueModel[] = [];
  
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;

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
      {label: BreadcrumbEnum.STUDENTS, routerLink: [this.routesService.students]},
      {label: BreadcrumbEnum.FORM},
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
      address: [null, [Validators.required]],
      countryNationality: [null, [Validators.required]],
      provinceNationality: [null, [Validators.required]],
      cantonNationality: [null, [Validators.required]],
      postalCode: [null, [Validators.required]],
      country: [null, [Validators.required]],
      province: [null, [Validators.required]],
      canton: [null, [Validators.required]],
      email: [null, [Validators.required]],
      personalEmail: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      landinPhone: [null, [Validators.required]],
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

  get contactField(): FormGroup {
    return this.form.controls['informationStudent'] as FormGroup;
  }

  get countryNationalityField(): AbstractControl {
    return this.contactField.controls['countryNationality'];
  }

  get provinceNationalityField(): AbstractControl {
    return this.contactField.controls['provinceNationality'];
  }

  get cantonNationalityField(): AbstractControl {
    return this.contactField.controls['cantonNationality'];
  }

  get addressField(): AbstractControl {
    return this.contactField.controls['address'];
  }

  get postalCodeField(): AbstractControl {
    return this.contactField.controls['postalCode'];
  }

  get countryField(): AbstractControl {
    return this.contactField.controls['country'];
  }

  get provinceField(): AbstractControl {
    return this.contactField.controls['province'];
  }

  get cantonField(): AbstractControl {
    return this.contactField.controls['canton'];
  }

  get emailField(): AbstractControl {
    return this.contactField.controls['email'];
  }

  get personalEmailField(): AbstractControl {
    return this.contactField.controls['personalEmail'];
  }

  get phoneField(): AbstractControl {
    return this.contactField.controls['phone'];
  }

  get landinPhoneField(): AbstractControl {
    return this.contactField.controls['landinPhone'];
  }

  get isDisabilityField(): AbstractControl {
    return this.contactField.controls['isDisability'];
  }

  get disabilityPercentageField(): AbstractControl {
    return this.contactField.controls['disabilityPercentage'];
  }

  get disabilityTypeField(): AbstractControl {
    return this.contactField.controls['disabilityType'];
  }

  get carnetField(): AbstractControl {
    return this.contactField.controls['carnet'];
  }
  
  get contactEmergencyNameField(): AbstractControl {
    return this.contactField.controls['contactEmergencyName'];
  }

  get contactEmergencyKinshipField(): AbstractControl {
    return this.contactField.controls['contactEmergencyKinship'];
  }

  get contactEmergencyPhoneField(): AbstractControl {
    return this.contactField.controls['contactEmergencyPhone'];
  }
}
