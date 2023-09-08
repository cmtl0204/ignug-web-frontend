import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {
  ColumnModel,
  PaginatorModel,
  SubjectModel,
  SelectSubjectDto, SelectCareerDto
} from '@models/core';
import {
  BreadcrumbService, CareersService,
  CoreService, CurriculumsHttpService, CurriculumsService, EventsService,
  MessageService,
  RoutesService,
  SubjectsHttpService, SubjectsService,
} from '@services/core';
import {BreadcrumbEnum, ActionButtonsEnum} from "@shared/enums";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss'],

})
export class SubjectListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected actionButtons: MenuItem[] = [];
  protected columns: ColumnModel[] = this.buildColumns;
  protected isActionButtons: boolean = false;
  protected isFileList: boolean = false;
  protected selectedItem: SelectSubjectDto = {};
  protected selectedItems: SubjectModel[] = [];
  protected items: SubjectModel[] = [];
  protected selectedCareer: FormControl = new FormControl();
  protected selectedCurriculum: FormControl = new FormControl();
  protected careers: SelectCareerDto[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private careersService: CareersService,
    public coreService: CoreService,
    public messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private SubjectsHttpService: SubjectsHttpService,
    private eventsService: EventsService,
    protected curriculumsHttpService: CurriculumsHttpService,
    protected curriculumsService: CurriculumsService,
    protected subjectsService: SubjectsService,
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.INSTITUTIONS, routerLink: [this.routesService.institutions]},
      {label: BreadcrumbEnum.CAREERS, routerLink: [this.routesService.careers]},
      {label: BreadcrumbEnum.CURRICULUMS, routerLink: [this.routesService.curriculums]},
      {label: BreadcrumbEnum.SUBJECTS},
    ]);

    this.careers = this.careersService.careers;

    this.selectedCareer.patchValue(this.careersService.career);

    if (this.selectedCareer.value?.curriculums.length > 0) {
      this.selectedCurriculum.patchValue(this.selectedCareer.value?.curriculums[0]);
      this.curriculumsService.curriculum = this.selectedCareer.value.curriculums[0];
      this.findSubjectsByCurriculum();
    }

    this.selectedCareer.valueChanges.subscribe(selectedCareer => {
      this.items = [];
      if (selectedCareer.curriculums.length > 0) {
        this.selectedCurriculum.patchValue(selectedCareer.curriculums[0]);
        this.curriculumsService.curriculum = selectedCareer.curriculums[0];
        this.findSubjectsByCurriculum();
      } else {
        this.curriculumsService.curriculum = {};
      }
    });
  }

  ngOnInit() {
    if (this.selectedCurriculum.value)
      this.findSubjectsByCurriculum();
  }

  /** Load Data **/
  findSubjectsByCurriculum() {
    this.curriculumsHttpService.findSubjectsByCurriculum(this.selectedCurriculum.value.id)
      .subscribe((subjects) => {
        this.items = subjects;
      });
  }

  /** Build Data **/
  get buildColumns(): ColumnModel[] {
    return [
      {field: 'code', header: 'Código'},
      {field: 'name', header: 'Nombre'},
      {field: 'hours', header: 'Horas D / P / A'},
      {field: 'academicPeriod', header: 'Periodo académico'},
      {field: 'type', header: 'Tipo'},
      {field: 'isVisible', header: 'Estado'}
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
        id: ActionButtonsEnum.HIDE,
        label: 'Ocultar',
        icon: PrimeIcons.EYE_SLASH,
        command: () => {
          if (this.selectedItem?.id) this.hide(this.selectedItem.id);
        },
      },
      {
        id: ActionButtonsEnum.REACTIVATE,
        label: 'Mostrar',
        icon: PrimeIcons.EYE,
        command: () => {
          if (this.selectedItem?.id) this.reactivate(this.selectedItem.id);
        },

      },
      {
        id: ActionButtonsEnum.SUBJECT_REQUIREMENTS,
        label: 'Pre y Co Requisitos',
        icon: PrimeIcons.BOOK,
        command: () => {
          this.redirectSubjectRequirement();
        },

      }
    ];
  }

  validateActionButtons(item: SubjectModel): void {
    this.actionButtons = this.buildActionButtons;

    if (item.isVisible) {
      this.actionButtons.splice(this.actionButtons.findIndex(actionButton => actionButton.id === ActionButtonsEnum.REACTIVATE), 1);
    }

    if (!item.isVisible) {
      this.actionButtons.splice(this.actionButtons.findIndex(actionButton => actionButton.id === ActionButtonsEnum.HIDE), 1);
    }
  }

  /** Actions **/
  hide(id: string) {
    this.SubjectsHttpService.hide(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = false;
    });
  }

  reactivate(id: string) {
    this.SubjectsHttpService.reactivate(id).subscribe(item => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = true;
    });
  }

  /** Select & Paginate **/
  selectItem(item: SubjectModel) {
    this.isActionButtons = true;
    this.selectedItem = item;
    this.subjectsService.subject = item;
    this.validateActionButtons(item);
  }

  /** Redirects **/
  redirectCreateForm() {
    this.router.navigate([this.routesService.subjects, 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate([this.routesService.subjects, id]);
  }

  redirectSubjectRequirement() {
    this.router.navigate([this.routesService.subjects, this.selectedItem.id, 'subject-requirements']);
  }

  redirectCareers() {
    this.router.navigate([this.routesService.careers]);
  }

  redirectCurriculums() {
    this.router.navigate([this.routesService.curriculums]);
  }

  redirectEventList() {
    this.eventsService.model = {
      entity: this.selectedItem,
      label: 'Asignatura',
      routerLink: this.routesService.subjects,
      routerLabel: 'Asignaturas',
    };

    this.router.navigate([this.routesService.events]);
  }
}
