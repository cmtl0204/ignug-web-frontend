import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PrimeIcons} from 'primeng/api';

import {CatalogueModel, CurriculumModel, SelectSubjectDto, SubjectModel, SubjectRequirementModel} from '@models/core';
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  CurriculumsHttpService,
  CurriculumsService,
  MessageService,
  RoutesService,
  SubjectsHttpService,
  SubjectsService,
} from '@services/core';
import {
  BreadcrumbEnum,
  CatalogueCoreSubjectRequirementTypeEnum,
  CatalogueCoreTypeEnum, ClassButtonActionEnum, IconButtonActionEnum, LabelButtonActionEnum,
  SkeletonEnum
} from '@shared/enums';
import {OnExitInterface} from '@shared/interfaces';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss'],
})
export class SubjectFormComponent implements OnInit, OnExitInterface {
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected id: string | null = null;
  protected form: FormGroup;
  protected subjectsPrerequisites: SelectSubjectDto[] = [];
  protected subjectsCorequisites: SelectSubjectDto[] = [];

  // Foreign Keys
  protected curriculum: CurriculumModel[] = [];
  protected states: CatalogueModel[] = [];
  protected academicPeriods: CatalogueModel[] = [];
  protected types: CatalogueModel[] = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly cataloguesHttpService: CataloguesHttpService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly routesService: RoutesService,
    private readonly subjectsHttpService: SubjectsHttpService,
    protected readonly coreService: CoreService,
    protected readonly curriculumService: CurriculumsService,
    protected readonly curriculumsHttpService: CurriculumsHttpService,
    protected readonly messageService: MessageService,
    protected readonly subjectsService: SubjectsService,
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.INSTITUTIONS, routerLink: [this.routesService.institutions]},
      {label: BreadcrumbEnum.CAREERS, routerLink: [this.routesService.careers]},
      {label: BreadcrumbEnum.CURRICULUMS, routerLink: [this.routesService.curriculums]},
      {label: BreadcrumbEnum.SUBJECTS, routerLink: [this.routesService.subjects]},
      {label: BreadcrumbEnum.FORM},
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
    }

    this.form = this.newForm;
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched || this.form.dirty) {
      return await this.messageService
        .questionOnExit()
        .then((result) => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {
    this.loadAcademicPeriods();
    this.loadStates();
    this.loadTypes();

    if (this.id) {
      this.get();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      academicPeriod: [null, [Validators.required]],
      autonomousHour: [null, [Validators.required]],
      code: [null, [Validators.required]],
      corequisites: [[]],
      credits: [null, [Validators.required]],
      curriculum: [this.curriculumService.curriculum, [Validators.required]],
      isVisible: [true, [Validators.required]],
      name: [null, [Validators.required]],
      practicalHour: [null, [Validators.required]],
      prerequisites: [[]],
      scale: [0, [Validators.required, Validators.maxLength(1)]],
      state: [null, [Validators.required]],
      teacherHour: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      let {prerequisites, corequisites, ...payload} = this.form.value;

      const prerequisitesClon = this.prerequisitesField.value as SubjectRequirementModel[];
      const corequisitesClon = this.corequisitesField.value as SubjectRequirementModel[];

      prerequisites = prerequisitesClon.map(prerequisite => {
        return {
          subject: this.subjectsService.subject,
          requirement: prerequisite,
          isEnabled: true,
          type: CatalogueCoreSubjectRequirementTypeEnum.PREREQUISITE,
        };
      });

      corequisites = corequisitesClon.map(prerequisite => {
        return {
          subject: this.subjectsService.subject,
          requirement: prerequisite,
          isEnabled: true,
          type: CatalogueCoreSubjectRequirementTypeEnum.CO_REQUISITE,
        };
      });

      const subjectRequirements: SubjectRequirementModel[] = prerequisites.concat(corequisites);

      const subject: SelectSubjectDto = {...payload, subjectRequirements};
      if (this.id) {
        this.update(subject);
      } else {
        this.create(subject);
      }
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields();
    }
  }

  back(): void {
    this.router.navigate([this.routesService.subjects]);
  }

  /** Actions **/
  create(subject:SelectSubjectDto): void {
    this.subjectsHttpService.create(subject).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  update(subject:SelectSubjectDto): void {
    this.subjectsHttpService.update(this.id!, subject).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  /** Load Data **/
  get(): void {
    this.subjectsHttpService.findOne(this.id!).subscribe((item) => {
      const prerequisites = item.subjectRequirements
        .filter(subjectRequirement => subjectRequirement.type === CatalogueCoreSubjectRequirementTypeEnum.PREREQUISITE)
        .map(subjectRequirement => subjectRequirement.requirement);

      const corequisites = item.subjectRequirements
        .filter(subjectRequirement => subjectRequirement.type === CatalogueCoreSubjectRequirementTypeEnum.CO_REQUISITE)
        .map(subjectRequirement => subjectRequirement.requirement);

      this.form.patchValue({...item, prerequisites, corequisites});

      console.log(this.stateField.value);
      console.log(this.states);
      this.findSubjectsByCurriculum();
    });
  }

  findSubjectsByCurriculum() {
    this.curriculumsHttpService.findSubjectsByCurriculum(this.curriculumService.curriculum.id!)
      .subscribe((subjects) => {
        if (this.academicPeriodField.value.code !== this.subjectsService.subject.academicPeriod.code) {
          this.prerequisitesField.setValue([]);
          this.corequisitesField.setValue([]);
        }

        this.subjectsPrerequisites = [];
        this.subjectsCorequisites = [];

        const subjects1 = subjects.filter(subject => parseInt(subject.academicPeriod.code) < parseInt(this.academicPeriodField.value.code));
        const subjects2 = subjects.filter(subject => parseInt(subject.academicPeriod.code) === parseInt(this.academicPeriodField.value.code));

        subjects1.sort(function (a, b) {
          if (a.academicPeriod.code > b.academicPeriod.code) {
            return 1;
          }
          if (a.academicPeriod.code < b.academicPeriod.code) {
            return -1;
          }
          return 0;
        });

        subjects1.forEach(subject => {
          const level = subject.academicPeriod.name;
          const index = this.subjectsPrerequisites.findIndex(item => item.name === level);

          if (index === -1) {
            this.subjectsPrerequisites.push({name: level, items: [subject]});
          }

          if (index > -1) {
            this.subjectsPrerequisites[index].items!.push(subject);
          }
        });

        subjects2.forEach(subject => {
          const level = subject.academicPeriod.name;
          const index = this.subjectsCorequisites.findIndex(item => item.name === level);

          if (index === -1) {
            this.subjectsCorequisites.push({name: level, items: []});

          }

          if (index > -1) {
            this.subjectsCorequisites[index].items!.push(subject);
          }
        });
      });
  }

  loadAcademicPeriods(): void {
    this.academicPeriods = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.ACADEMIC_PERIOD);
  }

  loadStates(): void {
    this.states = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.SUBJECTS_STATE);
  }

  loadTypes(): void {
    this.types = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.SUBJECTS_TYPE);
  }

  /** Form Getters **/
  get autonomousHourField(): AbstractControl {
    return this.form.controls['autonomousHour'];
  }

  get codeField(): AbstractControl {
    return this.form.controls['code'];
  }

  get isVisibleField(): AbstractControl {
    return this.form.controls['isVisible'];
  }

  get creditsField(): AbstractControl {
    return this.form.controls['credits'];
  }

  get nameField(): AbstractControl {
    return this.form.controls['name'];
  }

  get practicalHourField(): AbstractControl {
    return this.form.controls['practicalHour'];
  }

  get scaleField(): AbstractControl {
    return this.form.controls['scale'];
  }

  get teacherHourField(): AbstractControl {
    return this.form.controls['teacherHour'];
  }

  get academicPeriodField(): AbstractControl {
    return this.form.controls['academicPeriod'];
  }

  get stateField(): AbstractControl {
    return this.form.controls['state'];
  }

  get typeField(): AbstractControl {
    return this.form.controls['type'];
  }

  get curriculumField(): AbstractControl {
    return this.form.controls['curriculum'];
  }

  get prerequisitesField(): AbstractControl {
    return this.form.controls['prerequisites'];
  }

  get corequisitesField(): AbstractControl {
    return this.form.controls['corequisites'];
  }

  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly ClassButtonActionEnum = ClassButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
}
