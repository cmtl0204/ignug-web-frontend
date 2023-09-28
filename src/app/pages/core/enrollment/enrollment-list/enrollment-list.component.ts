import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from "primeng/api";
import { ColumnModel, InstitutionModel, PaginatorModel, SelectEnrollmentDto, EnrollmentModel, SubjectModel, CareerModel, CatalogueModel } from '@models/core';
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  CurriculumsHttpService,
  EnrollmentsHttpService,
  MessageService,
  RoutesService,
  SubjectsHttpService
} from '@services/core';
import { BreadcrumbEnum, CatalogueCoreTypeEnum } from "@shared/enums";

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.scss'],
})
export class EnrollmentListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected buttonActions: MenuItem[] = this.buildButtonActions;
  protected columns: ColumnModel[] = this.buildColumns;
  protected isButtonActions: boolean = false;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected selectedItem: SelectEnrollmentDto = {};
  protected selectedItems: EnrollmentModel[] = [];
  protected items: EnrollmentModel[] = [];
  protected subjects: SubjectModel[] = [];
  protected selectedSubjects: SubjectModel[] = [];
  protected levels: any[] = [];
  protected parallels: CatalogueModel[] = [];
  protected workdays: CatalogueModel[] = [];


  constructor(
    private breadcrumbService: BreadcrumbService,
    public coreService: CoreService,
    public messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private enrollmentsHttpService: EnrollmentsHttpService,
    private curriculumsHttpService: CurriculumsHttpService,
    private cataloguesHttpService: CataloguesHttpService

  ) {
    this.breadcrumbService.setItems([{ label: BreadcrumbEnum.ENROLLMENTS }]);

    this.paginator = this.coreService.paginator;

    this.search.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.findAll();
      }
    });
  }

  ngOnInit() {
    this.findAll();
    this.findSubjectsByCurriculum();
  }

  /** Load Data **/
  findAll(page: number = 0) {
    this.enrollmentsHttpService.findAll(page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.items = response.data
      });
  }

  findSubjectsByCurriculum() {
    this.curriculumsHttpService.findSubjectsByCurriculum('19aa2462-bc8f-4a65-b685-d583b8f86e61')
      .subscribe((response) => {
        this.subjects = response;

        const levelsMap = new Map<string, SubjectModel[]>();
        this.subjects.forEach(subject => {
          const level = subject.academicPeriod.name;
          if (!levelsMap.has(level)) {
            levelsMap.set(level, []);
          }

          const levelSubjects = levelsMap.get(level);
          if (levelSubjects !== undefined) {
            levelSubjects.push(subject);
          }
        });

        console.log(levelsMap);
        this.levels = Array.from(levelsMap).sort();
        console.log(this.levels);
      });
  }

  /** Build Data **/
  get buildColumns(): ColumnModel[] {
    return [
      { field: 'number', header: 'Numero de matricula' },
      { field: 'date', header: 'Fecha' },
      { field: 'finalAttendance', header: 'Última asistencia' },
      { field: 'finalGrade', header: 'Nota final' },
      { field: 'state', header: 'Estado' },
    ];
  }

  loadParallels(): void {
    this.parallels = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.PARALLEL);
  }

  loadWorkdays(): void {
    this.workdays = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.WORKDAY);
  }

  get buildButtonActions(): MenuItem[] {
    return [
      {
        label: 'Descargar',
        icon: PrimeIcons.DOWNLOAD,
        command: () => {
          if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
        },
      },
      {
        label: 'Asignaturas',
        icon: PrimeIcons.BOOK,
        command: () => {
          if (this.selectedItem?.id) this.remove(this.selectedItem.id);
        },
      },
      {
        label: 'Anular',
        icon: PrimeIcons.BAN,
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
          this.enrollmentsHttpService.remove(id).subscribe(() => {
            this.items = this.items.filter(item => item.id !== id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.enrollmentsHttpService.removeAll(this.selectedItems).subscribe(() => {
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
    this.enrollmentsHttpService.hide(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = false;
    });
  }

  reactivate(id: string) {
    this.enrollmentsHttpService.reactivate(id).subscribe(item => {
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


