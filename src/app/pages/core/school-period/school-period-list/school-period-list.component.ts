import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {
  ColumnModel,
  PaginatorModel,
  SchoolPeriodModel,
  SelectSchoolPeriodDto
} from '@models/core';
import {
  BreadcrumbService,
  CoreService, EventsService,
  MessageService,
  RoutesService,
  SchoolPeriodsHttpService
} from '@services/core';
import {ActionButtonsEnum, SchoolPeriodsStateEnum} from "@shared/enums";

@Component({
  selector: 'app-event-list',
  templateUrl: './school-period-list.component.html',
  styleUrls: ['./school-period-list.component.scss'],

})
export class SchoolPeriodListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected actionButtons: MenuItem[] = [];
  protected columns: ColumnModel[] = this.buildColumns;
  protected isActionButtons: boolean = false;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected selectedItem: SelectSchoolPeriodDto = {};
  protected selectedItems: SchoolPeriodModel[] = [];
  protected items: SchoolPeriodModel[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    public coreService: CoreService,
    public messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private schoolPeriodsHttpService: SchoolPeriodsHttpService,
    private eventsService: EventsService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Periodos Lectivos'},
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
    this.schoolPeriodsHttpService.findAll(page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.items = response.data;
      });
  }

  /** Build Data **/
  get buildColumns(): ColumnModel[] {
    return [
      {field: 'name', header: 'Nombre'},
      {field: 'startedAt', header: 'Fecha Inicio'},
      {field: 'endedAt', header: 'Fecha Fin'},
      {field: 'state', header: 'Estado'},
      {field: 'isVisible', header: 'Es Visible'}
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

    this.actionButtons.push(
      {
        id: ActionButtonsEnum.HIDE,
        label: 'Ocultar',
        icon: PrimeIcons.EYE_SLASH,
        command: () => {
          if (this.selectedItem?.id) this.hide(this.selectedItem.id);
        },
      });

    this.actionButtons.push(
      {
        id: ActionButtonsEnum.REACTIVATE,
        label: 'Mostrar',
        icon: PrimeIcons.EYE,
        command: () => {
          if (this.selectedItem?.id) this.reactivate(this.selectedItem.id);
        },

      });

    this.actionButtons.push(
      {
        id: ActionButtonsEnum.SHOW_EVENTS,
        label: 'Eventos',
        icon: PrimeIcons.BARS,
        command: () => {
          if (this.selectedItem?.id) this.redirectEventList();
        },
      });

    this.actionButtons.push(
      {
        id: ActionButtonsEnum.OPEN_SCHOOL_PERIOD,
        label: 'Abrir Periodo Lectivo',
        icon: PrimeIcons.LOCK_OPEN,
        command: () => {
          if (this.selectedItem?.id) this.open(this.selectedItem.id);
        },
      });

    this.actionButtons.push(
      {
        id: ActionButtonsEnum.CLOSE_SCHOOL_PERIOD,
        label: 'Cerrar Periodo Lectivo',
        icon: PrimeIcons.UNLOCK,
        command: () => {
          if (this.selectedItem?.id) this.close(this.selectedItem.id);
        },
      });

    /** Action Buttons Validations **/
    if (this.selectedItem.state?.code === SchoolPeriodsStateEnum.CLOSE) {
      // this.actionButtons = this.actionButtons.filter(actionButton => {
      //   return actionButton.id !== ActionButtonsEnum.SHOW_EVENTS && actionButton.id !== ActionButtonsEnum.CLOSE_SCHOOL_PERIOD;
      // });

      let index = this.actionButtons.findIndex(actionButton => {
        return actionButton.id === ActionButtonsEnum.SHOW_EVENTS;
      });

      this.actionButtons.splice(index, 1);

      index = this.actionButtons.findIndex(actionButton => {
        return actionButton.id === ActionButtonsEnum.CLOSE_SCHOOL_PERIOD;
      });

      this.actionButtons.splice(index, 1);
    }

    if (this.selectedItem.state?.code === SchoolPeriodsStateEnum.OPEN) {
      // this.actionButtons = this.actionButtons.filter(actionButton => {
      //   return actionButton.id !== ActionButtonsEnum.OPEN_SCHOOL_PERIOD;
      // });

      const index = this.actionButtons.findIndex(actionButton => {
        return actionButton.id === ActionButtonsEnum.OPEN_SCHOOL_PERIOD;
      });

      this.actionButtons.splice(index, 1);
    }

    if (this.selectedItem.isVisible) {
      const index = this.actionButtons.findIndex(actionButton => {
        return actionButton.id === ActionButtonsEnum.REACTIVATE;
      });

      this.actionButtons.splice(index, 1);
    }

    if (!this.selectedItem.isVisible) {
      const index = this.actionButtons.findIndex(actionButton => {
        return actionButton.id === ActionButtonsEnum.HIDE;
      });

      this.actionButtons.splice(index, 1);
    }
  }

  /** Actions **/
  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.schoolPeriodsHttpService.remove(id).subscribe(() => {
            this.items = this.items.filter(item => item.id !== id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.schoolPeriodsHttpService.removeAll(this.selectedItems).subscribe(() => {
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
    this.schoolPeriodsHttpService.hide(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = false;
    });
  }

  reactivate(id: string) {
    this.schoolPeriodsHttpService.reactivate(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = true;
    });
  }

  open(id: string) {
    this.schoolPeriodsHttpService.open(id).subscribe(item => {
      this.findAll();
    });
  }

  close(id: string) {
    this.schoolPeriodsHttpService.close(id).subscribe(item => {
      this.findAll();
    });
  }

  /** Select & Paginate **/
  selectItem(item: SchoolPeriodModel) {
    this.isActionButtons = true;
    this.selectedItem = item;
    this.buildActionButtons();
  }

  paginate(event: any) {
    this.findAll(event.page);
  }

  /** Redirects **/
  redirectCreateForm() {
    this.router.navigate([this.routesService.schoolPeriods, 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate([this.routesService.schoolPeriods, id]);
  }

  redirectEventList() {
    this.eventsService.model = {
      entity: this.selectedItem,
      label: 'Periodo Lectivo',
      routerLink: this.routesService.schoolPeriods,
      routerLabel: 'Periodos Lectivos',
    };

    this.router.navigate([this.routesService.events]);
  }

  protected readonly SchoolPeriodsStateEnum = SchoolPeriodsStateEnum;
}
