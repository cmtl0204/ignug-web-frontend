import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PrimeIcons, MenuItem} from 'primeng/api';
import {OnExitInterface} from '@shared/interfaces';
import {CatalogueModel, StudentModel} from '@models/core';
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  MessageService,
  RoutesService,
  StudentsHttpService,
} from '@services/core';
import {
  BreadcrumbEnum,
  CatalogueCoreTypeEnum,
  SkeletonEnum,
} from '@shared/enums';
import {AuthService} from '@services/auth/auth.service';
import {UserModel} from '@models/auth/user.model';

@Component({
  selector: 'app-socioeconomic-form',
  templateUrl: './socioeconomic-form.component.html',
  styleUrls: ['./socioeconomic-form.component.scss'],
})
export class SocioeconomicFormComponent implements OnInit, OnExitInterface {
  protected student!: StudentModel | null;

  protected disabilityTypes: CatalogueModel[] = [];
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;
  items: MenuItem[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    protected messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private studentsHttpService: StudentsHttpService,
    private authService: AuthService
  ) {
    this.form = this.newForm;
    this.get();
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


    this.loadIsDisabilities();
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      informationStudent: this.informationStudentForm,
    });
  }

  get informationStudentForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      isFamilyEmigrant: [null, [Validators.required]],
    });
  }

  loadIsDisabilities(): void {
    this.disabilityTypes = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.YES_NO
    );
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
    this.student = null;
    this.studentsHttpService
      .findOne(this.authService.auth.student.id)
      .subscribe((student) => {
        this.student = student;
      });
  }

  activeIndex: number = 0;

  next() {
    this.activeIndex++;
  }

  previous() {
    this.activeIndex--;
  }

  get aditionalField(): FormGroup {
    return this.form.controls['informationStudent'] as FormGroup;
  }

  get isFamilyEmigrantField(): AbstractControl {
    return this.aditionalField.controls['isFamilyEmigrant'];
  }

  protected readonly SkeletonEnum = SkeletonEnum;
}
