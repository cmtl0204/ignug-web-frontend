import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {
  ColumnModel,
  PaginatorModel,
  SubjectModel,
  SelectSubjectDto
} from '@models/core';
import {
  BreadcrumbService,
  CoreService, EventsService,
  MessageService,
  RoutesService,
  SubjectsHttpService
} from '@services/core';
import { CurriculumsService } from '@services/core/curriculums.service';
import {BreadcrumbEnum} from "@shared/enums";

@Component({
  selector: 'app-event-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss'],

})
export class SubjectListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected actionButtons: MenuItem[] = this.buildActionButtons;
  protected columns: ColumnModel[] = this.buildColumns;
  protected isActionButtons: boolean = false;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected selectedItem: SelectSubjectDto = {};
  protected selectedItems: SubjectModel[] = [];
  protected items: SubjectModel[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    public coreService: CoreService,
    public messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private SubjectsHttpService: SubjectsHttpService,
    private eventsService: EventsService,
    protected curriculumService: CurriculumsService,
  ) {
    this.breadcrumbService.setItems([
      { label: BreadcrumbEnum.INSTITUTIONS, routerLink: [this.routesService.institutions] },
      { label: BreadcrumbEnum.CAREERS, routerLink: [this.routesService.careers] },
      { label: BreadcrumbEnum.CURRICULUMS, routerLink: [this.routesService.curriculums] },
      {label: BreadcrumbEnum.SUBJECTS},
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
    this.SubjectsHttpService.findAll(page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.items = response.data;
      });
  }

  /** Build Data **/
  get buildColumns(): ColumnModel[] {
    return [
      {field: 'code', header: 'Codigo'},
      {field: 'name', header: 'Nombre'},
      {field: 'autonomousHour', header: 'Horas autonomas'},
      {field: 'teacherHour', header: 'Horas profesor'},
      {field: 'practicalHour', header: 'Horas Practicas'},
      {field: 'academicPeriod', header: 'Periodo Academico'},
      {field: 'state', header: 'Estado'}
    ];
  }

  get buildActionButtons(): MenuItem[] {
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
        label: 'Ocultar',
        icon: PrimeIcons.EYE_SLASH,
        command: () => {
          if (this.selectedItem?.id) this.hide(this.selectedItem.id);
        },
      },
      {
        label: 'Mostrar',
        icon: PrimeIcons.EYE,
        command: () => {
          if (this.selectedItem?.id) this.reactivate(this.selectedItem.id);
        },

      },
      {
        label: 'Eventos',
        icon: PrimeIcons.BARS,
        command: () => {
          if (this.selectedItem?.id) this.redirectEventList();
        },

      }
    ];
  }

  /** Actions **/
  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.SubjectsHttpService.remove(id).subscribe(() => {
            this.items = this.items.filter(item => item.id !== id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.SubjectsHttpService.removeAll(this.selectedItems).subscribe(() => {
          this.selectedItems.forEach(itemDeleted => {
            this.items = this.items.filter(item => item.id !== itemDeleted.id);
            this.paginator.totalItems--;
          });
          this.selectedItems = [];
        });
      }
    });
  }

  hide(id: string) {
    this.SubjectsHttpService.hide(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = false;
    });
  }

  reactivate(id: string) {
    this.SubjectsHttpService.reactivate(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = true;
    });
  }

  /** Select & Paginate **/
  selectItem(item: SubjectModel) {
    this.isActionButtons = true;
    this.selectedItem = item;
  }

  paginate(event: any) {
    this.findAll(event.page);
  }

  /** Redirects **/
  redirectCreateForm() {
    this.router.navigate([this.routesService.subjects, 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate([this.routesService.subjects, id]);
  }

  redirectEventList() {
    this.eventsService.model = {
      entity: this.selectedItem,
      label: 'Asignatura',
      routerLink: this.routesService.subjects,
      routerLabel: 'Asignaturas',
    };

    this.router.navigate([this.routesService.events]);
  }
}
