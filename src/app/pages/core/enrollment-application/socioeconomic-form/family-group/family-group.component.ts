import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PrimeIcons} from 'primeng/api';
import {CatalogueModel, StudentModel} from '@models/core';
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  MessageService,
  RoutesService,
  StudentsHttpService,
} from '@services/core';
import {CatalogueTypeEnum} from '@shared/enums';

@Component({
  selector: 'app-family-group',
  templateUrl: './family-group.component.html',
  styleUrls: ['./family-group.component.scss']
})
export class FamilyGroupComponent {
  @Input() student!: StudentModel;
  @Input() id!: string;

  @Output() next: EventEmitter<StudentModel> = new EventEmitter<StudentModel>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();

  protected readonly PrimeIcons = PrimeIcons;
  protected form: FormGroup;
  protected formErrors: string[] = [];

  protected familyIncomes: CatalogueModel[] = [];
  protected yesNo: CatalogueModel[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    protected messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private studentsHttpService: StudentsHttpService
  ) {
    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
    }

    this.form = this.newForm;
  }

  ngOnInit(): void {
    this.form.patchValue(this.student);

    this.loadFamilyIncomes();
    this.loadYesNo();
  }


  get newForm(): FormGroup {
    return this.formBuilder.group({
      informationStudent: this.newInformationStudentForm,
    });
  }

  get newInformationStudentForm(): FormGroup {
    return this.formBuilder.group({
      membersHouseNumber: [null, [Validators.required]],
      familyIncome: [null, [Validators.required]],
      isDependsEconomically: [null, [Validators.required]]
    });
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
    this.studentsHttpService.updateFamilyGroup(
      this.id,
      this.form.value
    ).subscribe();
    this.next.emit();
  }

  validateForm() {
    this.formErrors = [];

    if (this.membersHouseNumberField.errors) this.formErrors.push('numero de miembros del hogar');
    if (this.familyIncomeField.errors) this.formErrors.push('Ingresos mensuales');
    if (this.isDependsEconomicallyField.errors) this.formErrors.push('Depende de economicamente de otra persona');

    this.formErrors.sort();
    return this.formErrors.length === 0 && this.form.valid;
  }

  loadFamilyIncomes(): void {
    this.familyIncomes = this.cataloguesHttpService.findByType(
      CatalogueTypeEnum.FAMILY_INCOME
    );
  }

  loadYesNo(): void {
    this.yesNo = this.cataloguesHttpService.findByType(
      CatalogueTypeEnum.YES_NO
    );
  }

  get informationStudentField(): FormGroup {
    return this.form.controls['informationStudent'] as FormGroup;
  }

  get membersHouseNumberField(): AbstractControl {
    return this.informationStudentField.controls['membersHouseNumber'];
  }

  get familyIncomeField(): AbstractControl {
    return this.informationStudentField.controls['familyIncome'];
  }

  get isDependsEconomicallyField(): AbstractControl {
    return this.informationStudentField.controls['isDependsEconomically'];
  }
}
