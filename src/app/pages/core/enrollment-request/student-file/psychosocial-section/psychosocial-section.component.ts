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
  selector: 'app-psychosocial-section',
  templateUrl: './psychosocial-section.component.html',
  styleUrls: ['./psychosocial-section.component.scss']
})
export class PsychosocialSectionComponent {
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;

  protected yesno: CatalogueModel[] = [];
  protected violenceTypes: CatalogueModel[] = [];
  protected covids: CatalogueModel[]=[]
  protected discriminationType: CatalogueModel[] = []
  protected selfHarmTypes: CatalogueModel[] = []
  protected urbanTypes: CatalogueModel[] =[]



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
    this.loadYesNo();
    this.loadViolenceTypes();
    this.loadCovids();
    this.loadDiscriminationType();
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      psychosocialSection: this.psychosocialSectionForm,
    });
  }

  get psychosocialSectionForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      isviolence: [null, [Validators.required]],
      violenceType:[null, [Validators.required]],
      covid:[null, [Validators.required]],
      suiced: [null, [Validators.required]],
      discrimination: [null, [Validators.required]],
      isDiscrimination: [null, [Validators.required]],
      selfHarm: [null, [Validators.required]],
      selfHarmType:[null, [Validators.required]],
      urbanType:[null, [Validators.required]],
      additionalData:[null, [Validators.required]]
    });
  }

  loadYesNo(): void {
    this.yesno = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.YES_NO
    );
  }

  loadViolenceTypes(): void {
    this.violenceTypes = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.DISABILITY_TYPE
    );
  }

  loadCovids(): void {
    this.covids = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.DISABILITY_TYPE
    );
  }
  
  loadDiscriminationType(): void {
    this.discriminationType = this.cataloguesHttpService.findByType(
      CatalogueCoreTypeEnum.DISABILITY_TYPE
    );
  }

  get psychosocialSectionField(): FormGroup {
    return this.form.controls['psychosocialSection'] as FormGroup;
  }

  get isviolenceField(): AbstractControl {
    return this.psychosocialSectionField.controls['isviolence'];
  }

  get violenceTypeField(): AbstractControl {
    return this.psychosocialSectionField.controls['violenceType'];
  }

  get covidField(): AbstractControl {
    return this.psychosocialSectionField.controls['covid'];
  }

  get suicedField(): AbstractControl {
    return this.psychosocialSectionField.controls['suiced'];
  }
  
  get discriminationField(): AbstractControl {
    return this.psychosocialSectionField.controls['discrimination'];
  }

  get isDiscriminationField(): AbstractControl {
    return this.psychosocialSectionField.controls['isDiscrimination'];
  }

  get selfHarmField(): AbstractControl {
    return this.psychosocialSectionField.controls['selfHarm'];
  }

  get selfHarmTypeField(): AbstractControl {
    return this.psychosocialSectionField.controls['selfHarmType'];
  }

  get urbanTypeField(): AbstractControl {
    return this.psychosocialSectionField.controls['urbanType'];
  }

  get additionalDataField(): AbstractControl {
    return this.psychosocialSectionField.controls['additionalData'];
  }

}
