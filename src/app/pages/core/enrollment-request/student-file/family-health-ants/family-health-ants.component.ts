import { Component, OnInit } from '@angular/core';
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
  selector: 'app-family-health-ants',
  templateUrl: './family-health-ants.component.html',
  styleUrls: ['./family-health-ants.component.scss']
})
export class FamilyHealthAntsComponent {
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;

  protected yesno: CatalogueModel[] = [];
  protected diseaseWhos: CatalogueModel[] = [];
  protected disabilityWhos: CatalogueModel[] = [];

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
    this.breadcrumbService.setItems([
      {
        label: BreadcrumbEnum.STUDENTS,
        routerLink: [this.routesService.students],
      },
      { label: BreadcrumbEnum.FORM },
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
    }

    this.form = this.newForm;
  }

  ngOnInit(): void {
    this.loadYesNO();
    this.loadDiseaseWhos()
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      FamilyData: this.FamilyDataForm,
    });
  }

  get FamilyDataForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      disease: [null, [Validators.required]],
      diseaseWho:[null],
      diseaseType:[null],
      isDisability: [null, [Validators.required]],
      disabilityPorcentage: [null],
      disabilityWho: [null],
    });
  }

  loadYesNO(): void {
    this.yesno = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.YES_NO
    );
  }

  loadDiseaseWhos(): void {
    this.diseaseWhos = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.DISABILITY_TYPE
    );
  }

  loadDisabilityWhos(): void {
    this.disabilityWhos = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.DISABILITY_TYPE
    );
  }

  get FamilyDataField(): FormGroup {
    return this.form.controls['FamilyData'] as FormGroup;
  }

  get diseaseField(): AbstractControl {
    return this.FamilyDataField.controls['disease'];
  }

  get diseaseWhoField(): AbstractControl {
    return this.FamilyDataField.controls['diseaseWho'];
  }

  get diseaseTypeField(): AbstractControl {
    return this.FamilyDataField.controls['diseaseType'];
  }

  get isDisabilityField(): AbstractControl {
    return this.FamilyDataField.controls['isDisability'];
  }
  
  get disabilityPorcentageField(): AbstractControl {
    return this.FamilyDataField.controls['disabilityPorcentage'];
  }

  get disabilityWhoField(): AbstractControl {
    return this.FamilyDataField.controls['disabilityWho'];
  }
}
