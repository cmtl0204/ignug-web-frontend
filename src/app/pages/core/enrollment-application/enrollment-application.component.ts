import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PrimeIcons, MenuItem} from "primeng/api";
import {EnrollmentModel, StudentModel} from "@models/core";
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  MessageService,
  RoutesService,
  StudentsHttpService
} from "@services/core";
import {BreadcrumbEnum, CatalogueEnrollmentStateEnum,  SkeletonEnum} from '@shared/enums';
import {AuthService} from "@services/auth";
import {EnrollmentStateModel} from "@models/core/enrollment-state.model";

@Component({
  selector: 'app-enrollment-application',
  templateUrl: './enrollment-application.component.html',
  styleUrls: ['./enrollment-application.component.scss']
})
export class EnrollmentApplicationComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected id: string | null = null;
  protected items: MenuItem[] = [];
  protected enrollment!: EnrollmentModel;
  protected student!: StudentModel;
  protected enrollmentState!: EnrollmentStateModel;
  protected activeIndex: number = 0;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly cataloguesHttpService: CataloguesHttpService,
    protected readonly coreService: CoreService,
    protected readonly messageService: MessageService,
    private readonly router: Router,
    private readonly routesService: RoutesService,
    private readonly studentsHttpService: StudentsHttpService
  ) {
    this.breadcrumbService.setItems([{label: BreadcrumbEnum.ENROLLMENT_REQUEST}]);

    this.student = authService.auth.student;
  }

  ngOnInit(): void {
    this.findEnrollmentByStudent();
  }

  /** Load Data **/
  findEnrollmentByStudent() {
    this.studentsHttpService.findEnrollmentByStudent(this.student.id)
      .subscribe(enrollment => {
        this.enrollment = enrollment;
        if (enrollment?.enrollmentStates) {
          this.enrollmentState = enrollment.enrollmentStates.find(enrollmentState => enrollmentState.state.code === CatalogueEnrollmentStateEnum.ENROLLED)!;
        }
      });
  }

  next() {
    this.activeIndex++;
  }

  previous() {
    this.activeIndex--;
  }

  protected readonly CatalogueEnrollmentStateEnum = CatalogueEnrollmentStateEnum;
}
