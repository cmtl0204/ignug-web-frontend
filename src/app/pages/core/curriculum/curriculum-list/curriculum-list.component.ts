import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from "primeng/api";
import {SelectCurriculumDto, CurriculumModel} from '@models/auth';
import {ColumnModel, PaginatorModel} from '@models/core';
import {AuthService, CurriculumService} from '@services/auth';
import {BreadcrumbService, CoreService, MessageService} from '@services/core';

@Component({
  selector: 'app-curriculum-list',
  templateUrl: './curriculum-list.component.html',
  styleUrls: ['./curriculum-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CurriculumListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected actionButtons: MenuItem[] = this.buildActionButtons;
  protected columns: ColumnModel[] = this.buildColumns;
  protected isActionButtons: boolean = false;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected selectedCurriculm: SelectCurriculmDto = {};
  protected selectedCurriculms: CurriculmModel[] = [];
  protected curriculms: CurriculmModel[] = [];

  constructor(
    public authService: AuthService,
    public coreService: CoreService,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private router: Router,
    private curriculmsHttpService: CurriculmsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Curriculms'},
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
    this.curriculmsHttpService.findAll(page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.curriculms = response.data
      });
  }

  get buildColumns(): ColumnModel[] {
    return [
      {field: 'username', header: 'Usuario'},
      {field: 'name', header: 'Nombre'},
      {field: 'lastname', header: 'Apellido'},
      {field: 'email', header: 'Email'},
      {field: 'roles', header: 'Rol'},
      {field: 'suspendedAt', header: 'Stado'}
    ];
  }

  get buildActionButtons(): MenuItem[] {
    return [
      {
        label: 'Actualizar',
        icon: PrimeIcons.PENCIL,
        command: () => {
          if (this.selectedCurriculm?.id) this.redirectEditForm(this.selectedCurriculm.id);
        },
      },
      {
        label: 'Eliminar',
        icon: PrimeIcons.TRASH,
        command: () => {
          if (this.selectedCurriculm?.id) this.remove(this.selectedCurriculm.id);
        },
      },
      {
        label: 'Suspender',
        icon: PrimeIcons.LOCK,
        command: () => {
          if (this.selectedCurriculm?.id) this.suspend(this.selectedCurriculm.id);
        },
      },
      {
        label: 'Reactivar',
        icon: PrimeIcons.LOCK_OPEN,
        command: () => {
          if (this.selectedCurriculm?.id) this.reactivate(this.selectedCurriculm.id);
        },
      }
    ];
  }

  paginate(event: any) {
    this.findAll(event.page);
  }

  redirectCreateForm() {
    this.router.navigate(['/administration/Curriculms', 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate(['/administration/Curriculms', id]);
  }

  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.curriculmsHttpService.remove(id).subscribe((curriculm) => {
            this.curriculms = this.curriculms.filter(item => item.id !== curriculm.id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.curriculmsHttpService.removeAll(this.selectedCurriculms).subscribe((curriculms) => {
          this.selectedCurriculms.forEach(curriculmDeleted => {
            this.curriculms = this.curriculms.filter(curriculm => curriculm.id !== curriculmDeleted.id);
            this.paginator.totalItems--;
          });
          this.selectedCurriculms = [];
        });
      }
    });
  }

  selectUser(curriculm: CurriculmModel) {
    this.isActionButtons = true;
    this.selectedCurriculm = curriculm;
  }

  suspend(id: string) {
    this.curriculmsHttpService.suspend(id).subscribe(curriculm => {
      const index = this.curriculms.findIndex(curriculm => curriculm.id === id);
      this.curriculms[index].suspendedAt = curriculm.suspendedAt;
    });
  }

  reactivate(id: string) {
    this.curriculmsHttpService.reactivate(id).subscribe(curriculm => {
      const index = this.curriculms.findIndex(curriculm => curriculm.id === id);
      this.curriculms[index] = curriculm;
    });
  }
}