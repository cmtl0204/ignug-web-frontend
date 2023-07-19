import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from "primeng/api";
import {ColumnModel, PaginatorModel} from '@models/core';
import {BreadcrumbService, CoreService, CurriculumsHttpService, MessageService} from '@services/core';

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
  protected selectedCurriculum: SelectCurriculmDto = {};
  protected selectedCurriculmus: CurriculmModel[] = [];
  protected curriculums: CurriculmModel[] = [];

  constructor(
    public coreService: CoreService,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private router: Router,
    private curriculumsHttpService: CurriculumsHttpService,
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
    this.curriculumsHttpService.findAll(page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.curriculms = response.data
      });
  }

  get buildColumns(): ColumnModel[] {
    return [
      {field: 'code', header: 'Código'},
      {field: 'name', header: 'Nombre'},
      {field: 'description', header: 'Descripción'},
      {field: 'resolutionNumber', header: 'Número de resolución'},
      {field: 'periodicAcademicNumber', header: 'Número de periodo académico'},
      {field: 'weeksNumber', header: 'Número de semanas'}
    ];
  }

  get buildActionButtons(): MenuItem[] {
    return [
      {
        label: 'Actualizar',
        icon: PrimeIcons.PENCIL,
        command: () => {
          if (this.selectedCurriculum?.id) this.redirectEditForm(this.selectedCurriculum.id);
        },
      },
      {
        label: 'Eliminar',
        icon: PrimeIcons.TRASH,
        command: () => {
          if (this.selectedCurriculum?.id) this.remove(this.selectedCurriculum.id);
        },
      },
      {
        label: 'Suspender',
        icon: PrimeIcons.LOCK,
        command: () => {
          if (this.selectedCurriculum?.id) this.suspend(this.selectedCurriculum.id);
        },
      },
      {
        label: 'Reactivar',
        icon: PrimeIcons.LOCK_OPEN,
        command: () => {
          if (this.selectedCurriculum?.id) this.reactivate(this.selectedCurriculum.id);
        },
      }
    ];
  }

  paginate(event: any) {
    this.findAll(event.page);
  }

  redirectCreateForm() {
    this.router.navigate(['/administration/curriculums', 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate(['/administration/curriculums', id]);
  }

  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.curriculumsHttpService.remove(id).subscribe((curriculm) => {
            this.curriculms = this.curriculms.filter(item => item.id !== curriculm.id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.curriculumsHttpService.removeAll(this.selectedCurriculms).subscribe((curriculms) => {
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
    this.selectedCurriculum = curriculm;
  }

  suspend(id: string) {
    this.curriculumsHttpService.suspend(id).subscribe(curriculm => {
      const index = this.curriculms.findIndex(curriculm => curriculm.id === id);
      this.curriculms[index].isVisible = false;
    });
  }

  reactivate(id: string) {
    this.curriculumsHttpService.reactivate(id).subscribe(curriculm => {
      const index = this.curriculms.findIndex(curriculm => curriculm.id === id);
      this.curriculms[index] = curriculm;
    });
  }
}
