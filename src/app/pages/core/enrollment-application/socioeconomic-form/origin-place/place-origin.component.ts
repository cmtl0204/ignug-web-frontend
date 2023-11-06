import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  StudentsHttpService,
} from '@services/core';
import {
  CatalogueCoreTypeEnum,
} from '@shared/enums';
import { UsersHttpService } from '@services/auth';
import { UserModel } from '@models/auth';

@Component({
  selector: 'app-place-origin',
  templateUrl: './place-origin.component.html',
  styleUrls: ['./place-origin.component.scss']
})

export class PlaceOriginComponent implements OnInit{
  @Input() student!: StudentModel;
  @Input() id!: string;

  @Output() next: EventEmitter<StudentModel> = new EventEmitter<StudentModel>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();

  protected readonly PrimeIcons = PrimeIcons;
  protected form: FormGroup;
  protected formErrors: string[] = [];

  protected provinces: CatalogueModel[] = [];
  protected cantons: CatalogueModel[] = [];
  protected parishs: CatalogueModel[] = [];

  constructor(
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    protected messageService: MessageService,
    private studentsHttpService: StudentsHttpService
  ) {

    this.form = this.newForm;
  }

  ngOnInit(): void {
    this.form.patchValue(this.student);

    this.loadProvinces();
    this.loadCantons();
    this.loadParishs()
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      user: this.newUserForm
    });
  }


  get newUserForm(): FormGroup {
    return this.formBuilder.group({
      originAddress : this.newOriginAdress
    });
  }

  get newOriginAdress(): FormGroup {
    return this.formBuilder.group({
      province: [null, [Validators.required]],
      canton:[null, [Validators.required]],
      parrish:[null, [Validators.required]],
      community:[null, [Validators.required]],
      latitude: [null, [Validators.required]],
      longitude:[null, [Validators.required]],
      mainStreet:[null, [Validators.required]],
      number:[null, [Validators.required]],
      reference:[null, [Validators.required]],
      secondaryStreet:[null, [Validators.required]]
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
    this.studentsHttpService.updateOriginPlace(
      this.id,
      this.form.value
    ).subscribe();
    this.next.emit();
  }

  validateForm() {
    this.formErrors = [];

    if (this.provinceField.errors) this.formErrors.push('Provincia');
    if (this.cantonField.errors) this.formErrors.push('Canton');
    if (this.parrishField.errors) this.formErrors.push('Parroquia');
    if (this.communityField.errors) this.formErrors.push('Comunidad');
    if (this.latitudeField.errors) this.formErrors.push('Latitud');
    if (this.longitudeField.errors) this.formErrors.push('Longitud');
    if (this.mainStreetField.errors) this.formErrors.push('Calle principal');
    if (this.numberField.errors) this.formErrors.push('Numero de casa');
    if (this.referenceField.errors) this.formErrors.push('Referencia');
    if (this.secondaryStreeteField.errors) this.formErrors.push('Calle secundaria');

    this.formErrors.sort();
    return this.formErrors.length === 0 && this.form.valid;
  }


  loadProvinces(): void {
    this.provinces = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.YES_NO
    );
  }

  loadCantons(): void {
    this.cantons = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.YES_NO
    );
  }


  loadParishs(): void {
    this.parishs = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.YES_NO
    );
  }


  get userForm(): FormGroup {
    return this.form.controls['user'] as FormGroup;
  }

  get originAdreesForm(): FormGroup {
    return this.userForm.controls['originAddress'] as FormGroup;
  }

  get provinceField(): AbstractControl {
    return this.originAdreesForm.controls['province'];
  }

  get cantonField(): AbstractControl {
    return this.originAdreesForm.controls['canton'];
  }

  get parrishField(): AbstractControl {
    return this.originAdreesForm.controls['parrish'];
  }

  get communityField(): AbstractControl {
    return this.originAdreesForm.controls['community'];
  }

  get latitudeField(): AbstractControl {
    return this.originAdreesForm.controls['latitude'];
  }

  get longitudeField(): AbstractControl {
    return this.originAdreesForm.controls['longitude'];
  }

  get mainStreetField(): AbstractControl {
    return this.originAdreesForm.controls['mainStreet'];
  }

  get numberField(): AbstractControl {
    return this.originAdreesForm.controls['number'];
  }

  get referenceField(): AbstractControl {
    return this.originAdreesForm.controls['reference'];
  }

  get secondaryStreeteField(): AbstractControl {
    return this.originAdreesForm.controls['secondaryStreet'];
  }

}
