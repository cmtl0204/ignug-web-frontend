import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { OnExitInterface } from '@shared/interfaces';
import { CatalogueModel, StudentModel } from '@models/core';
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
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-migration-country',
  templateUrl: './migration-country.component.html',
  styleUrls: ['./migration-country.component.scss']
})
export class MigrationCountryComponent {
  @Input() student!: StudentModel;
  @Input() id!: string;

  @Output() next: EventEmitter<StudentModel> = new EventEmitter<StudentModel>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();

  protected disabilityTypes: CatalogueModel[] = [];

  protected readonly PrimeIcons = PrimeIcons;
  protected form: FormGroup;
  protected formErrors: string[] = [];
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
  }

  ngOnInit(): void {
    this.form.patchValue(this.student);

    this.loadIsDisabilities();
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      informationStudent: this.newInformationStudentForm,
    });
  }

  get newInformationStudentForm(): FormGroup {
    return this.formBuilder.group({
      isFamilyEmigrant: [null, [Validators.required]],
    });
  }

  loadIsDisabilities(): void {
    this.disabilityTypes = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.YES_NO
    );
  }

  onSubmit(): void {
    if (this.validateForm()) {
        this.update();
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields(this.formErrors);
    }
  }

  update() {
    this.studentsHttpService.updateMigrationCountry(
      this.id,
      this.form.value
    ).subscribe();
    this.next.emit();
    }

  validateForm() {
    this.formErrors = [];

    if (this.isFamilyEmigrantField.errors) this.formErrors.push('Algun familiar emigro');

    this.formErrors.sort();
    return this.formErrors.length === 0 && this.form.valid;
  }


  /** Load Data **/
  get informationStudentForm(): FormGroup {
    return this.form.controls['informationStudent'] as FormGroup;
  }

  get isFamilyEmigrantField(): AbstractControl {
    return this.informationStudentForm.controls['isFamilyEmigrant'];
  }

}
