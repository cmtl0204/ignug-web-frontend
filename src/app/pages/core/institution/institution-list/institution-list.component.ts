import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from "primeng/api";
import {ColumnModel, InstitutionModel, SelectInstitutionDto, PaginatorModel} from '@models/core';
import {
  BreadcrumbService,
  CoreService,
  InstitutionsHttpService,
  InstitutionsService,
  MessageService,
  RoutesService
} from '@services/core';
import {BreadcrumbEnum, CatalogueStateEnum} from "@shared/enums";

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss'],
})
export class InstitutionListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected actionButtons: MenuItem[] = [];
  protected columns: ColumnModel[] = this.buildColumns;
  protected isActionButtons: boolean = false;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected selectedItem: SelectInstitutionDto = {};
  protected selectedItems: InstitutionModel[] = [];
  protected items: InstitutionModel[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    public coreService: CoreService,
    public messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private institutionsHttpService: InstitutionsHttpService,
    protected institutionsService: InstitutionsService,
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.INSTITUTIONS},
    ]);

    this.paginator = this.coreService.paginator;

    this.search.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.findInstitutionsByAuthenticatedUser();
      }
    });
  }

  ngOnInit() {
    this.findInstitutionsByAuthenticatedUser();
  }

  /** Build Data **/
  get buildColumns(): ColumnModel[] {
    return [
      {field: 'acronym', header: 'Siglas'},
      {field: 'name', header: 'Nombre'},
      {field: 'email', header: 'Email'},
      {field: 'cellphone', header: 'Teléfono'},
      {field: 'state', header: 'Estado'},
    ];
  }

  buildActionButtons(item: InstitutionModel) {
    this.actionButtons = [
      {
        id: 'update',
        label: 'Editar',
        icon: PrimeIcons.PENCIL,
        command: () => {
          if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
        },
      },
      {
        id: 'select',
        label: 'Cambiar',
        icon: PrimeIcons.SYNC,
        command: () => {
          if (this.selectedItem?.id) this.change(this.selectedItem);
        },
      },
      {
        id: 'enable',
        label: 'Habilitar',
        icon: PrimeIcons.EYE,
        command: () => {
          if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
        },
      },
      {
        id: 'disable',
        label: 'Inhabilitar',
        icon: PrimeIcons.EYE_SLASH,
        command: () => {
          if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
        },
      },
      {
        id: 'careers',
        label: 'Carreras',
        icon: PrimeIcons.BOOK,
        command: () => {
          this.router.navigate([this.routesService.careers,item.id]);
        },
      }
    ];

    if (item.state.code === CatalogueStateEnum.ENABLED) {
      this.actionButtons = this.actionButtons.filter(item => item.id !== 'enable');
    }

    if (item.state.code === CatalogueStateEnum.DISABLED) {
      this.actionButtons = this.actionButtons.filter(item => item.id !== 'disable');
    }
  }

  /** Actions **/
  findInstitutionsByAuthenticatedUser(page: number = 0) {
    this.institutionsHttpService.findInstitutionsByAuthenticatedUser(page, this.search.value)
      .subscribe((response) => {
        console.log(response);
        this.paginator = response.pagination!;
        this.items = response.data
      });
  }

  enable(institution: InstitutionModel) {
    this.institutionsHttpService.enable(institution.id).subscribe(() => {

    });
  }

  disable() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.institutionsHttpService.removeAll(this.selectedItems).subscribe(() => {
          this.selectedItems.forEach(itemDeleted => {
            this.items = this.items.filter(item => item.id !== itemDeleted.id);
            this.paginator.totalItems--;
          });
          this.selectedItems = [];
        });
      }
    });
  }

  change(item: SelectInstitutionDto) {
    this.institutionsService.institution = item;
    this.messageService.successCustom('Ha cambiado de Institución', 'La Institución seleccionada se configura para todo el sistema');
  }

  /** Select & Paginate **/
  selectItem(item: InstitutionModel) {
    this.isActionButtons = true;
    this.selectedItem = item;
    this.buildActionButtons(item);
  }

  paginate(event: any) {
    this.findInstitutionsByAuthenticatedUser(event.page);
  }

  /** Redirects **/
  redirectCreateForm() {
    this.router.navigate([this.routesService.institutions, 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate([this.routesService.institutions, id]);
  }
}


