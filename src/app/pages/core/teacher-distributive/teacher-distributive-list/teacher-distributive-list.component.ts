import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {
  ColumnModel,
  PaginatorModel,
  TeacherDistributiveModel,
  SelectTeacherDistributiveDto
} from '@models/core';
import {
  BreadcrumbService,
  CoreService, EventsService,
  MessageService,
  RoutesService,
  TeacherDistributivesHttpService, TeacherDistributivesService, SchoolPeriodsService, TeachersService, SubjectsService
} from '@services/core';
import {ActionButtonsEnum, BreadcrumbEnum} from "@shared/enums";

@Component({
  selector: 'app-teacher-distributive-list',
  templateUrl: './teacher-distributive-list.component.html',
  styleUrls: ['./teacher-distributive-list.component.scss']
})
export class TeacherDistributiveListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected actionButtons: MenuItem[] = [];
  protected columns: ColumnModel[] = this.buildColumns;
  protected isActionButtons: boolean = false;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected selectedItem: SelectTeacherDistributiveDto = {};
  protected selectedItems: TeacherDistributiveModel[] = [];
  protected items: TeacherDistributiveModel[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    public coreService: CoreService,
    public messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private teacherDistributivesHttpService: TeacherDistributivesHttpService,
    private teacherDistributivesService: TeacherDistributivesService,
    private eventsService: EventsService,
    protected schoolPeriodsService: SchoolPeriodsService,
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.TEACHER_DISTRIBUTIVES},
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
    this.teacherDistributivesHttpService.findAll(page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.items = response.data;
      });
  }

  /** Build Data **/
  get buildColumns(): ColumnModel[] {
    return [
      { field: 'paralell', header: 'Paralelo' },
      { field: 'teacher', header: 'Profesor' },
      { field: 'schoolPeriod', header: 'Periodo Escolar' },
      { field: 'subject', header: 'Materia' },
      { field: 'workday', header: 'Jornada de trabajo' },
      { field: 'hours', header: 'Horas' }
    ];
  }

  buildActionButtons(): void {
    this.actionButtons = [];

    this.actionButtons.push(
      {
        id: ActionButtonsEnum.UPDATE,
        label: 'Actualizar',
        icon: PrimeIcons.PENCIL,
        command: () => {
          if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
        },
      });

    this.actionButtons.push(
      {
        id: ActionButtonsEnum.DELETE,
        label: 'Eliminar',
        icon: PrimeIcons.TRASH,
        command: () => {
          if (this.selectedItem?.id) this.remove(this.selectedItem.id);
        },
      });
  }

  /** Actions **/
  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.teacherDistributivesHttpService.remove(id).subscribe(() => {
            this.items = this.items.filter(item => item.id !== id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.teacherDistributivesHttpService.removeAll(this.selectedItems).subscribe(() => {
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
  selectItem(item: TeacherDistributiveModel) {
    this.isActionButtons = true;
    this.selectedItem = item;
    this.teacherDistributivesService.teacherDistributive = item;
    this.buildActionButtons();
  }

  paginate(event: any) {
    this.findAll(event.page);
  }

  /** Redirects **/
  redirectCreateForm() {
    this.router.navigate([this.routesService.teacherDistributives, 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate([this.routesService.teacherDistributives, id]);
  }

  redirectEventList() {
    this.eventsService.model = {
      entity: this.selectedItem,
      label: 'Distribución de asignaturas del docente',
      routerLink: this.routesService.teacherDistributives,
      routerLabel: 'Distribución de asignaturas del docente',
    };

    this.router.navigate([this.routesService.events]);
  }


}
