import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {
  ColumnModel,
  PaginatorModel,
  CareerModel,
  SelectCareerDto, InstitutionModel, SelectInstitutionDto
} from '@models/core';
import {
  BreadcrumbService,
  CoreService, EventsService,
  MessageService,
  RoutesService,
  CareersHttpService, CareersService, InstitutionsService, InstitutionsHttpService
} from '@services/core';
import {ActionButtonsEnum, BreadcrumbEnum} from "@shared/enums";

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
  protected selectedInstitution: FormControl = new FormControl();
  protected institutions: SelectInstitutionDto[] = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService,
    public readonly coreService: CoreService,
    public readonly messageService: MessageService,
    private readonly router: Router,
    private readonly routesService: RoutesService,
    private readonly careersHttpService: CareersHttpService,
    private readonly careersService: CareersService,
    private readonly eventsService: EventsService,
    protected readonly institutionsService: InstitutionsService,
    protected readonly institutionsHttpService: InstitutionsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.INSTITUTIONS, routerLink: routesService.institutions},
      {label: BreadcrumbEnum.CAREERS},
    ]);

    this.paginator = this.coreService.paginator;

    this.institutions = this.institutionsService.institutions;

    if (this.activatedRoute.snapshot.params['institutionId']) {
      const institution = this.institutions.find(institution => institution.id === activatedRoute.snapshot.params['institutionId']);
      this.selectedInstitution.patchValue(institution);
    } else {
      this.selectedInstitution.patchValue(this.institutionsService.institution);
    }

    this.search.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.findByInstitution();
      }
    });


  }

  ngOnInit() {
    this.findByInstitution();
  }

  /** Load Data **/
  findByInstitution(page: number = 0) {
    this.institutionsHttpService.findCareersByInstitution(this.institutionsService.institution.id!, page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.items = response.data;
      });
  }

  /** Build Data **/
  get buildColumns(): ColumnModel[] {
    return [
      {field: 'code', header: 'Código'},
      {field: 'name', header: 'Nombre'},
      {field: 'shortName', header: 'Nombre Corto'},
      {field: 'degree', header: 'Título'},
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
        label: 'Mallas Curriculares',
        icon: PrimeIcons.LIST,
        command: () => {
          this.router.navigate([this.routesService.curriculums]);
        },
      });

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
  hide(id: string) {
    this.careersHttpService.hide(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = false;
    });
  }

  reactivate(id: string) {
    this.careersHttpService.reactivate(id).subscribe(() => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = true;
    });
  }

  /** Select & Paginate **/
  selectItem(item: CareerModel) {
    this.isActionButtons = true;
    this.selectedItem = item;
    this.careersService.career = item;
    this.buildActionButtons();
  }

  paginate(event: any) {
    this.findByInstitution(event.page);
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
