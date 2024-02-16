import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MenuItem, PrimeIcons} from "primeng/api";
import {
  CareerModel,
  ColumnModel,
  EnrollmentDetailModel,
  SchoolPeriodModel, SelectCareerDto,
  TeacherDistributionModel
} from "@models/core";
import {AuthService} from "@services/auth";
import {Router} from "@angular/router";
import {
  BreadcrumbService, CoreService, MessageService,
  RoutesService,
  SchoolPeriodsService,
  TeacherDistributionsHttpService,
  TeacherDistributionsService, TeachersHttpService
} from "@services/core";
import {
  BreadcrumbEnum,
  ClassButtonActionEnum,
  IconButtonActionEnum,
  IdButtonActionEnum, LabelButtonActionEnum,
  SkeletonEnum, UsersFormEnum
} from "@shared/enums";

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss']
})
export class GradeListComponent {
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly ClassButtonActionEnum = ClassButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly BreadcrumbEnum = BreadcrumbEnum;

  protected selectedSchoolPeriod: FormControl = new FormControl();
  protected schoolPeriods: SchoolPeriodModel[] = [];
  protected selectedItem!: CareerModel;
  protected selectedItems: CareerModel[] = [];
  protected items: SelectCareerDto[] = [];
  protected buttonActions: MenuItem[] = this.buildButtonActions;
  protected columns: ColumnModel[] = this.buildColumns;
  protected isButtonActions: boolean = false;

  constructor(
    protected readonly authService: AuthService,
    private readonly router: Router,
    private readonly routesService: RoutesService,
    private readonly schoolPeriodsService: SchoolPeriodsService,
    private readonly teacherDistributionsHttpService: TeacherDistributionsHttpService,
    private readonly teacherDistributionsService: TeacherDistributionsService,
    private readonly teachersHttpService: TeachersHttpService,
    private readonly breadcrumbService: BreadcrumbService,
    protected readonly coreService: CoreService,
    protected readonly messageService: MessageService,
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.TEACHER_DISTRIBUTIONS, routerLink: [this.routesService.teacherDistributions]},
      {label: BreadcrumbEnum.TEACHER_DISTRIBUTIONS_GRADES},
    ]);

    this.schoolPeriods = [this.schoolPeriodsService.openSchoolPeriod];

    this.selectedSchoolPeriod.patchValue(this.schoolPeriodsService.openSchoolPeriod);
  }

  ngOnInit(): void {
    this.findEnrollmentsByTeacherDistribution();
  }

  findEnrollmentsByTeacherDistribution() {
    this.teacherDistributionsHttpService.findEnrollmentDetailsByTeacherDistribution(this.teacherDistributionsService.teacherDistribution.id!)
      .subscribe(enrollmentDetails => {
        this.items = enrollmentDetails;
      });
  }

  redirectTeacherDistributionGrades(item: TeacherDistributionModel) {
    this.teacherDistributionsService.teacherDistribution = item;
    this.router.navigate([this.routesService.teacherDistributionsGrades]);
  }

  get buildColumns(): ColumnModel[] {
    return [
      {field: 'identification', header: UsersFormEnum.identification},
      {field: 'lastname', header: UsersFormEnum.lastname},
      {field: 'name', header: UsersFormEnum.name},
      {field: 'enrollmentDetailNumber', header: 'N° de matrícula'},
      {field: 'grade1', header: 'Parcial 1'},
      {field: 'attendance1', header: 'Asistencia 1'},
      {field: 'grade2', header: 'Parcial 2'},
      {field: 'attendance2', header: 'Asistencia 1'},
      {field: 'finalGrade', header: 'Calificación final'},
      {field: 'finalAttendance', header: 'Asistencia final'},
    ];
  }

  get buildButtonActions() {
    return [
      {
        id: IdButtonActionEnum.UPDATE,
        label: LabelButtonActionEnum.UPDATE,
        icon: IconButtonActionEnum.UPDATE,
        command: () => {
          // if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
        },
      },
    ];
  }

  validateButtonActions(item: CareerModel): void {
    this.buttonActions = this.buildButtonActions;
  }

  selectItem(item: CareerModel) {
    this.isButtonActions = true;
    this.selectedItem = item;
    this.validateButtonActions(item);
  }
}
