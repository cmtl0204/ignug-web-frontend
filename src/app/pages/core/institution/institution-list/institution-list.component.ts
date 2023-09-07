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
import {ActionButtonsEnum, BreadcrumbEnum} from "@shared/enums";

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss'],
})
export class InstitutionListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected actionButtons: MenuItem[] = this.buildActionButtons;
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
      {field: 'isVisible', header: 'Estado'},
    ];
  }

  get buildActionButtons() {
    return [
      {
        id: ActionButtonsEnum.UPDATE,
        label: 'Editar',
        icon: PrimeIcons.PENCIL,
        command: () => {
          if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
        },
      },
      {
        id: ActionButtonsEnum.SELECT,
        label: 'Seleccionar',
        icon: PrimeIcons.SYNC,
        command: () => {
          if (this.selectedItem?.id) this.change(this.selectedItem);
        },
      },
      {
        id: ActionButtonsEnum.REACTIVATE,
        label: 'Habilitar',
        icon: PrimeIcons.EYE,
        command: () => {
          if (this.selectedItem?.id) this.reactivate(this.selectedItem.id);
        },
      },
      {
        id: ActionButtonsEnum.HIDE,
        label: 'Inhabilitar',
        icon: PrimeIcons.EYE_SLASH,
        command: () => {
          if (this.selectedItem?.id) this.hide(this.selectedItem.id);
        },
      },
    ];
  }

  validateActionButtons(item: InstitutionModel) {
    this.actionButtons = this.buildActionButtons;

    if (item.isVisible) {
      this.actionButtons.splice(this.actionButtons.findIndex(actionButton => actionButton.id === ActionButtonsEnum.REACTIVATE), 1);
    }

    if (!item.isVisible) {
      this.actionButtons.splice(this.actionButtons.findIndex(actionButton => actionButton.id === ActionButtonsEnum.HIDE), 1);
    }

    if (item.id === this.institutionsService.institution.id) {
      this.actionButtons.splice(this.actionButtons.findIndex(actionButton => actionButton.id === ActionButtonsEnum.SELECT), 1);
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

  reactivate(id: string) {
    this.institutionsHttpService.reactivate(id).subscribe(() => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = true;
    });
  }

  hide(id: string) {
    this.institutionsHttpService.hide(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = false;
    });
  }

  change(item: SelectInstitutionDto) {
    this.institutionsService.institution = item;
    this.messageService.successCustom('Ha cambiado de Institución', 'La Institución seleccionada se configura para todo el sistema');
  }

  selectItem(item: InstitutionModel) {
    this.isActionButtons = true;
    this.selectedItem = item;
    this.validateActionButtons(item);
  }

  /** Redirects **/
  redirectCreateForm() {
    this.router.navigate([this.routesService.institutions, 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate([this.routesService.institutions, id]);
  }

  redirectCareers() {
    this.router.navigate([this.routesService.careers]);
  }
}


