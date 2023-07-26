import {Component, OnInit} from '@angular/core';
import {AbstractControl, Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PrimeIcons} from "primeng/api";
import {OnExitInterface} from "@shared/interfaces";
import {CatalogueModel, InformationStudentModel, StudentModel} from "@models/core";
import {UserModel} from '@models/auth';
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  MessageService,
  RoutesService,
  StudentsHttpService
} from "@services/core";
import { CatalogueCoreTypeEnum } from '@shared/enums';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit, OnExitInterface {
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;
  protected panelHeader: string = 'Crear';

  // Foreign Keys
  protected isExecutedPractices: CatalogueModel[] = [];
  protected isExecutedCommunities: CatalogueModel[] = [];
  protected isDisabilities: CatalogueModel[] = [];
  protected isLostGratuities: CatalogueModel[] = [];
  protected isSubjectRepeats: CatalogueModel[] = [];
  protected bloodTypes: CatalogueModel[] = [];
  protected ethnicOrigins: CatalogueModel[] = [];
  protected genders: CatalogueModel[] = [];
  protected sexes: CatalogueModel[] = [];

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
      {label: 'Estudiantes', routerLink: [this.routesService.students]},
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

    if (this.id) {
      this.get();
    }

    this.loadBloodTypes();
    this.loadEthnicOrigins();
    this.loadGenders();
    this.loadSexes();
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      informationStudent: this.informationStudentForm,
      user: this.userForm
    });
  }

  get userForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      email: ['asd@gmail.com', [Validators.email]],
      birthdate: ['2023-01-01', []],
      identification: ['1234567890', []],
      lastname: ['tamayo', []],
      personalEmail: ['asd@asd.asd', []],
      phone: ['0987654623', []],
      name: ['cesar', []],
      username: ['cesar',[]],
      bloodType: [null, []],
      ethnicOrigin: [null, []],
      gender: [null, []],
      sex: [null, []]
    });
  }

  get informationStudentForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      isExecutedPractice: [null, []],
      isExecutedCommunity: [null, []],
      isDisability: [null, []],
      isLostGratuity: [null, []],
      isSubjectRepeat: [null, []],
      address: [null, []],
      community: [null, []],
      contactEmergencyName: [null, []],
      contactEmergencyKinship: [null, []],
      contactEmergencyPhone: [null, []],
      disabilityPercentage: [null, []],
      economicAmount: [null, []],
      educationalAmount: [null, []],
      familyIncome: [null, []],
      financingScholarshipType: [null, []],
      membersHouseNumber: [null, []],
      practiceHours: [null, []],
      postalCode: [null, []],
      scholarshipAmount: [null, []],
      tariffScholarshipPercentage: [null, []],
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
    this.router.navigate([this.routesService.students]);
  }

  /** Actions **/
  create(student: StudentModel): void {
    this.studentsHttpService.create(student).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  update(student: StudentModel): void {
    this.studentsHttpService.update(this.id!, student).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  /** Load Data **/
  get(): void {
    this.studentsHttpService.findOne(this.id!).subscribe((student) => {
      this.form.patchValue(student);
    });
  }

  loadBloodTypes(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.BLOOD_TYPE).subscribe((bloodTypes) => this.bloodTypes = bloodTypes);
  }

  loadEthnicOrigins(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.ETHNIC_ORIGIN).subscribe((ethnicOrigins) => this.ethnicOrigins = ethnicOrigins);
  }

  loadGenders(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.GENDER).subscribe((genders) => this.genders = genders);
  }

  loadSexes(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.SEX).subscribe((sexes) => this.sexes = sexes);
  }
  loadIsExecutedPractices(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.YES_NO_NA).subscribe((items) => this.sexes = items);
  }


  /** Form Getters **/
  /** Student Form **/
  get informationStudentField(): FormGroup {
    return this.form.controls['informationStudent'] as FormGroup;
  }

  get userField(): FormGroup {
    return this.form.controls['user'] as FormGroup;
  }

  /** User Form **/
  get emailField(): AbstractControl {
    return this.userField.controls['email'];
  }

  get birthdateField(): AbstractControl {
    return this.userField.controls['birthdate'];
  }

  get identificationField(): AbstractControl {
    return this.userField.controls['identification'];
  }

  get lastnameField(): AbstractControl {
    return this.userField.controls['lastname'];
  }

  get personalEmailField(): AbstractControl {
    return this.userField.controls['personalEmail'];
  }

  get phoneField(): AbstractControl {
    return this.userField.controls['phone'];
  }

  get nameField(): AbstractControl {
    return this.userField.controls['name'];
  }

  get usernameField(): AbstractControl {
    return this.userField.controls['username'];
  }

  get bloodTypeField(): AbstractControl {
    return this.userField.controls['bloodType'];
  }

  get ethnicOriginField(): AbstractControl {
    return this.userField.controls['ethnicOrigin'];
  }

  get genderField(): AbstractControl {
    return this.userField.controls['gender'];
  }

  get sexField(): AbstractControl {
    return this.userField.controls['sex'];
  }

  /** Information Student Form **/
  get addressField(): AbstractControl {
    return this.informationStudentField.controls['address'];
  }

  get isExecutedPracticeField(): AbstractControl {
    return this.informationStudentField.controls['isExecutedPractice'];
  }

  get isExecutedCommunityField(): AbstractControl {
    return this.informationStudentField.controls['isExecutedCommunity'];
  }

  get isDisabilityField(): AbstractControl {
    return this.informationStudentField.controls['isDisability'];
  }

  get isLostGratuityField(): AbstractControl {
    return this.informationStudentField.controls['isLostGratuity'];
  }

  get isSubjectRepeatField(): AbstractControl {
    return this.informationStudentField.controls['isSubjectRepeat'];
  }


  get communityField(): AbstractControl {
    return this.informationStudentField.controls['community'];
  }

  get contactEmergencyNameField(): AbstractControl {
    return this.informationStudentField.controls['contactEmergencyName'];
  }

  get contactEmergencyKinshipField(): AbstractControl {
    return this.informationStudentField.controls['contactEmergencyKinship'];
  }

  get contactEmergencyPhoneField(): AbstractControl {
    return this.informationStudentField.controls['contactEmergencyPhone'];
  }

  get disabilityPercentageField(): AbstractControl {
    return this.informationStudentField.controls['disabilityPercentage'];
  }

  get economicAmountField(): AbstractControl {
    return this.informationStudentField.controls['economicAmount'];
  }

  get educationalAmountField(): AbstractControl {
    return this.informationStudentField.controls['educationalAmount'];
  }

  get familyIncomeField(): AbstractControl {
    return this.informationStudentField.controls['familyIncome'];
  }

  get financingScholarshipTypeField(): AbstractControl {
    return this.informationStudentField.controls['financingScholarshipType'];
  }

  get membersHouseNumberField(): AbstractControl {
    return this.informationStudentField.controls['membersHouseNumber'];
  }

  get practiceHoursField(): AbstractControl {
    return this.informationStudentField.controls['practiceHours'];
  }

  get postalCodeField(): AbstractControl {
    return this.informationStudentField.controls['postalCode'];
  }

  get scholarshipAmountField(): AbstractControl {
    return this.informationStudentField.controls['scholarshipAmount'];
  }

  get tariffScholarshipPercentageField(): AbstractControl {
    return this.informationStudentField.controls['tariffScholarshipPercentage'];
  }
}
