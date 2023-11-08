import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PrimeIcons, MenuItem} from "primeng/api";
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
import {BreadcrumbEnum, CatalogueCoreTypeEnum, SkeletonEnum} from '@shared/enums';

@Component({
  selector: 'app-enrollment-application',
  templateUrl: './enrollment-application.component.html',
  styleUrls: ['./enrollment-application.component.scss']
})
export class EnrollmentApplicationComponent {
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected id: string | null = null;
  protected form: FormGroup;
  protected items: MenuItem[] = [];
  protected activeIndex: number = 0;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
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

  next1() {
    this.activeIndex = 0;
  }

  next2() {
    this.activeIndex = 1;
  }

  next3() {
    this.activeIndex = 2;
  }

  next4() {
    this.activeIndex = 3;
  }

  send() {
    //TODO
  }
}
