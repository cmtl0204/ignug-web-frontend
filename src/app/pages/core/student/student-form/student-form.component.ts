import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PrimeIcons} from "primeng/api";
import {OnExitInterface} from "@shared/interfaces";
import {CatalogueModel, InformationStudentModel, StudentModel} from "@models/core";
import { UserModel } from '@models/auth';
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
export class StudentFormComponent implements OnInit, OnExitInterface  {
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
  protected bloodType : CatalogueModel[] = [];
  protected ethnicOrigin : CatalogueModel[] = [];
  protected gender : CatalogueModel[] = [];
  protected sex : CatalogueModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    protected messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private studentsHttppService: StudentsHttpService
  ){
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
      isVisible: [true, [Validators.required]],
      informationStudents: this.informationStudentForm,
      users: this.userForm,

    });
  }

  get informationStudentForm(): FormGroup {
    return this.formBuilder.group({

      isExecutedPractice: [null, [Validators.required]],
      isExecutedCommunity: [null, [Validators.required]],
      isDisability: [null, [Validators.required]],
      isLostGratuity: [null, [Validators.required]],
      isSubjectRepeat: [null, [Validators.required]],

      address:  [null, [Validators.required]],
      community:  [null, [Validators.required]],
      contactEmergencyName:  [null, [Validators.required]],
      contactEmergencyKinship:  [null, [Validators.required]],
      contactEmergencyPhone:  [null, [Validators.required]],
      disabilityPercentage:  [null, [Validators.required]],
      economicAmount:  [null, [Validators.required]],
      educationalAmount:  [null, [Validators.required]],
      familyIncome:  [null, [Validators.required]],
      financingScholarshipType:  [null, [Validators.required]],
      membersHouseNumber:  [null, [Validators.required]],
      practiceHours:  [null, [Validators.required]],
      postalCode:  [null, [Validators.required]],
      scholarshipAmount:  [null, [Validators.required]],
      tariffScholarshipPercentage:  [null, [Validators.required]],
    });
  }

  get userForm(): FormGroup {
    return this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      birthdate: [null, [Validators.required]],
      identification: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      personalEmail: [null,[Validators.required]],
      phones: [null,[Validators.required]],
      name: [null, [Validators.required]],
      bloodType:[null,[Validators.required]],
      ethnicOrigin: [null,[Validators.required]],
      gender: [null,[Validators.required]],
      sex: [null,[Validators.required]]
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
    this.router.navigate([this.routesService.schoolPeriods]);
  }

  /** Actions **/
  create(student: StudentModel): void {
    this.studentsHttppService.create(student).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  update(student: StudentModel): void {
    this.studentsHttppService.update(this.id!, student).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  /** Load Data **/
  get(): void {
    this.studentsHttppService.findOne(this.id!).subscribe((student) => {
      this.form.patchValue(student);
    });
  }

    /** Form Getters **/  
    get isVisibleField(): AbstractControl {
      return this.form.controls['isVisible'];
    }
    get addressField(): AbstractControl {
      return this.form.controls['address'];
    }
  
    get communityField(): AbstractControl {
      return this.form.controls['community'];
    }
  
    get contactEmergencyNameField(): AbstractControl {
      return this.form.controls['contactEmergencyName'];
    }
    get contactEmergencyKinshipField(): AbstractControl {
      return this.form.controls['contactEmergencyKinship'];
    }
  
    get contactEmergencyPhoneField(): AbstractControl {
      return this.form.controls['contactEmergencyPhone'];
    }
  
    get disabilityPercentageField(): AbstractControl {
      return this.form.controls['disabilityPercentage'];
    }
    get economicAmountField(): AbstractControl {
      return this.form.controls['economicAmount'];
    }
  
    get educationalAmountField(): AbstractControl {
      return this.form.controls['educationalAmount'];
    }
  
    get familyIncomeField(): AbstractControl {
      return this.form.controls['familyIncome'];
    }
    get financingScholarshipTypeField(): AbstractControl {
      return this.form.controls['financingScholarshipType'];
    }
  
    get membersHouseNumberField(): AbstractControl {
      return this.form.controls['membersHouseNumber'];
    }
  
    get practiceHoursField(): AbstractControl {
      return this.form.controls['practiceHours'];
    }
    get postalCodeField(): AbstractControl {
      return this.form.controls['postalCode'];
    }
  
    get scholarshipAmountField(): AbstractControl {
      return this.form.controls['scholarshipAmount'];
    }
  
    get tariffScholarshipPercentageField(): AbstractControl {
      return this.form.controls['tariffScholarshipPercentage'];
    }
    get emailField(): AbstractControl {
      return this.form.controls['email'];
    }
  
    get lastnameField(): AbstractControl {
      return this.form.controls['lastname'];
    }
  
    get passwordField(): AbstractControl {
      return this.form.controls['password'];
    }
    get passwordChangedField(): AbstractControl {
      return this.form.controls['passwordChanged'];
    }
  
    get usernameField(): AbstractControl {
      return this.form.controls['username'];
    }
}
