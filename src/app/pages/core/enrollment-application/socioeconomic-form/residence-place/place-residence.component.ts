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

@Component({
  selector: 'app-place-residence',
  templateUrl: './place-residence.component.html',
  styleUrls: ['./place-residence.component.scss']
})
export class PlaceResidenceComponent {
  @Input() student!: StudentModel;
  @Input() id!: string;

  @Output() next: EventEmitter<StudentModel> = new EventEmitter<StudentModel>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();

  protected readonly PrimeIcons = PrimeIcons;
  protected form: FormGroup;

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
      nearbyCity:[null, [Validators.required]],
      number:[null, [Validators.required]],
      reference:[null, [Validators.required]],
      secondaryStreet:[null, [Validators.required]]
    });
  }

  update() {
    this.studentsHttpService.updateOriginPlace(
      this.id,
      this.form.value
    ).subscribe();
    this.next.emit();
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

  get nearbyCityField(): AbstractControl {
    return this.originAdreesForm.controls['nearbyCity'];
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
