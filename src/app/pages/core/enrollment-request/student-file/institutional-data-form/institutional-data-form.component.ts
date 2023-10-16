
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
  protected yesno: CatalogueModel[] = [];
  protected academicCareers: CatalogueModel[] = [];
  protected anotherTitles: CatalogueModel[] = [];
  protected anotherCareers: CatalogueModel[] = [];
  protected schoolTypes: CatalogueModel[] = [];
  protected academiCycles: CatalogueModel[] = [];


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
    this.loadYesNo();
    this.loadAcademicCareers();
    this.loadAnotherCareer();
    this.loadAnotherTitle();
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      institutionalData: this.institutionalDataForm,
    });
  }


  get institutionalDataForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      career:[null,[Validators.required]],
      academiCycle:[null, [Validators.required]],
      lostSubject: [null, [Validators.required]],
      academicCareer: [null, [Validators.required]],
      anotherTitle: [null, [Validators.required]],
      anotherCareer: [null, [Validators.required]],
      nameInstitution: [null],
      insitutionType: [null],
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
    this.academiCycles = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.SCHOLARSHIP_TYPE);
  }

  loadYesNo(): void {
    this.yesno = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.YES_NO_NA);
  }

  loadAcademicCareers(): void {
    this.academicCareers = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.STUDENT_OCCUPATION);
  }

  loadAnotherCareer(): void {
    this.anotherCareers = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.STUDENT_INCOME_FOR);
  }

  loadAnotherTitle(): void{
    this.anotherTitles = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.INSTITUTION_PRACTICES_TYPE)
  }

  /** Form Getters **/
  /** Student Form **/
  get institutionalDataField(): FormGroup {
    return this.form.controls['institutionalData'] as FormGroup;
  }

  /** Information Student Form **/
  get carrerField(): AbstractControl {
    return this.institutionalDataField.controls['career'];
  }
  
  get academiCycleField(): AbstractControl {
    return this.institutionalDataField.controls['academiCycle'];
  }

  get lostSubjectField(): AbstractControl {
    return this.institutionalDataField.controls['lostSubject'];
  }

  get academicCareerField(): AbstractControl {
    return this.institutionalDataField.controls['academicCareer'];
  }

  get anotherTitleField(): AbstractControl {
    return this.institutionalDataField.controls['anotherTitle'];
  }

  get anotherCareerField(): AbstractControl {
    return this.institutionalDataField.controls['anotherCareer'];
  }

  get nameInstitutionField(): AbstractControl {
    return this.institutionalDataField.controls['nameInstitution'];
  }

  get insitutionTypeField(): AbstractControl {
    return this.institutionalDataField.controls['insitutionType'];
  }
}
