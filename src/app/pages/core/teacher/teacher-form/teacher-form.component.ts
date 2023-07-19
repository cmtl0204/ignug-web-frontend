import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  AbstractControl,
  FormArray, FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateTeacherDto, RoleModel, UpdateTeacherDto} from '@models/core';
import {TeachersHttpService} from '@services/core';
import {BreadcrumbService, CataloguesHttpService, CoreService, MessageService} from '@services/core';
import {OnExitInterface} from '@shared/interfaces';
import {PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss']
})
export class TeacherFormComponent implements OnInit, OnExitInterface {
  protected readonly PrimeIcons = PrimeIcons;
  id: string = '';
  form: FormGroup;
  panelHeader: string = 'Agregar profesor';
  isChangePassword: FormControl = new FormControl(false);
  isLoadingSkeleton: boolean = false;
  isLoading: boolean = false;
  roles: RoleModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    private coreService: CoreService,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private router: Router,
    private teachersHttpService: TeachersHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Profesores', routerLink: ['/administration/users']},
      {label: 'Form'},
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
      this.panelHeader = 'Actualizar profesor';
    }

    this.form = this.newForm;
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched || this.form.dirty) {
      return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }
    return true;
  }


  get newForm(): FormGroup {
    return this.formBuilder.group({
      teacher: [null, [Validators.required]],
      countryHigherEducation: [null, [Validators.required]],
      higherEducation: [null, [Validators.required]],
      scholarship: [[Validators.required]],
      scholarshipType: [[Validators.required]],
      teachingLadder: [null, [Validators.required]],
      academicUnit: [null, [Validators.required]],
      administrativeHours: [null, [Validators.required]],
      classHours: [null, [Validators.required]],
      communityHours: [null, [Validators.required]],
      degreeHigherEducation: [null, [Validators.required]],
      hoursWorked: [null, [Validators.required]],
      holidays: [null, [Validators.required]],
      homeVacation: [null, [Validators.required]],
      institutionHigherEducation: [null, [Validators.required]],
      investigationHours: [null, [Validators.required]],
      otherHours: [null, [Validators.required]],
      publications: [null, [Validators.required]],
      scholarshipAmount: [null, [Validators.required]],
      state: [null, [Validators.required]],
      totalSubjects: [null, [Validators.required]],
      technical: [null, [Validators.required]],
      technology: [null, [Validators.required]],
      totalPublications: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.id != '') {
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
    this.router.navigate(['/administration/teachers']);
  }

  create(teacher: CreateTeacherDto): void {
    this.teachersHttpService.create(teacher).subscribe(teacher => {
      this.form.reset(teacher);
      this.back();
    });
  }

  getTeacher(): void {
    this.isLoadingSkeleton = true;
    this.teachersHttpService.findOne(this.id).subscribe((teacher) => {
      this.isLoadingSkeleton = false;
      this.form.patchValue(teacher);
    });
  }

  update(teacher: UpdateTeacherDto): void {
    this.teachersHttpService.update(this.id, teacher).subscribe((teacher) => {
      this.form.reset(teacher);
      this.back()
    });
  }

  

  get teacherField(): AbstractControl {
    return this.form.controls['teacher'];
  }

  get countryHigherEducationField(): AbstractControl {
    return this.form.controls['countryHigherEducation'];
  }

  get higherEducationField(): AbstractControl {
    return this.form.controls['higherEducation'];
  }

  get scholarshipField(): AbstractControl {
    return this.form.controls['scholarship'];
  }

  get scholarshipTypeField(): FormArray {
    return this.form.controls['scholarshipType'] as FormArray;
  }

  get teachingLadderField(): AbstractControl {
    return this.form.controls['teachingLadder'];
  }

  get academicUnitField(): AbstractControl {
    return this.form.controls['academicUnit'];
  }

  get administrativeHoursField(): AbstractControl {
    return this.form.controls['administrativeHours'];
  }

  get classHoursField(): AbstractControl {
    return this.form.controls['classHours'];
  }

  get communityHoursField(): AbstractControl {
    return this.form.controls['communityHours'];
  }

  get degreeHigherEducationField(): AbstractControl {
    return this.form.controls['degreeHigherEducation'];
  }

  get hoursWorkedField(): AbstractControl {
    return this.form.controls['hoursWorked'];
  }

  get holidaysField(): AbstractControl {
    return this.form.controls['holidays'];
  }

  get homeVacationField(): AbstractControl {
    return this.form.controls['homeVacation'];
  }

  get institutionHigherEducationField(): AbstractControl {
    return this.form.controls['institutionHigherEducation'];
  }

  get investigationHoursField(): AbstractControl {
    return this.form.controls['investigationHours'];
  }

  get otherHoursField(): AbstractControl {
    return this.form.controls['otherHours'];
  }

  get publicationsField(): AbstractControl {
    return this.form.controls['publications'];
  }

  get scholarshipAmountField(): AbstractControl {
    return this.form.controls['scholarshipAmount'];
  }

  get stateField(): AbstractControl {
    return this.form.controls['state'];
  }

  get totalSubjectsField(): AbstractControl {
    return this.form.controls['totalSubjects'];
  }

  get technicalField(): AbstractControl {
    return this.form.controls['technical'];
  }

  get technologyField(): AbstractControl {
    return this.form.controls['technology'];
  }

  get totalPublicationsField(): AbstractControl {
    return this.form.controls['totalPublications'];
  }
  
}


