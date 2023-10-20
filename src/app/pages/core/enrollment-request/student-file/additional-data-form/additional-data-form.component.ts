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
  selector: 'app-additional-data-form',
  templateUrl: './additional-data-form.component.html',
  styleUrls: ['./additional-data-form.component.scss'],
})
export class AdditionalDataFormComponent {
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;

  protected haveTecnologic: CatalogueModel[] = [];
  protected internetTpes: CatalogueModel[] = [];
  protected yesno: CatalogueModel[]= []

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
    this.loadhHaveTecnologics();
    this.loadInternetTypes();
    this.loadYesNo();
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      aditionalAcademicData: this.aditionalAcademicDataForm,
    });
  }

  get aditionalAcademicDataForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      haveTecnologic: [null, [Validators.required]],
      isInternet:[null, [Validators.required]],
      internetType:[null],
    });
  }

  loadhHaveTecnologics(): void {
    this.haveTecnologic = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.YES_NO_NA
    );
  }

  loadInternetTypes(): void {
    this.internetTpes = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.DISABILITY_TYPE
    );
  }

  loadYesNo(): void {
    this.yesno = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.YES_NO
    );
  }

  get aditionalAcademicDataField(): FormGroup {
    return this.form.controls['aditionalAcademicData'] as FormGroup;
  }

  get haveTecnologicField(): AbstractControl {
    return this.aditionalAcademicDataField.controls['haveTecnologic'];
  }

  get isInternetField(): AbstractControl {
    return this.aditionalAcademicDataField.controls['isInternet'];
  }

  get internetTypeField(): AbstractControl {
    return this.aditionalAcademicDataField.controls['internetType'];
  }


}
