import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from "primeng/api";
import {CurriculumModel, ColumnModel, PaginatorModel, SelectCurriculumDto} from '@models/core';
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
  protected selectedCurriculum: SelectCurriculumDto = {};
  protected selectedCurriculums: CurriculumModel[] = [];
  protected curriculums: CurriculumModel[] = [];

  constructor(
    public authService: AuthService,
    public coreService: CoreService,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private router: Router,
    private curriculumsHttpService: CurriculumsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Curriculums'},
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
        this.curriculums = response.data
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
          if (this.selectedCurriculum?.id) this.hide(this.selectedCurriculum.id);
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
          this.curriculumsHttpService.remove(id).subscribe((curriculum) => {
            this.curriculums = this.curriculums.filter(item => item.id !== curriculum.id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.curriculumsHttpService.removeAll(this.selectedCurriculums).subscribe((curriculums) => {
          this.selectedCurriculums.forEach(curriculumDeleted => {
            this.curriculums = this.curriculums.filter(curriculum => curriculum.id !== curriculumDeleted.id);
            this.paginator.totalItems--;
          });
          this.selectedCurriculums = [];
        });
      }
    });
  }

  selectUser(curriculum: CurriculumModel) {
    this.isActionButtons = true;
    this.selectedCurriculum = curriculum;
  }

  hide(id: string) {
    this.curriculumsHttpService.hide(id).subscribe(curriculum => {
      const index = this.curriculums.findIndex(curriculum => curriculum.id === id);
      this.curriculums[index].isVisible = false;
    });
  }

  reactivate(id: string) {
    this.curriculumsHttpService.reactivate(id).subscribe(curriculum => {
      const index = this.curriculums.findIndex(curriculum => curriculum.id === id);
      this.curriculums[index] = curriculum;
    });
  }
}
