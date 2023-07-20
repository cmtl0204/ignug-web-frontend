import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {TeacherModel, ColumnModel, PaginatorModel, SelectTeacherDto} from '@models/core';
import {BreadcrumbService, TeachersHttpService, CoreService, MessageService} from '@services/core';

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
    private breadcrumbService: BreadcrumbService,
    private teachersHttpService: TeachersHttpService,
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
    this.teachersHttpService.findAll(page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.teachers = response.data;
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
          if (this.selectedTeacher?.id) this.redirectEditForm(this.selectedTeacher.id);
        },
      },
      {
        label: 'Eliminar',
        icon: PrimeIcons.TRASH,
        command: () => {
          if (this.selectedTeacher?.id) this.remove(this.selectedTeacher.id);
        },
      },
      {
        label: 'Suspender',
        icon: PrimeIcons.LOCK,
        command: () => {
          if (this.selectedTeacher?.id) this.hide(this.selectedTeacher.id);
        },
      },
      {
        label: 'Reactivar',
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
    this.router.navigate(['/administration/Teachers', 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate(['/administration/Teachers', id]);
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
        this.teachersHttpService.removeAll(this.selectedTeachers).subscribe((Teachers) => {
          this.selectedTeachers.forEach(TeacherDeleted => {
            this.teachers = this.teachers.filter(teacher => teacher.id !== TeacherDeleted.id);
            this.paginator.totalItems--;
          });
          this.selectedTeachers = [];
        });
      }
    });
  }

  selectTeacher(teacher: TeacherModel) {
    this.isActionButtons = true;
    this.selectedTeacher = teacher;
  }

  hide(id: string) {
    this.teachersHttpService.hide(id).subscribe(teacher => {
      const index = this.teachers.findIndex(teacher => teacher.id === id);
      this.teachers[index].isVisible = false;
    });
  }

  reactivate(id: string) {
    this.teachersHttpService.reactivate(id).subscribe(teacher => {
      const index = this.teachers.findIndex(teacher => teacher.id === id);
      this.teachers[index] = teacher;
    });
  }
}
