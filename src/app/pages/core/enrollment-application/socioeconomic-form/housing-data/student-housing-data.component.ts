import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { CatalogueModel, StudentModel } from '@models/core';
import {
  CataloguesHttpService,
  CoreService,
  MessageService,
  RoutesService,
  StudentsHttpService,
} from '@services/core';
import {
  BreadcrumbEnum,
  CatalogueTypeEnum,
  SkeletonEnum,
} from '@shared/enums';

@Component({
  selector: 'app-student-housing-data',
  templateUrl: './student-housing-data.component.html',
  styleUrls: ['./student-housing-data.component.scss']
})
export class StudentHousingDataComponent {
  @Input() student!: StudentModel;
  @Input() id!: string;

  @Output() next: EventEmitter<StudentModel> = new EventEmitter<StudentModel>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();

  protected readonly Validators = Validators;
  protected readonly PrimeIcons = PrimeIcons;
  protected form: FormGroup;
  protected formErrors: string[] = [];

  protected houseTypes: CatalogueModel[] = [];
  protected housingTypes: CatalogueModel[] = [];
  protected roofTypes: CatalogueModel[] = []
  protected floorTypes: CatalogueModel[] = [];
  protected wallTypes: CatalogueModel[] = [];
  protected waterTypes: CatalogueModel[] = []
  protected yesNo: CatalogueModel[] = []
  protected isOutages: CatalogueModel[] = []
  protected receives: CatalogueModel[] = []

  constructor(
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    protected messageService: MessageService,
    private studentsHttpService: StudentsHttpService
  ) {

    this.form = this.newForm;
    this.applyValidations();
  }

