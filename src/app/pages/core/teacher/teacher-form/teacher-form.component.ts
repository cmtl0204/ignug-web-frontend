import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PrimeIcons } from "primeng/api";
import { OnExitInterface } from "@shared/interfaces";
import { CatalogueModel, TeacherModel } from "@models/core";
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  MessageService,
  RoutesService,
  TeachersHttpService
} from "@services/core";
import { CatalogueCoreTypeEnum } from "@shared/enums";

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss']
})
export class TeacherFormComponent implements OnInit, OnExitInterface {
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;
  protected panelHeader: string = 'Crear';

  // Foreign Keys Information Teacher
  protected states: CatalogueModel[] = [];
  protected teacher: TeacherModel[] = [];
  protected countryHigherEducation: CatalogueModel[] = [];
  protected higherEducation: CatalogueModel[] = [];
  protected scholarship: CatalogueModel[] = [];
  protected scholarshipType: CatalogueModel[] = [];
  protected teachingLadder: CatalogueModel[] = [];

  // Foreign Keys User
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
    private teachersHttpService: TeachersHttpService,
  ) {
    this.breadcrumbService.setItems([
      { label: 'Profesores', routerLink: [this.routesService.teachers] },
      { label: 'Form' },
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
      this.panelHeader = 'Actualizar';
    }

    this.form = this.teacherForm;
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

  get teacherForm(): FormGroup {
    return this.formBuilder.group({
      informationTeacher: this.informationTeacherForm,
      user: this.userForm,
    });
  }

  get informationTeacherForm(): FormGroup {
    return this.formBuilder.group({
      id: [null,[]],

      teacher: [null, []],
      countryHigherEducation:  [null, []],
      higherEducation:  [null, []],
      scholarship:  [null, []],
      scholarshipType:  [null, []],
      teachingLadder:  [null, []],

      academicUnit: [null, []],
      administrativeHours: [null, []],
      classHours: [null, []],
      communityHours: [null, []],
      degreeHigherEducation: [null, []],
      hoursWorked: [null, []],
      holidays: [null, []],
      homeVacation: [null, []],
      institutionHigherEducation: [null, []],
      investigationHours: [null, []],
      otherHours: [null, []],
      publications: [null, []],
      scholarshipAmount: [null, []],
      totalSubjects: [null, []],
      technical: [null, []],
      technology: [null, []],
      totalPublications: [null, []],
    })
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
    })
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
    this.router.navigate([this.routesService.teachers]);
  }

  /** Actions **/
  create(item: TeacherModel): void {
    this.teachersHttpService.create(item).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  update(item: TeacherModel): void {
    this.teachersHttpService.update(this.id!, item).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  /** Load Data **/
  get(): void {
    this.teachersHttpService.findOne(this.id!).subscribe((item) => {
      this.form.patchValue(item);
    });
  }

  loadStates(): void {
    this.cataloguesHttpService.catalogue(CatalogueCoreTypeEnum.SCHOOL_PERIOD_STATE).subscribe((items) => this.states = items);
  }

  /** Form Getters **/

  /** Teachers Form **/
  get informationTeachersField(): FormGroup {
    return this.form.controls['informationTeachers'] as FormGroup;
  }

  get userField(): FormGroup {
    return this.form.controls['user'] as FormGroup;
  }

  /** Information Teachers Form **/

  get teacherField(): AbstractControl {
    return this.informationTeachersField.controls['teacher'];
  }

  get countryHigherEducationField(): AbstractControl {
    return this.informationTeachersField.controls['countryHigherEducation'];
  }

  get higherEducationField(): AbstractControl {
    return this.informationTeachersField.controls['higherEducation'];
  }

  get scholarshipField(): AbstractControl {
    return this.informationTeachersField.controls['scholarship'];
  }

  get scholarshipTypeField(): AbstractControl {
    return this.informationTeachersField.controls['scholarshipType'];
  }

  get teachingLadderField(): AbstractControl {
    return this.informationTeachersField.controls['teachingLadder'];
  }

  get academicUnitField(): AbstractControl {
    return this.informationTeachersField.controls['academicUnit'];
  }

  get administrativeHoursField(): AbstractControl {
    return this.informationTeachersField.controls['administrativeHours'];
  }

  get classHoursField(): AbstractControl {
    return this.informationTeachersField.controls['classHours'];
  }

  get communityHoursField(): AbstractControl {
    return this.informationTeachersField.controls['communityHours'];
  }

  get degreeHigherEducationField(): AbstractControl {
    return this.informationTeachersField.controls['degreeHigherEducation'];
  }

  get hoursWorkedField(): AbstractControl {
    return this.informationTeachersField.controls['hoursWorked'];
  }

  get holidaysField(): AbstractControl {
    return this.informationTeachersField.controls['holidays'];
  }

  get publicationsField(): AbstractControl {
    return this.informationTeachersField.controls['publications'];
  }

  get homeVacationField(): AbstractControl {
    return this.informationTeachersField.controls['homeVacation'];
  }

  get institutionHigherEducationField(): AbstractControl {
    return this.informationTeachersField.controls['institutionHigherEducation'];
  }

  get investigationHoursField(): AbstractControl {
    return this.informationTeachersField.controls['investigationHours'];
  }

  get otherHoursField(): AbstractControl {
    return this.informationTeachersField.controls['otherHours'];
  }

  get scholarshipAmountField(): AbstractControl {
    return this.informationTeachersField.controls['scholarshipAmount'];
  }

  get stateField(): AbstractControl {
    return this.informationTeachersField.controls['state'];
  }

  get totalSubjectsField(): AbstractControl {
    return this.informationTeachersField.controls['totalSubjects'];
  }

  get technicalField(): AbstractControl {
    return this.informationTeachersField.controls['technical'];
  }

  get technologyField(): AbstractControl {
    return this.informationTeachersField.controls['technology'];
  }

  get totalPublicationsField(): AbstractControl {
    return this.informationTeachersField.controls['totalPublications'];
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


