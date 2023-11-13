import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
import {BreadcrumbEnum, CatalogueEnrollmentStateEnum, CatalogueTypeEnum, SkeletonEnum} from '@shared/enums';
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
  protected form: FormGroup;
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
    private readonly formBuilder: FormBuilder,
    protected readonly messageService: MessageService,
    private readonly router: Router,
    private readonly routesService: RoutesService,
    private readonly studentsHttpService: StudentsHttpService
  ) {
    this.breadcrumbService.setItems([{label: BreadcrumbEnum.ENROLLMENT_REQUEST}]);

    this.student = authService.auth.student;

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
    this.findEnrollmentByStudent();

    if (this.id) {
      this.get();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      form: this.form
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

  findEnrollmentByStudent() {
    this.studentsHttpService.findEnrollmentByStudent(this.student.id)
      .subscribe(enrollment => {
        this.enrollment = enrollment;
        if (enrollment.enrollmentStates) {
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
}
