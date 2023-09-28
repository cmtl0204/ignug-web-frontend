import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from "primeng/api";
import {ColumnModel, InstitutionModel, PaginatorModel, SelectInstitutionDto} from '@models/core';
import {BreadcrumbService, CoreService, InstitutionsHttpService, MessageService, RoutesService} from '@services/core';
import {BreadcrumbEnum} from "@shared/enums";

@Component({
  selector: 'app-enrollment-subject-list',
  templateUrl: './enrollment-subject-list.component.html',
  styleUrls: ['./enrollment-subject-list.component.scss'],
})
export class EnrollmentSubjectListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected buttonActions: MenuItem[] = this.buildButtonActions;
  protected columns: ColumnModel[] = this.buildColumns;
  protected isButtonActions: boolean = false;
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
    this.institutionsHttpService.findAll(page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.items = response.data
      });
  }

  /** Build Data **/
  get buildColumns(): ColumnModel[] {
    return [
      {field: 'address', header: 'Dirección'},
      {field: 'name', header: 'Nombre'},
      {field: 'cellphone', header: 'Teléfono'},
      {field: 'code', header: 'Código'},
      {field: 'email', header: 'Email'},
      {field: 'logo', header: 'Logo'},
      {field: 'web', header: 'Web'},
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
        label: 'Ocultar',
        icon: PrimeIcons.LOCK,
        command: () => {
          if (this.selectedItem?.id) this.hide(this.selectedItem.id);
        },
      },
      {
        label: 'Mostrar',
        icon: PrimeIcons.LOCK_OPEN,
        command: () => {
          if (this.selectedItem?.id) this.reactivate(this.selectedItem.id);
        },
      },
      {
        label: 'Carreras',
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
          this.institutionsHttpService.remove(id).subscribe(() => {
            this.items = this.items.filter(item => item.id !== id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
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

  hide(id: string) {
    this.institutionsHttpService.hide(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = false;
    });
  }

  reactivate(id: string) {
    this.institutionsHttpService.reactivate(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = true;
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


