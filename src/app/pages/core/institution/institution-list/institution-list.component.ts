import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from "primeng/api";
import {ColumnModel, InstitutionModel, SelectInstitutionDto, PaginatorModel} from '@models/core';
import {BreadcrumbService, CoreService, InstitutionsHttpService, MessageService} from '@services/core';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstitutionListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected actionButtons: MenuItem[] = this.buildActionButtons;
  protected columns: ColumnModel[] = this.buildColumns;
  protected isActionButtons: boolean = false;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected selectedInstitution: SelectInstitutionDto = {};
  protected selectedInstitutions: InstitutionModel[] = [];
  protected institutions: InstitutionModel[] = [];

  constructor(
    public coreService: CoreService,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private router: Router,
    private institutionsHttpService: InstitutionsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Institucion'},
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

  findAll(page: number = 0) {
    this.institutionsHttpService.findAll(page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.institutions = response.data
      });
  }

  get buildColumns(): ColumnModel[] {
    return [
      {field: 'address', header: 'Dirección'},
      {field: 'cellphone', header: 'Teléfono'},
      {field: 'code', header: 'Código'},
      {field: 'email', header: 'Email'},
      {field: 'logo', header: 'Logo'},
      {field: 'name', header: 'Nombre'},
      {field: 'web', header: 'Web'},
    ];
  }

  get buildActionButtons(): MenuItem[] {
    return [
      {
        label: 'Actualizar',
        icon: PrimeIcons.PENCIL,
        command: () => {
          if (this.selectedInstitution?.id) this.redirectEditForm(this.selectedInstitution.id);
        },
      },
      {
        label: 'Eliminar',
        icon: PrimeIcons.TRASH,
        command: () => {
          if (this.selectedInstitution?.id) this.remove(this.selectedInstitution.id);
        },
      },
      {
        label: 'Ocultar',
        icon: PrimeIcons.LOCK,
        command: () => {
          if (this.selectedInstitution?.id) this.hide(this.selectedInstitution.id);
        },
      },
      {
        label: 'Reactivar',
        icon: PrimeIcons.LOCK_OPEN,
        command: () => {
          if (this.selectedInstitution?.id) this.reactivate(this.selectedInstitution.id);
        },
      }
    ];
  }

  paginate(event: any) {
    this.findAll(event.page);
  }

  redirectCreateForm() {
    this.router.navigate(['/administration/institutions', 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate(['/administration/institutions', id]);
  }

  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.institutionsHttpService.remove(id).subscribe((institution) => {
            this.institutions = this.institutions.filter(item => item.id !== institution.id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.institutionsHttpService.removeAll(this.selectedInstitutions).subscribe((institutions) => {
          this.selectedInstitutions.forEach(institutionDeleted => {
            this.institutions = this.institutions.filter(institution => institution.id !== institutionDeleted.id);
            this.paginator.totalItems--;
          });
          this.selectedInstitutions = [];
        });
      }
    });
  }

  selectInstitution(institution: InstitutionModel) {
    this.isActionButtons = true;
    this.selectedInstitution = institution;
  }

  hide(id: string) {
    this.institutionsHttpService.hide(id).subscribe(institution => {
      const index = this.institutions.findIndex(institution => institution.id === id);
      this.institutions[index].isVisible = false;
    });
  }

  reactivate(id: string) {
    this.institutionsHttpService.reactivate(id).subscribe(institution => {
      const index = this.institutions.findIndex(institution => institution.id === id);
      this.institutions[index] = institution;
    });
  }
}
