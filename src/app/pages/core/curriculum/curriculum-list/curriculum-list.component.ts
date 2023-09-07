import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {Table} from 'primeng/table';
import {ColumnModel, CurriculumModel, SelectCurriculumDto, SelectCareerDto} from '@models/core';
import {
  BreadcrumbService,
  CoreService,
  MessageService,
  RoutesService,
  CurriculumsHttpService, CareersService, CareersHttpService
} from '@services/core';
import {CurriculumsService} from "@services/core/curriculums.service";
import {BreadcrumbEnum} from "@shared/enums";

@Component({
  selector: 'app-curriculum-list',
  templateUrl: './curriculum-list.component.html',
  styleUrls: ['./curriculum-list.component.scss'],

})
export class CurriculumListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected actionButtons: MenuItem[] = this.buildActionButtons;
  protected columns: ColumnModel[] = this.buildColumns;
  protected isActionButtons: boolean = false;
  protected search: FormControl = new FormControl('');
  protected selectedItem: SelectCurriculumDto = {};
  protected selectedItems: CurriculumModel[] = [];
  protected items: CurriculumModel[] = [];
  protected selectedCareer: FormControl = new FormControl();
  protected careers: SelectCareerDto[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    public coreService: CoreService,
    public messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private curriculumsHttpService: CurriculumsHttpService,
    private curriculumsService: CurriculumsService,
    private careersHttpService: CareersHttpService,
    private careersService: CareersService,
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.INSTITUTIONS, routerLink: routesService.institutions},
      {label: BreadcrumbEnum.CAREERS, routerLink: routesService.careers},
      {label: BreadcrumbEnum.CURRICULUMS},
    ]);

    this.careers = careersService.careers;

    this.selectedCareer.patchValue(this.careersService.career);

    this.search.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.findByCareer();
      }
    });

    this.selectedCareer.valueChanges.subscribe(selectCareer => {
      this.findByCareer();
    });
  }

  ngOnInit() {
    this.findByCareer();
  }

  /** Load Data **/
  findByCareer() {
    this.careersHttpService.findCurriculumsByCareer(this.selectedCareer.value.id)
      .subscribe((response) => {
        this.items = response;
      });
  }

  /** Build Data **/
  get buildColumns(): ColumnModel[] {
    return [
      {field: 'code', header: 'Código'},
      {field: 'name', header: 'Nombre'},
      {field: 'periodicAcademicNumber', header: '# Periodos académicos'},
      {field: 'weeksNumber', header: '# Semanas'},
      {field: 'isVisible', header: 'Estado'}
    ];
  }

  get buildActionButtons(): MenuItem[] {
    return [
      {
        label: 'Actualizar',
        icon: PrimeIcons.PENCIL,
        command: () => {
          if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
        },
      },
      {
        label: 'Ocultar',
        icon: PrimeIcons.EYE_SLASH,
        command: () => {
          if (this.selectedItem?.id) this.hide(this.selectedItem.id);
        },
      },
      {
        label: 'Mostrar',
        icon: PrimeIcons.EYE,
        command: () => {
          if (this.selectedItem?.id) this.reactivate(this.selectedItem.id);
        },
      },
      {
        label: 'Asignaturas',
        icon: PrimeIcons.BOOK,
        command: () => {
          this.router.navigate([this.routesService.subjects]);
        },
      }
    ];
  }

  /** Actions **/

  hide(id: string) {
    this.curriculumsHttpService.hide(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = false;
    });
  }

  reactivate(id: string) {
    this.curriculumsHttpService.reactivate(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = true;
    });
  }

  /** Select & Paginate **/
  selectItem(item: CurriculumModel) {
    this.isActionButtons = true;
    this.selectedItem = item;
    this.curriculumsService.curriculum = item;
  }

  clear(table: Table) {
    table.clear();
  }

  /** Redirects **/
  redirectCreateForm() {
    this.router.navigate([this.routesService.curriculums, 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate([this.routesService.curriculums, id]);
  }

  redirectSubjects() {
    this.router.navigate([this.routesService.subjects]);
  }
}
