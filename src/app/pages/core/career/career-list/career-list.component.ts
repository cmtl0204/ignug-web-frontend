import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {CareerModel, ColumnModel, PaginatorModel, SelectCareerDto} from '@models/core';
import {BreadcrumbService, CareersHttpService, CoreService, MessageService, RoutesService} from '@services/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CareerListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected actionButtons: MenuItem[] = this.buildActionButtons;
  protected columns: ColumnModel[] = this.buildColumns;
  protected isActionButtons: boolean = false;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected selectedCareer: SelectCareerDto = {};
  protected selectedCareers: CareerModel[] = [];
  protected careers: CareerModel[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private careersHttpService: CareersHttpService,
    public coreService: CoreService,
    public messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Carreras'},
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
    this.careersHttpService.findAll(page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.careers = response.data;
      });
  }

  get buildColumns(): ColumnModel[] {
    return [
      {field: 'name', header: 'Nombre'},
      {field: 'acronym', header: 'Acrónimo'},
      {field: 'degree', header: 'Grado'},
      {field: 'institution', header: 'Institución'},
      {field: 'modality', header: 'Modalidad'},
      {field: 'state', header: 'Estado'}
    ];
  }

  get buildActionButtons(): MenuItem[] {
    return [
      {
        label: 'Actualizar',
        icon: PrimeIcons.PENCIL,
        command: () => {
          if (this.selectedCareer?.id) this.redirectEditForm(this.selectedCareer.id);
        },
      },
      {
        label: 'Eliminar',
        icon: PrimeIcons.TRASH,
        command: () => {
          if (this.selectedCareer?.id) this.remove(this.selectedCareer.id);
        },
      },
      {
        label: 'Suspender',
        icon: PrimeIcons.LOCK,
        command: () => {
          if (this.selectedCareer?.id) this.hide(this.selectedCareer.id);
        },
      },
      {
        label: 'Reactivar',
        icon: PrimeIcons.LOCK_OPEN,
        command: () => {
          if (this.selectedCareer?.id) this.reactivate(this.selectedCareer.id);
        },
      }
    ];
  }

  paginate(event: any) {
    this.findAll(event.page);
  }

  redirectCreateForm() {
    this.router.navigate([this.routesService.careers, 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate(['/administration/careers', id]);
  }

  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.careersHttpService.remove(id).subscribe((career) => {
            this.careers = this.careers.filter(item => item.id !== career.id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.careersHttpService.removeAll(this.selectedCareers).subscribe((careers) => {
          this.selectedCareers.forEach(careerDeleted => {
            this.careers = this.careers.filter(career => career.id !== careerDeleted.id);
            this.paginator.totalItems--;
          });
          this.selectedCareers = [];
        });
      }
    });
  }

  selectCareer(career: CareerModel) {
    this.isActionButtons = true;
    this.selectedCareer = career;
  }

  hide(id: string) {
    this.careersHttpService.hide(id).subscribe(career => {
      const index = this.careers.findIndex(career => career.id === id);
      this.careers[index].isVisible = false;
    });
  }

  reactivate(id: string) {
    this.careersHttpService.reactivate(id).subscribe(career => {
      const index = this.careers.findIndex(career => career.id === id);
      this.careers[index] = career;
    });
  }
}