  ngOnInit(): void {
    this.form.patchValue(this.student);

    this.loadIsDisabilities();
    this.loaddisabilityTypes();
    this.loadRoffTypes();
    this.loadRoffTypes();
    this.loadWallTypes();
    this.loadWaterTypes();
    this.loadYesNo();
    this.loadOutage();
    this.loadReceives();

  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      informationStudent: this.newInformationStudentForm,
    });
  }

  get newInformationStudentForm(): FormGroup {
    return this.formBuilder.group({
      studentLive:[null, [Validators.required]],
      homeOwnership: [null, [Validators.required]],
      homeType:[null, [Validators.required]],
      homeRoof:[null, [Validators.required]],
      homeFloor: [null, [Validators.required]],
      homeWall: [null, [Validators.required]],
      isWaterService:[null, [Validators.required]],
      waterServiceType: [null],
      isElectricService: [null, [Validators.required]],
      electricServiceBlackout: [null],
      isPhoneService:[null, [Validators.required]],
      isSewerageService:[null, [Validators.required]],
      sewerageServiceType:[null],
      isEconomicContribution:[null, [Validators.required]],
      isFamilyEconomicAid:[null, [Validators.required]],
      consumeNewsType: [null, [Validators.required]]
    });
  }


  applyValidations(){
    this.isWaterServiceField.valueChanges.subscribe(value => {
      if(value.code === '1'){
        this.waterServiceTypeField.addValidators(Validators.required);
     } else {
        this.waterServiceTypeField.removeValidators(Validators.required);
     }
     this.waterServiceTypeField.updateValueAndValidity();
     })

     this.isElectricServiceField.valueChanges.subscribe(value => {
      if(value.code === '1'){
        this.electricServiceBlackoutField.addValidators(Validators.required);
     } else {
        this.electricServiceBlackoutField.removeValidators(Validators.required);
     }
     this.electricServiceBlackoutField.updateValueAndValidity();
     })

     this.isSewerageServiceField.valueChanges.subscribe(value => {
      if(value.code === '1'){
        this.sewerageServiceTypeField.addValidators(Validators.required);
     } else {
        this.sewerageServiceTypeField.removeValidators(Validators.required);
     }
     this.sewerageServiceTypeField.updateValueAndValidity();
     })
    }

  loadIsDisabilities(): void {
    this.houseTypes = this.cataloguesHttpService.findByType(
      CatalogueTypeEnum.YES_NO_NA
    );
  }

  loadYesNo(): void {
    this.yesNo = this.cataloguesHttpService.findByType(
      CatalogueTypeEnum.YES_NO_NA
    );
  }

  loaddisabilityTypes(): void {
    this.housingTypes = this.cataloguesHttpService.findByType(
      CatalogueTypeEnum.DISABILITY_TYPE
    );
  }

  loadRoffTypes(): void {
    this.roofTypes = this.cataloguesHttpService.findByType(
      CatalogueTypeEnum.DISABILITY_TYPE
    );
  }

  loadFloorTypes(): void {
    this.floorTypes = this.cataloguesHttpService.findByType(
      CatalogueTypeEnum.DISABILITY_TYPE
    );
  }

  loadWallTypes(): void {
    this.wallTypes = this.cataloguesHttpService.findByType(
      CatalogueTypeEnum.DISABILITY_TYPE
    );
  }

  loadWaterTypes(): void {
    this.waterTypes = this.cataloguesHttpService.findByType(
      CatalogueTypeEnum.DISABILITY_TYPE
    );
  }

  loadOutage(): void {
    this.isOutages = this.cataloguesHttpService.findByType(
      CatalogueTypeEnum.DISABILITY_TYPE
    );
  }

  loadReceives(): void {
    this.receives = this.cataloguesHttpService.findByType(
      CatalogueTypeEnum.DISABILITY_TYPE
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
    this.studentsHttpService.updateHousingData(
      this.id,
      this.form.value
    ).subscribe();
    this.next.emit();
  }


  validateForm() {
    this.formErrors = [];

    if (this.studentLiveField.errors) this.formErrors.push('Con quien vive el estudiante');
    if (this.homeOwnershipField.errors) this.formErrors.push('Tipo de vivienda');
    if (this.homeTypeField.errors) this.formErrors.push('Tipo de casa');
    if (this.homeRoofField.errors) this.formErrors.push('Tipo de techo');
    if (this.homeFloorField.errors) this.formErrors.push('Tipo de piso');
    if (this.homeWallField.errors) this.formErrors.push('Tipo de pared');
    if (this.isWaterServiceField.errors) this.formErrors.push('posee servicio de agua');
    if (this.waterServiceTypeField.errors) this.formErrors.push('TIpo de servicio de aguas');
    if (this.isSewerageServiceField.errors) this.formErrors.push('Posee servicio de alcantarillado');
    if (this.sewerageServiceTypeField.errors) this.formErrors.push('Tipo de servicio de alcantarillado');
    if (this.isElectricServiceField.errors) this.formErrors.push('Posee servicio electrico');
    if (this.electricServiceBlackoutField.errors) this.formErrors.push('Frecuencia de apagones');
    if (this.isPhoneServiceField.errors) this.formErrors.push('Posee servicio telefonico');
    if (this.isEconomicContributionField.errors) this.formErrors.push('Recibe aportes');
    if (this.isFamilyEconomicAidField.errors) this.formErrors.push('Beca o bono');
    if (this.consumeNewsTypeField.errors) this.formErrors.push('En que medios consume noticias');

    this.formErrors.sort();
    return this.formErrors.length === 0 && this.form.valid;
  }


  get informationStudentForm(): FormGroup {
    return this.form.controls['informationStudent'] as FormGroup;
  }

  get studentLiveField(): AbstractControl {
    return this.informationStudentForm.controls['studentLive'];
  }

  get homeOwnershipField(): AbstractControl {
    return this.informationStudentForm.controls['homeOwnership'];
  }

  get homeTypeField(): AbstractControl {
    return this.informationStudentForm.controls['homeType'];
  }

  get homeRoofField(): AbstractControl {
    return this.informationStudentForm.controls['homeRoof'];
  }

  get homeFloorField(): AbstractControl {
    return this.informationStudentForm.controls['homeFloor'];
  }

  get homeWallField(): AbstractControl {
    return this.informationStudentForm.controls['homeWall'];
  }

  get isWaterServiceField(): AbstractControl {
    return this.informationStudentForm.controls['isWaterService'];
  }

  get waterServiceTypeField(): AbstractControl {
    return this.informationStudentForm.controls['waterServiceType'];
  }

  get isSewerageServiceField(): AbstractControl {
    return this.informationStudentForm.controls['isSewerageService'];
  }

  get sewerageServiceTypeField(): AbstractControl {
    return this.informationStudentForm.controls['sewerageServiceType'];
  }

  get isElectricServiceField(): AbstractControl {
    return this.informationStudentForm.controls['isElectricService'];
  }

  get electricServiceBlackoutField(): AbstractControl {
    return this.informationStudentForm.controls['electricServiceBlackout'];
  }

  get isPhoneServiceField(): AbstractControl {
    return this.informationStudentForm.controls['isPhoneService'];
  }

  get isEconomicContributionField(): AbstractControl {
    return this.informationStudentForm.controls['isEconomicContribution'];
  }

  get isFamilyEconomicAidField(): AbstractControl {
    return this.informationStudentForm.controls['isFamilyEconomicAid'];
  }

  get consumeNewsTypeField(): AbstractControl {
    return this.informationStudentForm.controls['consumeNewsType'];
  }
}
