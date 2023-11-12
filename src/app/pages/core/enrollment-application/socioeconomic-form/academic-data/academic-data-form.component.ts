import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PrimeIcons} from "primeng/api";
import {CatalogueModel, StudentModel} from "@models/core";
import {CataloguesHttpService, CoreService, MessageService, RoutesService, StudentsHttpService} from "@services/core";
import {CatalogueTypeEnum} from '@shared/enums';

@Component({
  selector: 'app-academic-data-form',
  templateUrl: './academic-data-form.component.html',
  styleUrls: ['./academic-data-form.component.scss']
})

export class AcademicDataFormComponent implements OnInit {
  @Input() student!: StudentModel;
  @Input() id!: string;

  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();

  protected readonly PrimeIcons = PrimeIcons;
  protected readonly Validators = Validators;
  protected form: FormGroup;
  protected formErrors: string[] = [];

  // Foreign Keys
  protected yesNo: CatalogueModel[] = [];
  protected academicCareers: CatalogueModel[] = [];
  protected anotherTitles: CatalogueModel[] = [];
  protected anotherCareers: CatalogueModel[] = [];
  protected schoolTypes: CatalogueModel[] = [];
  protected academiCycles: CatalogueModel[] = [];

  constructor(
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    protected messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private studentsHttpService: StudentsHttpService
  ) {
    this.form = this.newForm;
    this.applyValidations();
  }


  ngOnInit(): void {
    this.form.patchValue(this.student);
    this.loadSchoolTypes();
    this.loadBachTypes();
    this.loadYesNo();
    this.loadAcademicCareers();
    this.loadAnotherCareer();
    this.loadAnotherTitle();
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      informationStudent: this.newInformationStudentForm,
    });
  }

  get newInformationStudentForm(): FormGroup {
    return this.formBuilder.group({
      universityCareer: [null, [Validators.required]],
      isDegreeSuperior: [null, [Validators.required]],
      degreeSuperior: [null],
      isStudyOtherCareer: [null, [Validators.required]],
      nameStudyOtherCareer: [null],
      typeStudyOtherCareer: [null],
      typeSchool: [null, [Validators.required]]
    });
  }

  /** Actions **/

  onSubmit(): void {
    if (this.validateForm()) {
      this.update();
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields(this.formErrors);
    }
  }

  update() {
    this.studentsHttpService.updateAcademicData(
      this.id,
      this.form.value
    ).subscribe();
    this.next.emit();
  }

  validateForm() {
    this.formErrors = [];

    if (this.universityCareerField.errors) this.formErrors.push('Trayectoria universitaria');
    if (this.isDegreeSuperiorField.errors) this.formErrors.push('Tiene otro titulo');
    if (this.degreeSuperiorField.errors) this.formErrors.push('Que titulo posee');
    if (this.isStudyOtherCareerField.errors) this.formErrors.push('Estudia otra carrera?');
    if (this.nameStudyOtherCareerField.errors) this.formErrors.push('Nombre de la carrera');
    if (this.typeStudyOtherCareerField.errors) this.formErrors.push('Tipo de carrera');
    if (this.typeSchoolField.errors) this.formErrors.push('Tipo de colegio');

    this.formErrors.sort();
    return this.formErrors.length === 0 && this.form.valid;
  }

  loadSchoolTypes(): void {
    this.schoolTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.SCHOOL_TYPE);
  }

  loadBachTypes(): void {
    this.academiCycles = this.cataloguesHttpService.findByType(CatalogueTypeEnum.SCHOLARSHIP_TYPE);
  }

  loadYesNo(): void {
    this.yesNo = this.cataloguesHttpService.findByType(CatalogueTypeEnum.YES_NO);
  }

  loadAcademicCareers(): void {
    this.academicCareers = this.cataloguesHttpService.findByType(CatalogueTypeEnum.STUDENT_OCCUPATION);
  }

  loadAnotherCareer(): void {
    this.anotherCareers = this.cataloguesHttpService.findByType(CatalogueTypeEnum.STUDENT_INCOME_FOR);
  }

  loadAnotherTitle(): void {
    this.anotherTitles = this.cataloguesHttpService.findByType(CatalogueTypeEnum.YES_NO)
  }

  applyValidations() {
    this.isDegreeSuperiorField.valueChanges.subscribe(value => {
      if (value?.code === '1') {
        this.degreeSuperiorField.addValidators(Validators.required);
      } else {
        this.degreeSuperiorField.removeValidators(Validators.required);
      }
      this.degreeSuperiorField.updateValueAndValidity();
    })

    this.isStudyOtherCareerField.valueChanges.subscribe(value => {
      if (value?.code === '1') {
        this.nameStudyOtherCareerField.addValidators(Validators.required);
        this.typeStudyOtherCareerField.addValidators(Validators.required);
      } else {
        this.nameStudyOtherCareerField.removeValidators(Validators.required);
        this.typeStudyOtherCareerField.removeValidators(Validators.required);

      }
      this.nameStudyOtherCareerField.updateValueAndValidity();
      this.typeStudyOtherCareerField.updateValueAndValidity();
    })
  }

  /** Form Getters **/
  /** Student Form **/
  get informationStudentForm(): FormGroup {
    return this.form.controls['informationStudent'] as FormGroup;
  }

  /** Information Student Form **/
  get universityCareerField(): AbstractControl {
    return this.informationStudentForm.controls['universityCareer'];
  }

  get isDegreeSuperiorField(): AbstractControl {
    return this.informationStudentForm.controls['isDegreeSuperior'];
  }

  get degreeSuperiorField(): AbstractControl {
    return this.informationStudentForm.controls['degreeSuperior'];
  }

  get isStudyOtherCareerField(): AbstractControl {
    return this.informationStudentForm.controls['isStudyOtherCareer'];
  }

  get nameStudyOtherCareerField(): AbstractControl {
    return this.informationStudentForm.controls['nameStudyOtherCareer'];
  }

  get typeStudyOtherCareerField(): AbstractControl {
    return this.informationStudentForm.controls['typeStudyOtherCareer'];
  }

  get typeSchoolField(): AbstractControl {
    return this.informationStudentForm.controls['typeSchool'];
  }
}
