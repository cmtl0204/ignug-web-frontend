import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {SubjectModel, ColumnModel, PaginatorModel, SelectSubjectDto} from '@models/core';
import {BreadcrumbService, SubjectsHttpService, CoreService, MessageService} from '@services/core';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubjectListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected actionButtons: MenuItem[] = this.buildActionButtons;
  protected columns: ColumnModel[] = this.buildColumns;
  protected isActionButtons: boolean = false;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected selectedSubject: SelectSubjectDto = {};
  protected selectedSubjects: SubjectModel[] = [];
  protected Subjects: SubjectModel[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private subjectsHttpService: SubjectsHttpService,
    public coreService: CoreService,
    public messageService: MessageService,
    private router: Router,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Asignaturas'},
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
    this.subjectsHttpService.findAll(page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.Subjects = response.data;
      });
  }

  get buildColumns(): ColumnModel[] {
    return [
      {field: 'autonomousHour', header: 'Horas autonomas'},
      {field: 'code', header: 'Codigo'},
      {field: 'name', header: 'Nombre'},
      {field: 'practicalHour', header: 'Horas practicas'},
      {field: 'scale', header: 'Escala'},
      {field: 'credit', header: 'Credito'},
      {field: 'teacherHour', header: 'Horas profesor'},
      {field: 'suspendedAt', header: 'Estado'},
    ];
  }

  get buildActionButtons(): MenuItem[] {
    return [
      {
        label: 'Actualizar',
        icon: PrimeIcons.PENCIL,
        command: () => {
          if (this.selectedSubject?.id) this.redirectEditForm(this.selectedSubject.id);
        },
      },
      {
        label: 'Eliminar',
        icon: PrimeIcons.TRASH,
        command: () => {
          if (this.selectedSubject?.id) this.remove(this.selectedSubject.id);
        },
      },
      {
        label: 'Suspender',
        icon: PrimeIcons.LOCK,
        command: () => {
          if (this.selectedSubject?.id) this.hide(this.selectedSubject.id);
        },
      },
      {
        label: 'Reactivar',
        icon: PrimeIcons.LOCK_OPEN,
        command: () => {
          if (this.selectedSubject?.id) this.reactivate(this.selectedSubject.id);
        },
      }
    ];
  }

  paginate(event: any) {
    this.findAll(event.page);
  }

  redirectCreateForm() {
    this.router.navigate(['/administration/subjects', 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate(['/administration/subjects', id]);
  }

  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.subjectsHttpService.remove(id).subscribe((subject) => {
            this.Subjects = this.Subjects.filter(item => item.id !== subject.id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.subjectsHttpService.removeAll(this.selectedSubjects).subscribe((subjects) => {
          this.selectedSubjects.forEach(subjectDeleted => {
            this.Subjects = this.Subjects.filter(subject => subject.id !== subjectDeleted.id);
            this.paginator.totalItems--;
          });
          this.selectedSubjects = [];
        });
      }
    });
  }

  selectSubject(subject: SubjectModel) {
    this.isActionButtons = true;
    this.selectedSubject = subject;
  }

  hide(id: string) {
    this.subjectsHttpService.hide(id).subscribe(subject => {
      const index = this.Subjects.findIndex(subject => subject.id === id);
      this.Subjects[index].isVisible = false;
    });
  }

  reactivate(id: string) {
    this.subjectsHttpService.reactivate(id).subscribe(subject => {
      const index = this.Subjects.findIndex(subject => subject.id === id);
      this.Subjects[index] = subject;
    });
  }
}
