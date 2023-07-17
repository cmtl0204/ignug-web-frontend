import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { ColumnModel, PaginatorModel, SelectSubjectDto, SubjectModel } from '@models/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

import { BreadcrumbService, CoreService, MessageService, SubjectsHttpService } from '@services/core';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

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
    public subjectService: SubjectsHttpService,
    public coreService: CoreService,
    private breadcrumbService: BreadcrumbService,
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


  ngOnInit(): void {
  }

  findAll(page: number = 0) {
    this.subjectService.findAll(page, this.search.value).subscribe((subject) => this.subjects = subject);
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
        label: 'Delete',
        icon: PrimeIcons.TRASH,
        command: () => {
          if (this.selectedSubject?.id) this.remove(this.selectedSubject.id);
        },
      },
      {
        label: 'Ocultar',
        icon: PrimeIcons.LOCK,
        command: () => {
          if (this.selectedSubject?.id) this.suspend(this.selectedSubject.id);
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
          this.subjectService.remove(id).subscribe((subject) => {
            this.subjects = this.subjects.filter(item => item.id !== subject.id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.subjectService.removeAll(this.selectedSubjects).subscribe((subjects) => {
          this.selectedSubject.forEach(subjectDeleted => {
            this.subjects = this.subjects.filter(subject => subject.id !== subjectDeleted.id);
            this.paginator.totalItems--;
          });
          this.selectedsubject = [];
        });
      }
    });
  }

  selectSubject(subject: SubjectModel) {
    this.selectedSubject = subject;
  }

  hide(id: string) {
    this.subjectService.hide(id).subscribe(subject => {
      const index = this.subjects.findIndex(subject => subject.id === id);
      this.subjects[index].state = subject.state;
    });
  }

  reactivate(id: string) {
    this.subjectService.reactivate(id).subscribe(subject => {
      const index = this.subjects.findIndex(subject => subject.id === id);
      this.subjects[index] = subject;
    });
  }
}
