import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from "primeng/api";
import {ColumnModel, EnrollmentModel, InstitutionModel, PaginatorModel, SelectInstitutionDto} from '@models/core';
import {BreadcrumbService, CoreService, EnrollmentsHttpService, InstitutionsHttpService, MessageService, RoutesService} from '@services/core';
import {BreadcrumbEnum} from "@shared/enums";

@Component({
  selector: 'app-subject-grade-list',
  templateUrl: './subject-grade-list.component.html',
  styleUrls: ['./subject-grade-list.component.scss'],
})
export class SubjectGradeListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected buttonActions: MenuItem[] = this.buildButtonActions;
  protected columns: ColumnModel[] = this.buildColumns;
  protected isButtonActions: boolean = false;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected selectedItem: SelectInstitutionDto = {};
  protected selectedItems: EnrollmentModel[] = [];
  protected items: InstitutionModel[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    public coreService: CoreService,
    public messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private enrollmentsHttpService: EnrollmentsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.ENROLLMENTS, routerLink: [this.routesService.enrollments]},
      {label: BreadcrumbEnum.ENROLLMENT_SUBJECTS},
    ]);
    this.paginator = this.coreService.paginator;
    this.search.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.findAll();
      }
    });
  }

  ngOnInit() {
    this.findAll();
  }

  /** Load Data **/
  findAll(page: number = 0) {
    this.enrollmentsHttpService.findAll(page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.items = response.data
      });
  }

  /** Build Data **/
  get buildColumns(): ColumnModel[] {
    return [
      {field: 'subject', header: 'Asignatura'},
      {field: '', header: 'Nota Parcial 1'},
      {field: '', header: 'Nota Parcial 2'},
      {field: '', header: 'Asistencia Parcial 1'},
      {field: '', header: 'Asistencia Parcial 2'},
      {field: 'finalGrade', header: 'Nota Final'},
      {field: 'finalAttendance', header: 'Asistencia Final'},
      {field: 'academicState', header: 'Estado Academico'},
    ];
  }

  get buildButtonActions(): MenuItem[] {
    return [
      {
        label: 'Actualizar',
        icon: PrimeIcons.PENCIL,
        command: () => {
          if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
        },
      },
      {
        label: 'Eliminar',
        icon: PrimeIcons.TRASH,
        command: () => {
          if (this.selectedItem?.id) this.remove(this.selectedItem.id);
        },
      },
      {
        label: 'Reporte de Notas',
        icon: PrimeIcons.LOCK_OPEN,
        command: () => {
          this.router.navigate([this.routesService.careers]);
        },
      }
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

  /** Select & Paginate **/
  selectItem(item: InstitutionModel) {
    this.isButtonActions = true;
    this.selectedItem = item;
  }

  paginate(event: any) {
    this.findAll(event.page);
  }

  /** Redirects **/
  redirectCreateForm() {
    this.router.navigate([this.routesService.institutions, 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate([this.routesService.institutions, id]);
  }
}


