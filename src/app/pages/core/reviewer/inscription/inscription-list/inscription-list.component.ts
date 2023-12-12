import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from "primeng/api";
import {
  ColumnModel,
  PaginatorModel,
  SelectEnrollmentDto,
  EnrollmentModel,
  CareerModel,
  CatalogueModel,
  SchoolPeriodModel
} from '@models/core';
import {
  BreadcrumbService,
  CareersHttpService,
  CareersService,
  CataloguesHttpService,
  CoreService,
  EnrollmentsHttpService,
  MessageService,
  RoutesService,
  SchoolPeriodsHttpService, SchoolPeriodsService
} from '@services/core';
import {
  IdButtonActionEnum,
  BreadcrumbEnum,
  CatalogueTypeEnum,
  ClassButtonActionEnum,
  IconButtonActionEnum,
  LabelButtonActionEnum,
  CatalogueEnrollmentStateEnum
} from "@shared/enums";

@Component({
  selector: 'app-inscription-list',
  templateUrl: './inscription-list.component.html',
  styleUrls: ['./inscription-list.component.scss'],
})
export class InscriptionListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly ClassButtonActionEnum = ClassButtonActionEnum;
  protected readonly BreadcrumbEnum = BreadcrumbEnum;
  protected buttonActions: MenuItem[] = this.buildButtonActions;
  protected columns: ColumnModel[] = this.buildColumns;
  protected isButtonActions: boolean = false;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected selectedItem: SelectEnrollmentDto = {};
  protected selectedItems: EnrollmentModel[] = [];
  protected items: EnrollmentModel[] = [];
  protected schoolPeriods: SchoolPeriodModel[] = [];
  protected careers: CareerModel[] = [];
  protected academicPeriods: CatalogueModel[] = [];
  protected selectedCareer: FormControl = new FormControl();
  protected selectedSchoolPeriod: FormControl = new FormControl();
  protected selectedAcademicPeriod: FormControl = new FormControl();
  protected state: CatalogueModel[] = [];
  protected isVisible: boolean = false;
  protected isFileList: boolean = false;
  protected fileTypes: CatalogueModel[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    public coreService: CoreService,
    public messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private enrollmentsHttpService: EnrollmentsHttpService,
    private cataloguesHttpService: CataloguesHttpService,
    private schoolPeriodsHttpService: SchoolPeriodsHttpService,
    private careersService: CareersService,
    private careersHttpService: CareersHttpService,
    private schoolPeriodsService: SchoolPeriodsService,
  ) {
    this.breadcrumbService.setItems([{label: BreadcrumbEnum.INSCRIPTIONS}]);

    this.paginator = this.coreService.paginator;

    this.search.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.findEnrollmentsByCareer();
      }
    });

    this.selectedSchoolPeriod.valueChanges.subscribe(value => {
      this.findEnrollmentsByCareer();
    });

    this.selectedCareer.valueChanges.subscribe(value => {
      this.findEnrollmentsByCareer();
    });

    this.selectedAcademicPeriod.valueChanges.subscribe(value => {
      this.findEnrollmentsByCareer();
    });

    this.selectedSchoolPeriod.patchValue(this.schoolPeriodsService.openSchoolPeriod);

    this.selectedCareer.patchValue(this.careersService.career);
  }

  ngOnInit() {
    this.findEnrollmentsByCareer();
    this.findSchoolPeriods();
    this.findAcademicPeriods();
    this.findCareers();
    this.loadFileTypes();
  }

  findSchoolPeriods() {
    this.schoolPeriodsHttpService.findAll().subscribe(
      schoolPeriods => {
        this.schoolPeriods = schoolPeriods;
      }
    )
  }

  findCareers() {
    this.careers = this.careersService.careers;
  }

  findAcademicPeriods() {
    this.academicPeriods = this.cataloguesHttpService.findByType(CatalogueTypeEnum.ACADEMIC_PERIOD);
  }

  /** Load Data **/
  findEnrollmentsByCareer(page: number = 0) {
    if (this.selectedCareer.value && this.selectedSchoolPeriod.value) {
      this.careersHttpService.findEnrollmentsByCareer(this.selectedCareer.value.id, this.selectedSchoolPeriod.value.id, this.selectedAcademicPeriod.value?.id, page, this.search.value)
        .subscribe((response) => {
          this.paginator = response.pagination!;
          this.items = response.data
        });
    }
  }

  /** Build Data **/
  get buildColumns(): ColumnModel[] {
    return [
      {field: 'identification', header: 'Número de Documento'},
      {field: 'lastname', header: 'Apellidos'},
      {field: 'name', header: 'Nombres'},
      {field: 'type', header: 'Tipo de Matrícula'},
      {field: 'academicPeriod', header: 'Periodo académico'},
      {field: 'workday', header: 'Jornada'},
      {field: 'parallel', header: 'Paralelo'},
      {field: 'enrollmentStates', header: 'Estado'}
    ];
  }

  get buildButtonActions() {
    return [
      {
        id: IdButtonActionEnum.UPDATE,
        label: 'Editar',
        icon: PrimeIcons.PENCIL,
        command: () => {
          if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
        },
      },
      {
        label: 'Asignaturas',
        icon: PrimeIcons.BOOK,
        command: () => {
          if (this.selectedItem?.id) this.redirectEnrollmentDetails(this.selectedItem.id);
        },
      },
      {
        id: IdButtonActionEnum.APPROVED,
        label: 'Aprobar',
        icon: PrimeIcons.CHECK,
        command: () => {
          if (this.selectedItem?.id) this.approve(this.selectedItem.id);
        },
      },
      {
        id: IdButtonActionEnum.REJECTED,
        label: 'Rechazar',
        icon: PrimeIcons.BAN,
        command: () => {
          if (this.selectedItem?.id) this.reject(this.selectedItem.id);
        },
      },
      {
        id: IdButtonActionEnum.FILE_LIST,
        label: LabelButtonActionEnum.FILE_LIST,
        icon: IconButtonActionEnum.FILE_LIST,
        command: () => {
          if (this.selectedItem?.id) this.isFileList = true;
        },

      }
    ];
  }

  validateButtonActions(item: EnrollmentModel) {
    this.buttonActions = this.buildButtonActions;
    let index = -1;

    if (item.enrollmentStates.find(enrollmentState =>
      enrollmentState.state.code === CatalogueEnrollmentStateEnum.ENROLLED ||
      enrollmentState.state.code === CatalogueEnrollmentStateEnum.REVOKED)) {
      index = this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.APPROVED);
      if (index > -1)
        this.buttonActions.splice(index, 1);

      index = this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.REJECTED)
      if (index > -1)
        this.buttonActions.splice(index, 1);
    }

    if (item.enrollmentStates.find(enrollmentState => enrollmentState.state.code === CatalogueEnrollmentStateEnum.APPROVED)) {
      index = this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.APPROVED);
      if (index > -1)
        this.buttonActions.splice(index, 1);
    }

    if (item.enrollmentStates.find(enrollmentState => enrollmentState.state.code === CatalogueEnrollmentStateEnum.REJECTED)) {
      index = this.buttonActions.findIndex(actionButton => actionButton.id === IdButtonActionEnum.REJECTED);
      if (index > -1)
        this.buttonActions.splice(index, 1);
    }
  }

  /** Actions **/
  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.enrollmentsHttpService.remove(id).subscribe(() => {
            this.items = this.items.filter(item => item.id !== id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.enrollmentsHttpService.removeAll(this.selectedItems).subscribe(() => {
          this.selectedItems.forEach(itemDeleted => {
            this.items = this.items.filter(item => item.id !== itemDeleted.id);
            this.paginator.totalItems--;
          });
          this.selectedItems = [];
        });
      }
    });
  }

  enroll(id: string) {
    this.enrollmentsHttpService.enroll(id).subscribe(item => {
      this.findEnrollmentsByCareer();
    });
  }

  revoke(id: string) {
    this.enrollmentsHttpService.revoke(id).subscribe(item => {
      this.findEnrollmentsByCareer();
    });
  }

  approve(id: string) {
    this.enrollmentsHttpService.approve(id).subscribe(item => {
      this.findEnrollmentsByCareer();
    });
  }

  reject(id: string) {
    this.enrollmentsHttpService.reject(id).subscribe(item => {
      this.findEnrollmentsByCareer();
    });
  }

  downloadModal() {
    this.isVisible = true;
  }

  loadFileTypes(): void {
    this.fileTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.ENROLLMENT_FILE_TYPE_NEW_STUDENT);
  }

  /** Select & Paginate **/
  selectItem(item: EnrollmentModel) {
    this.isButtonActions = true;
    this.selectedItem = item;
    this.validateButtonActions(item);
  }

  paginate(event: any) {
    this.findEnrollmentsByCareer(event.page);
  }

  /** Redirects **/
  redirectCreateForm() {
    this.router.navigate([this.routesService.enrollments, 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate([this.routesService.inscriptions, id]);
  }

  redirectEnrollmentDetails(id: string) {
    this.router.navigate([this.routesService.inscriptionsDetailList(this.selectedItem.id!)]);
  }
}


