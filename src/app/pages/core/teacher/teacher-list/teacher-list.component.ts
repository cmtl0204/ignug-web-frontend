import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {ColumnModel, PaginatorModel, SelectTeacherDto, TeacherModel} from '@models/core';
import {BreadcrumbService, CoreService, MessageService, TeachersHttpService} from '@services/core';


@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeacherListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected actionButtons: MenuItem[] = this.buildActionButtons;
  protected columns: ColumnModel[] = this.buildColumns;
  protected isActionButtons: boolean = false;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected selectedTeacher: SelectTeacherDto = {};
  protected selectedTeachers: TeacherModel[] = [];
  protected teachers: TeacherModel[] = [];

  constructor(
    public coreService: CoreService,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private router: Router,
    private teachersHttpService: TeachersHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Teachers'},
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

  checkState(teacher: TeacherModel): string {
    if (teacher.state) return 'danger';

    //if (teacher.maxAttempts === 0) return 'warning';

    return 'success';
  }

  findAll(page: number = 0) {
    this.teachersHttpService.findAll(page, this.search.value).subscribe((teachers) => this.teachers = teachers);
  }

  get buildColumns(): ColumnModel[] {
    return [
      {field: 'teacher', header: 'Profesor'},
      {field: 'countryHigherEducation', header: 'Nota mas alta'},
      {field: 'higherEducation', header: 'Educacion superior'},
      {field: 'academicUnit', header: 'Unidad academica'},
      {field: 'classHours', header: 'Horas de clase'},
      {field: 'holidays', header: 'Feriados'},
      {field: 'state', header: 'Estado'}
    ];
  }

  get buildActionButtons(): MenuItem[] {
    return [
      {
        label: 'Update',
        icon: PrimeIcons.PENCIL,
        command: () => {
          if (this.selectedTeacher?.id) this.redirectEditForm(this.selectedTeacher.id);
        },
      },
      {
        label: 'Delete',
        icon: PrimeIcons.TRASH,
        command: () => {
          if (this.selectedTeacher?.id) this.remove(this.selectedTeacher.id);
        },
      },
      {
        label: 'Suspend',
        icon: PrimeIcons.LOCK,
        command: () => {
          if (this.selectedTeacher?.id) this.suspend(this.selectedTeacher.id);
        },
      },
      {
        label: 'Reactivate',
        icon: PrimeIcons.LOCK_OPEN,
        command: () => {
          if (this.selectedTeacher?.id) this.reactivate(this.selectedTeacher.id);
        },
      }
    ];
  }


  paginate(event: any) {
    this.findAll(event.page);
  }

  redirectCreateForm() {
    this.router.navigate(['/administration/teachers', 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate(['/administration/teachers', id]);
  }

  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.teachersHttpService.remove(id).subscribe((teacher) => {
            this.teachers = this.teachers.filter(item => item.id !== teacher.id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.teachersHttpService.removeAll(this.selectedTeachers).subscribe((teachers) => {
          this.selectedTeachers.forEach(teacherDeleted => {
            this.teachers = this.teachers.filter(teacher => teacher.id !== teacherDeleted.id);
            this.paginator.totalItems--;
          });
          this.selectedTeachers = [];
        });
      }
    });
  }

  selectTeacher(teacher: TeacherModel) {
    this.selectedTeacher = teacher;
  }

  suspend(id: string) {
    this.teachersHttpService.hide(id).subscribe(teacher => {
      const index = this.teachers.findIndex(teacher => teacher.id === id);
      // this.teachers[index].isVisible = teacher.state;
    });
  }

  reactivate(id: string) {
    this.teachersHttpService.reactivate(id).subscribe(teacher => {
      const index = this.teachers.findIndex(teacher => teacher.id === id);
      this.teachers[index] = teacher;
    });
  }
}
