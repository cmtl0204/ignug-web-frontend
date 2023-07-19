import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {ColumnModel, PaginatorModel, SelectSubjectDto, SubjectModel} from '@models/core';
import {BreadcrumbService, CoreService, MessageService, SubjectsHttpService} from '@services/core';


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
  protected subjects: SubjectModel[] = [];

  constructor(
    public coreService: CoreService,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private router: Router,
    private subjectsHttpService: SubjectsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Subjects'},
    ]);
    this.paginator = this.coreService.paginator;
    this.search.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.findAll();
      }
    });
  }


  ngOnInit(): void {
  }

  checkState(subject: SubjectModel): string {
    if (subject.state) return 'danger';

    //if (subject.maxAttempts === 0) return 'warning';

    return 'success';
  }

  findAll(page: number = 0) {
    this.subjectsService.findAll(page, this.search.value).subscribe((subject) => this.subjects = subject);
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
        label: 'Update',
        icon: PrimeIcons.PENCIL,
        command: () => {
          if (this.selectedSubject?.id) this.redirectEditForm(this.selectedSubject.id);
        },
      },
      {
        label: 'Delete',
        icon: PrimeIcons.TRASH,
        command: () => {
          if (this.selectedSubject?.id) this.remove(this.selectedSubject.id);
        },
      },
      {
        label: 'Suspend',
        icon: PrimeIcons.LOCK,
        command: () => {
          if (this.selectedSubject?.id) this.suspend(this.selectedSubject.id);
        },
      },
      {
        label: 'Reactivate',
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
          this.subjectsService.remove(id).subscribe((subject) => {
            this.subjects = this.subjects.filter(item => item.id !== subject.id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.subjectsService.removeAll(this.selectedSubject).subscribe((subjects) => {
          this.selectedSubject.forEach(subjectDeleted => {
            this.subjects = this.subjects.filter(subject => subject.id !== subjectDeleted.id);
            this.paginator.totalItems--;
          });
          this.selectedsubject = [];
        });
      }
    });
  }

  selectsubject(subject: SubjectModel) {
    this.selectedSubject = subject;
  }

  suspend(id: string) {
    this.subjectsService.suspend(id).subscribe(subject => {
      const index = this.subjects.findIndex(subject => subject.id === id);
      this.subjects[index].state = subject.state;
    });
  }

  reactivate(id: string) {
    this.subjectsService.reactivate(id).subscribe(subject => {
      const index = this.subjects.findIndex(subject => subject.id === id);
      this.subjects[index] = subject;
    });
  }
}
