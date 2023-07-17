import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {debounceTime} from "rxjs";
import {ColumnModel, PaginatorModel} from '@models/core';
import {TeacherService, TeachersHttpService} from '@services/core';
import {BreadcrumbService, CoreService, MessageService} from '@services/core';
import {MenuItem} from "primeng/api";
import {SelectTeacherDto, TeacherModel} from '@models/core/teacher.model';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeacherListComponent implements OnInit {
  columns: ColumnModel[];
  isLoading = this.coreService.isLoading;
  pagination$ = this.teachersHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: UntypedFormControl = new UntypedFormControl('');
  selectedTeachers: TeacherModel[] = [];
  selectedTeacher: SelectTeacherDto = {};
  teachers: TeacherModel[] = [];
  actionButtons: MenuItem[] = [];

  constructor(
    public teacherService: TeacherService,
    private coreService: CoreService,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private router: Router,
    private teachersHttpService: TeachersHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Teachers'}
    ]);
    this.columns = this.getColumns();
    this.actionButtons = this.getActionButtons();
    this.pagination$.subscribe((pagination) => this.paginator = pagination);
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((_) => this.findAll());
  }

  ngOnInit() {
    this.findAll();
  }

  findAll(page: number = 0) {
    this.teachersHttpService.findAll(page, this.search.value).subscribe((teachers) => this.teachers = teachers);
  }

  getColumns(): ColumnModel[] {
    return [
      {field: 'name', header: 'Name'}
    ]
  }

  getActionButtons(): MenuItem[] {
    return [
      {
        label: 'Update',
        icon: 'pi pi-pencil',
        command: () => {
          if (this.selectedTeacher.id)
            this.redirectEditForm(this.selectedTeacher.id);
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          if (this.selectedTeacher.id)
            this.remove(this.selectedTeacher.id);
        },
      },
      {
        label: 'Suspend',
        icon: 'pi pi-lock',
        command: () => {
          if (this.selectedTeacher.id)
            this.suspend(this.selectedTeacher.id);
        },
      },
      {
        label: 'Reactivate',
        icon: 'pi pi-lock-open',
        command: () => {
          if (this.selectedTeacher.id)
            this.reactivate(this.selectedTeacher.id);
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
          this.selectedTeachers.forEach(userDeleted => {
            this.teachers = this.teachers.filter(user => user.id !== userDeleted.id);
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

  reactivate(id: string) {
    this.teachersHttpService.reactivate(id).subscribe(teacher => {
      const index = this.teachers.findIndex(teacher => teacher.id === id);
      this.teachers[index] = teacher;
    });
  }
}
