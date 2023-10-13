
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PrimeIcons} from "primeng/api";
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
import {BreadcrumbEnum, CatalogueCoreTypeEnum} from '@shared/enums';

@Component({
  selector: 'app-institutional-data-form',
  templateUrl: './institutional-data-form.component.html',
  styleUrls: ['./institutional-data-form.component.scss']
})

export class InstitutionalDataFormComponent implements OnInit, OnExitInterface {
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;

  // Foreign Keys
  protected isTitules: CatalogueModel[] = [];
  protected doStudents: CatalogueModel[] = [];
  protected doEs: CatalogueModel[] = [];
  protected forStudents: CatalogueModel[] = [];
  protected schoolTypes: CatalogueModel[] = [];
  protected bachTypes: CatalogueModel[] = [];
  protected fatherLevels: CatalogueModel[] = [];
  protected motherLevels: CatalogueModel[] = [];
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
      {label: BreadcrumbEnum.STUDENTS, routerLink: [this.routesService.students]},
      {label: BreadcrumbEnum.FORM},
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
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

    this.loadSchoolTypes();
    this.loadBachTypes();
    this.loadIsTitule();
    this.loadDoStudents();
    this.loadForStudents();
    this.loadLevels();
    this.loadDoE();
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      informationStudent: this.informationStudentForm,
    });
  }


  get informationStudentForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      forStudent: [null, [Validators.required]],
      isTitule: [null, [Validators.required]],
      address: [null, [Validators.required]],
      members: [null, [Validators.required]],
      motherLevel: [null, [Validators.required]],
      fatherLevel: [null, [Validators.required]],
      graduationDate: [null, [Validators.required]],
      bachType: [null, [Validators.required]],
      schoolType: [null, [Validators.required]],
      financing: [null, [Validators.required]],
      doStudent: [null, [Validators.required]],
      nameE: [null, [Validators.required]],
      doE:[null, [Validators.required]]
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
      this.messageService.errorsFields();
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

  loadSchoolTypes(): void {
    this.schoolTypes = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.SCHOOL_TYPE);
  }

  loadBachTypes(): void {
    this.bachTypes = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.SCHOLARSHIP_TYPE);
  }

  loadIsTitule(): void {
    this.isTitules = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.YES_NO_NA);
  }

  loadDoStudents(): void {
    this.doStudents = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.STUDENT_OCCUPATION);
  }

  loadForStudents(): void {
    this.forStudents = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.STUDENT_INCOME_FOR);
  }

  loadLevels(): void {
    this.fatherLevels = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.EDUCATION_LEVEL);
    this.motherLevels = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.EDUCATION_LEVEL);
  }

  loadDoE(): void{
    this.doEs = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.INSTITUTION_PRACTICES_TYPE)
  }

  /** Form Getters **/
  /** Student Form **/
  get informationStudentField(): FormGroup {
    return this.form.controls['informationStudent'] as FormGroup;
  }

  /** Information Student Form **/
  get schoolTypeField(): AbstractControl {
    return this.informationStudentField.controls['schoolType'];
  }

  get addressField(): AbstractControl {
    return this.informationStudentField.controls['address'];
  }

  get isTituleField(): AbstractControl {
    return this.informationStudentField.controls['isTitule'];
  }


  get forStudentField(): AbstractControl {
    return this.informationStudentField.controls['forStudent'];
  }

  get motherLevelField(): AbstractControl {
    return this.informationStudentField.controls['motherLevel'];
  }

  get fatherLevelField(): AbstractControl {
    return this.informationStudentField.controls['fatherLevel'];
  }

  get graduationDateField(): AbstractControl {
    return this.informationStudentField.controls['graduationDate'];
  }

  get membersField(): AbstractControl {
    return this.informationStudentField.controls['members'];
  }

  get bachTypeField(): AbstractControl {
    return this.informationStudentField.controls['bachType'];
  }

  get financingField(): AbstractControl {
    return this.informationStudentField.controls['financing'];
  }

  get doStudentField(): AbstractControl {
    return this.informationStudentField.controls['doStudent'];
  }

  get nameEField(): AbstractControl {
    return this.informationStudentField.controls['nameE'];
  }

  get doEField(): AbstractControl {
    return this.informationStudentField.controls['doE'];
  }
}
