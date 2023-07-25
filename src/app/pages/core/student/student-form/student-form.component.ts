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
  protected isExecutedPractice: CatalogueModel[] = [];
  protected isExecutedCommunity: CatalogueModel[] = [];
  protected isDisability: CatalogueModel[] = [];
  protected isLostGratuity: CatalogueModel[] = [];
  protected isSubjectRepeat: CatalogueModel[] = [];
  protected phone: CatalogueModel[] = [];
  protected bloodType: CatalogueModel[] = [];
  protected ethnicOrigin: CatalogueModel[] = [];
  protected gender: CatalogueModel[] = [];
  protected sex: CatalogueModel[] = [];

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
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      informationStudent: this.informationStudentForm,
      user: this.userForm
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
      bloodType: [null, []],
      ethnicOrigin: [null, []],
      gender: [null, []],
      sex: [null, []]
      /*id: [null],
      email: [null, [Validators.email]],
      birthdate: [null, []],
      identification: [null, []],
      lastname: [null, []],
      personalEmail: [null, []],
      phone: [null, []],
      name: [null, []],
      bloodType: [null, []],
      ethnicOrigin: [null, []],
      gender: [null, []],
      sex: [null, []]
      */
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

  /** Form Getters **/
  /** Student Form **/
  get informationStudentField(): FormGroup {
    return this.form.controls['informationStudent'] as FormGroup;
  }

  get userField(): FormGroup {
    return this.form.controls['user'] as FormGroup;
  }

  /** Information Student Form **/
  get addressField(): AbstractControl {
    return this.informationStudentField.controls['address'];
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

  /** User Form **/
  get emailField(): AbstractControl {
    return this.userField.controls['email'];
  }

  get lastnameField(): AbstractControl {
    return this.userField.controls['lastname'];
  }

  get userNameField(): AbstractControl {
    return this.userField.controls['name'];
  }

  get passwordField(): AbstractControl {
    return this.userField.controls['password'];
  }

  get passwordChangedField(): AbstractControl {
    return this.userField.controls['passwordChanged'];
  }

  get usernameField(): AbstractControl {
    return this.userField.controls['username'];
  }
}
