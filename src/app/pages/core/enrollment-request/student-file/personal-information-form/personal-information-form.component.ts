import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueModel } from '@models/core';
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  RoutesService,
  StudentsHttpService,
} from '@services/core';
import { MessageService, PrimeIcons } from 'primeng/api';
import {
  BreadcrumbEnum,
  CatalogueCoreTypeEnum,
  SkeletonEnum,
} from '@shared/enums';

@Component({
  selector: 'app-personal-information-form',
  templateUrl: './personal-information-form.component.html',
  styleUrls: ['./personal-information-form.component.scss'],
})
export class PersonalInformationFormComponent implements OnInit {
  protected form: FormGroup;
  protected id: string | null = null;
  protected readonly PrimeIcons = PrimeIcons;

  protected doStudents: CatalogueModel[] = [];
  protected doEs: CatalogueModel[] = [];
  protected forStudents: CatalogueModel[] = [];
  protected identificationTypes: CatalogueModel[] = [];
  protected bloodTypes: CatalogueModel[] = [];
  protected ethnicOrigins: CatalogueModel[] = [];
  protected genders: CatalogueModel[] = [];
  protected sexes: CatalogueModel[] = [];
  protected cicilStates: CatalogueModel[] = [];
  protected isDisabilities: CatalogueModel[] = [];
  protected disabilityTypes: CatalogueModel[] = [];
  protected nationalityAUs: CatalogueModel[] = [];
  protected contactEmergencyKinships: CatalogueModel[] = []
  protected yesno: CatalogueModel[] = [];
  protected manyChils: CatalogueModel[] = [];
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
        label: BreadcrumbEnum.STUDENT_FILE,
        routerLink: [this.routesService.studentFile],
      },
      { label: BreadcrumbEnum.FORM },
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
    }

    this.form = this.newForm;
  }

  ngOnInit(): void {
    if (this.id) {
      this.get();
    }

    this.loadBloodTypes();
    this.loadcicilStates();
    this.loadEthnicOrigins();
    this.loadGenders();
    this.loadSexes();
    this.loadIdentificationTypes();
    this.inputDisabled();
    this.loadDoStudents();
    this.loadForStudents();
    this.loadIsDisabilities();
    this.loaddisabilityTypes();
    this.validation();
    this.loadNationality();
    this.loadYesNo();
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      informationStudent: this.informationStudentForm,
      user: this.userForm,
    });
  }

  get informationStudentForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      address: [null, [Validators.required]],
      affiliation:[null, [Validators.required]],
      countryNationality: [null, [Validators.required]],
      provinceNationality: [null, [Validators.required]],
      cantonNationality: [null, [Validators.required]],
      childrens:[null, [Validators.required]],
      postalCode: [null, [Validators.required]],
      country: [null, [Validators.required]],
      province: [null, [Validators.required]],
      houseHead: [null, [Validators.required]],
      healthInsurance:[null, [Validators.required]],
      charge:[null],
      email: [null, [Validators.required]],
      personalEmail: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      landinPhone: [null, [Validators.required]],
      carnet: [null, [Validators.required]],
      contactEmergencyKinship: [null, [Validators.required]],
      contactEmergencyPhone: [
        null,
        [Validators.required],
      ],
      doStudent: [null, [Validators.required]],
      nameE: [null],
      manyChil:[null],
      doE: [null],
      isDisability: [null, [Validators.required]],
      disabilityPercentage: [null],
      disabilityType: [null],
    });
  }

  get userForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      ancesLanguage: [null],
      birthdate: [null, [Validators.required]],
      cicilState: [null, [Validators.required]],
      identificationType: [null, [Validators.required]],
      identification: [
        null,
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      lastname: [null, [Validators.required]],
      name: [null, [Validators.required]],
      nationality: [null, [Validators.required]],
      nationalityAU: [null],
      bloodType: [null, [Validators.required]],
      ethnicOrigin: [null, [Validators.required]],
      townAu: [null],
      gender: [null, [Validators.required]],
      sex: [null, [Validators.required]],
    });
  }

  validation() {
    this.isDisabilityField.valueChanges.subscribe((value) => {
      if (value.code === '1') {
      }
    });
  }

  get(): void {
    this.studentsHttpService.findOne(this.id!).subscribe((student) => {
      this.form.patchValue(student);
    });
  }

  loadBloodTypes(): void {
    this.bloodTypes = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.BLOOD_TYPE
    );
  }

  loadEthnicOrigins(): void {
    this.ethnicOrigins = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.ETHNIC_ORIGIN
    );
  }

  loadGenders(): void {
    this.genders = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.GENDER
    );
  }

  loadSexes(): void {
    this.sexes = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.SEX
    );
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
  loadIdentificationTypes(): void {
    this.identificationTypes = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.IDENTIFICATION_TYPE
    );
  }

  loadcicilStates(): void {
    this.cicilStates = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.MARITAL_STATUS
    );
  }

  loadDoStudents(): void {
    this.doStudents = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.STUDENT_OCCUPATION
    );
  }

  loadForStudents(): void {
    this.forStudents = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.STUDENT_INCOME_FOR
    );
  }

  loadNationality() {
    this.nationalityAUs = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.YES_NO
    );
  }

  loadYesNo(){
    this.yesno = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.YES_NO);
  }

  get contactField(): FormGroup {
    return this.form.controls['informationStudent'] as FormGroup;
  }

  get affiliationField(): AbstractControl {
    return this.contactField.controls['affiliation'];
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

  get countryNationalityField(): AbstractControl {
    return this.contactField.controls['countryNationality'];
  }

  get chargeField(): AbstractControl {
    return this.contactField.controls['charge'];
  }

  get childrensField(): AbstractControl {
    return this.contactField.controls['childrens'];
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

  get houseHeadField(): AbstractControl {
    return this.contactField.controls['houseHead'];
  }

  get healthInsuranceField(): AbstractControl {
    return this.contactField.controls['healthInsurance'];
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

  get doStudentField(): AbstractControl {
    return this.contactField.controls['doStudent'];
  }

  get nameEField(): AbstractControl {
    return this.contactField.controls['nameE'];
  }

  get manyChilField(): AbstractControl {
    return this.contactField.controls['manyChil'];
  }

  get doEField(): AbstractControl {
    return this.contactField.controls['doE'];
  }

  get userField(): FormGroup {
    return this.form.controls['user'] as FormGroup;
  }

  get ancesLanguageField(): AbstractControl {
    return this.userField.controls['ancesLanguage'];
  }

  get birthdateField(): AbstractControl {
    return this.userField.controls['birthdate'];
  }

  get cicilStateField(): AbstractControl {
    return this.userField.controls['cicilState'];
  }

  get identificationTypeField(): AbstractControl {
    return this.userField.controls['identificationType'];
  }

  get lastnameField(): AbstractControl {
    return this.userField.controls['lastname'];
  }

  get nameField(): AbstractControl {
    return this.userField.controls['name'];
  }

  get nationalityField(): AbstractControl {
    return this.userField.controls['nationality'];
  }

  get nationalityAUField(): AbstractControl {
    return this.userField.controls['nationalityAU'];
  }

  get identificationField(): AbstractControl {
    return this.userField.controls['identification'];
  }

  get bloodTypeField(): AbstractControl {
    return this.userField.controls['bloodType'];
  }

  get ethnicOriginField(): AbstractControl {
    return this.userField.controls['ethnicOrigin'];
  }

  get townAuField(): AbstractControl {
    return this.userField.controls['townAu'];
  }

  get genderField(): AbstractControl {
    return this.userField.controls['gender'];
  }

  get sexField(): AbstractControl {
    return this.userField.controls['sex'];
  }

  inputDisabled() {}
}
