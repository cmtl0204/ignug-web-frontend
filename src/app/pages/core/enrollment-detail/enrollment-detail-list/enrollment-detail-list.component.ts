import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from "primeng/api";
import { ColumnModel, InstitutionModel, PaginatorModel, SelectEnrollmentDto, EnrollmentModel, SubjectModel, CareerModel, CatalogueModel, SchoolPeriodModel, SelectEnrollmentDetailDto, EnrollmentDetailModel } from '@models/core';
import {
  BreadcrumbService,
  CareersHttpService,
  CareersService,
  CataloguesHttpService,
  CoreService,
  EnrollmentsHttpService,
  MessageService,
  RoutesService,
  SchoolPeriodsHttpService
} from '@services/core';
import { IdButtonActionEnum, BreadcrumbEnum, CatalogueCoreTypeEnum, ClassButtonActionEnum, IconButtonActionEnum, LabelButtonActionEnum } from "@shared/enums";
import { EnrollmentDetailsHttpService } from '@services/core/enrollment-details-http.service';

@Component({
  selector: 'app-enrollment-detail-list',
  templateUrl: './enrollment-detail-list.component.html',
  styleUrls: ['./enrollment-detail-list.component.scss']
})
export class EnrollmentDetailListComponent implements OnInit {
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
  protected selectedItem: SelectEnrollmentDetailDto = {};
  protected selectedItems: EnrollmentDetailModel[] = [];
  protected items: EnrollmentDetailModel[] = [];
  protected schoolPeriods: SchoolPeriodModel[] = [];
  protected careers: CareerModel[] = [];
  protected academicPeriods: CatalogueModel[] = [];
  protected selectedEnrollment: FormControl = new FormControl();
  protected selectedSchoolPeriod: FormControl = new FormControl();
  protected selectedAcademicPeriod: FormControl = new FormControl();
  protected state: CatalogueModel[] = [];
  protected isVisible: boolean = false;

  matriculados: string[] = [];
  enProceso: string[] = [];
  retirados: string[] = [];
  anulados: string[] = [];

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
    private enrollmentDetailsHttpService: EnrollmentDetailsHttpService,

  ) {
    this.breadcrumbService.setItems([{ label: BreadcrumbEnum.ENROLLMENTS }]);

    this.paginator = this.coreService.paginator;

    this.search.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.findEnrollmentDetailsByEnrollment();
      }
    });
  }

  ngOnInit() {
    this.findEnrollmentDetailsByEnrollment();
    this.findSchoolPeriods();
    this.findAcademicPeriods();
    this.findCareers();
    this.cargarDatosCategorias();
  }

  findSchoolPeriods() {
    this.schoolPeriodsHttpService.findAll().subscribe(
      schoolPeriods => {
        this.schoolPeriods = schoolPeriods;
      }
    )
  }

  findCareers(){
    this.careers = this.careersService.careers;
  }
  findAcademicPeriods(){
    this.academicPeriods = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.ACADEMIC_PERIOD);
  }

  filterEnrollmentsByState(){
    this.state = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.ENROLLMENTS_STATE);
  }

  cargarDatosCategorias() {
    this.matriculados = ['Estado1', 'Estado2', 'Estado3'];
    this.enProceso = ['Estado4', 'Estado5'];
    this.retirados = [];
    this.anulados = ['Estado6'];
  }


  /** Load Data **/
  findEnrollmentDetailsByEnrollment(page: number = 0) {
    this.enrollmentsHttpService.findEnrollmentDetailsByEnrollment(this.selectedEnrollment.value?.id, this.search.value)
    .subscribe((response) => {
      this.paginator = response.pagination!;
      this.items = response.data
    });
  }


  /** Build Data **/
  get buildColumns(): ColumnModel[] {
    return [
      {field: 'number', header: 'Numero de matricula'},
      {field: 'subject', header: 'Asignaturas'},
      {field: 'parallel', header: 'Paralelo'},
      {field: 'workday', header: 'Jornada'},
      {field: 'type', header: 'Tipo de Matrícula'},
      {field: 'academicPeriod', header: 'Periodo académico'},
      {field: 'observation', header: 'Observaciones'}
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
        label: 'Aprobar',
        icon: PrimeIcons.BOOK,
        command: () => {
          if (this.selectedItem?.id) this.approve(this.selectedItem.id);
        },
      },
      {
        label: 'Rechazar',
        icon: PrimeIcons.BOOK,
        command: () => {
          if (this.selectedItem?.id) this.reject(this.selectedItem.id);
        },
      },
      {
        label: 'Matricular',
        icon: PrimeIcons.BOOK,
        command: () => {
          if (this.selectedItem?.id) this.enroll(this.selectedItem.id);
        },
      },
      {
        label: 'Anular',
        icon: PrimeIcons.BAN,
        command: () => {
          if (this.selectedItem?.id) this.revoke(this.selectedItem.id);
        },
      },
      {
        label: 'Descargar Certificado',
        icon: PrimeIcons.DOWNLOAD,
        command: () => {
          if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
        },
      },
    ];
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
        this.enrollmentDetailsHttpService.removeAll(this.selectedItems).subscribe(() => {
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
    this.enrollmentDetailsHttpService.enroll(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
    });
  }

  revoke(id: string) {
    this.enrollmentDetailsHttpService.revoke(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
    });
  }

  approve(id: string) {
    this.enrollmentDetailsHttpService.approve(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
    });
  }

  reject(id: string) {
    this.enrollmentDetailsHttpService.reject(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
    });
  }

  downloadModal() {
    this.isVisible = true;
  }

  /** Select & Paginate **/
  selectItem(item: EnrollmentDetailModel) {
    this.isButtonActions = true;
    this.selectedItem = item;
  }

  paginate(event: any) {
    this.findEnrollmentDetailsByEnrollment(event.page);
  }

  /** Redirects **/
  redirectCreateForm() {
    this.router.navigate([this.routesService.enrollments, 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate([this.routesService.enrollments, id]);
  }

  redirectEnrollmentDetails(id: string) {
    this.router.navigate([this.routesService.enrollmentDetails, id]);
  }
}
