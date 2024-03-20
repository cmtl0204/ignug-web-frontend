import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {SchoolPeriodModel, TeacherDistributionModel} from "@models/core";
import {
  BreadcrumbService,
  CoreService,
  MessageService, RoutesService, SchoolPeriodsHttpService,
  SchoolPeriodsService,
  TeacherDistributionsHttpService, TeacherDistributionsService, TeachersHttpService
} from "@services/core";
import {BreadcrumbEnum, SkeletonEnum} from "@shared/enums";
import {AuthService} from "@services/auth";
import {PrimeIcons} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-teacher-distribution-list',
  templateUrl: './teacher-distribution-list.component.html',
  styleUrls: ['./teacher-distribution-list.component.scss']
})
export class TeacherDistributionListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected selectedSchoolPeriod: FormControl = new FormControl();
  protected schoolPeriods: SchoolPeriodModel[] = [];
  protected teacherDistributions: TeacherDistributionModel[] = [];

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
    this.breadcrumbService.setItems([{label: BreadcrumbEnum.TEACHER_DISTRIBUTIONS}]);

    this.selectedSchoolPeriod.valueChanges.subscribe(value => {
      this.findTeacherDistributionsByTeacher();
    });

    this.schoolPeriods = [this.schoolPeriodsService.openSchoolPeriod];

    this.selectedSchoolPeriod.patchValue(this.schoolPeriodsService.openSchoolPeriod);
  }

  ngOnInit(): void {

  }

  findTeacherDistributionsByTeacher() {
    this.teachersHttpService.findTeacherDistributionsByTeacher(this.authService.auth.teacher.id!, this.selectedSchoolPeriod.value.id)
      .subscribe(teacherDistributions => {
        this.teacherDistributions = teacherDistributions;
      });
  }

  redirectTeacherDistributionGrades(item: TeacherDistributionModel) {
    this.teacherDistributionsService.teacherDistribution = item;
    this.router.navigate([this.routesService.teacherDistributionsGrades]);
  }
}
