import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {
  ColumnModel,
  PaginatorModel,
  CareerModel,
  SelectCareerDto
} from '@models/core';
import {
  BreadcrumbService,
  CoreService, EventsService,
  MessageService,
  RoutesService,
  CareersHttpService, CareersService
} from '@services/core';
import {ActionButtonsEnum} from "@shared/enums";

@Component({
  selector: 'app-career-list',
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.scss'],

})
export class CareerListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected actionButtons: MenuItem[] = [];
  protected columns: ColumnModel[] = this.buildColumns;
  protected isActionButtons: boolean = false;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected selectedItem: SelectCareerDto = {};
  protected selectedItems: CareerModel[] = [];
  protected items: CareerModel[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    public coreService: CoreService,
    public messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private careersHttpService: CareersHttpService,
    private careersService: CareersService,
    private eventsService: EventsService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Carrera'},
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
    this.careersHttpService.findAll(page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.items = response.data;
      });
  }

  /** Build Data **/
  get buildColumns(): ColumnModel[] {
    return [
      { field: 'acronym', header: 'Siglas' },
      { field: 'code', header: 'Código' },
      { field: 'codeSniese', header: 'Código Sniese' },
      {field: 'state', header: 'Estado'},
      { field: 'logo', header: 'Logo' },
      { field: 'shortName', header: 'Nombre Corto' },
      { field: 'resolutionNumber', header: 'Número de Resolución' },
      { field: 'degree', header: 'Título' }
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
  }

  /** Actions **/
  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.careersHttpService.remove(id).subscribe(() => {
            this.items = this.items.filter(item => item.id !== id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.careersHttpService.removeAll(this.selectedItems).subscribe(() => {
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
    this.careersHttpService.hide(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = false;
    });
  }

  reactivate(id: string) {
    this.careersHttpService.reactivate(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = true;
    });
  }

  /** Select & Paginate **/
  selectItem(item: CareerModel) {
    this.isActionButtons = true;
    this.selectedItem = item;
    this.careersService.selectedCareer = item;
    this.buildActionButtons();
  }

  paginate(event: any) {
    this.findAll(event.page);
  }

  /** Redirects **/
  redirectCreateForm() {
    this.router.navigate([this.routesService.careers, 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate([this.routesService.careers, id]);
  }

  redirectEventList() {
    this.eventsService.model = {
      entity: this.selectedItem,
      label: 'Carrera',
      routerLink: this.routesService.careers,
      routerLabel: 'Carreras',
    };

    this.router.navigate([this.routesService.events]);
  }


}
