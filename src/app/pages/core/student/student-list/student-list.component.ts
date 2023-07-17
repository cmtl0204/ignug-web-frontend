import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {debounceTime} from "rxjs";
import {ColumnModel, PaginatorModel, StudentModel, SelectStudentDto} from '@models/core';
import {AuthService} from '@services/auth';
import {BreadcrumbService, CoreService, MessageService, StudentsHttpService} from '@services/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  columns: ColumnModel[];
  isLoading = this.coreService.isLoading;
  pagination$ = this.studentsHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: UntypedFormControl = new UntypedFormControl('');
  selectedStudents: StudentModel[] = [];
  selectedStudent: SelectStudentDto = {};
  students: StudentModel[] = [];
  actionButtons: MenuItem[] = [];

  constructor(
    public authService: AuthService,
    private coreService: CoreService,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private router: Router,
    private studentsHttpService: StudentsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Students'}
    ]);
    this.columns = this.getColumns();
    this.actionButtons = this.getActionButtons();
    this.pagination$.subscribe((pagination) => this.paginator = pagination);
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((_) => this.findAll());
  }

  ngOnInit() {
    this.findAll();
  }

  checkState(students: StudentModel): string {
    if (students.suspendedAt) return 'danger';

   /* if (students.maxAttempts === 0) return 'warning';*/

    return 'success';
  }

  findAll(page: number = 0) {
    this.studentsHttpService.findAll(page, this.search.value).subscribe((students) => this.students = students);
  }

  getColumns(): ColumnModel[] {
    return [
      {field: 'username', header: 'Username'},
      {field: 'name', header: 'Name'},
      {field: 'lastname', header: 'Lastname'},
      {field: 'email', header: 'Email'},
      {field: 'roles', header: 'Roles'},
      {field: 'suspendedAt', header: 'State'},
    ]
  }

  getActionButtons(): MenuItem[] {
    return [
      {
        label: 'Update',
        icon: 'pi pi-pencil',
        command: () => {
          if (this.selectedStudent.id)
            this.redirectEditForm(this.selectedStudent.id);
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          if (this.selectedStudent.id)
            this.remove(this.selectedStudent.id);
        },
      },
      {
        label: 'Suspend',
        icon: 'pi pi-lock',
        command: () => {
          if (this.selectedStudent.id)
            this.suspend(this.selectedStudent.id);
        },
      },
      {
        label: 'Reactivate',
        icon: 'pi pi-lock-open',
        command: () => {
          if (this.selectedStudent.id)
            this.reactivate(this.selectedStudent.id);
        },
      }
    ];
  }

  paginate(event: any) {
    this.findAll(event.page);
  }

  redirectCreateForm() {
    this.router.navigate(['/administration/students', 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate(['/administration/students', id]);
  }

  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.studentsHttpService.remove(id).subscribe((student) => {
            this.students = this.students.filter(item => item.id !== student.id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.studentsHttpService.removeAll(this.selectedStudents).subscribe((students) => {
          this.selectedStudents.forEach(studentDeleted => {
            this.students = this.students.filter(student => student.id !== studentDeleted.id);
            this.paginator.totalItems--;
          });
          this.selectedStudents = [];
        });
      }
    });
  }

  selectStudent(student: StudentModel) {
    this.selectedStudent = student;
  }

  suspend(id: string) {
    this.studentsHttpService.suspend(id).subscribe(student => {
      const index = this.students.findIndex(student => student.id === id);
      this.students[index].suspendedAt = student.suspendedAt;
    });
  }

  reactivate(id: string) {
    this.studentsHttpService.reactivate(id).subscribe(student => {
      const index = this.students.findIndex(student => student.id === id);
      this.students[index] = student;
    });
  }

}
