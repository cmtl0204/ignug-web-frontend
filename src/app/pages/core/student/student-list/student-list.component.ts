import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from "primeng/api";
import {ColumnModel, PaginatorModel, SelectStudentDto, StudentModel} from '@models/core';
import {BreadcrumbService, CoreService, MessageService, StudentsHttpService} from '@services/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected actionButtons: MenuItem[] = this.buildActionButtons;
  protected columns: ColumnModel[] = this.buildColumns;
  protected isActionButtons: boolean = false;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected selectedStudent: SelectStudentDto = {};
  protected selectedStudents: StudentModel[] = [];
  protected students: StudentModel[] = [];

  constructor(
    public coreService: CoreService,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private router: Router,
    private studentsHttpService: StudentsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Students'},
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
    this.studentsHttpService.findAll(page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.students = response.data
      });
  }

  get buildColumns(): ColumnModel[] {
    return [
      {field: 'informationStudent', header: 'Información'},
      {field: 'user', header: 'Usuario'},
    ];
  }

  get buildActionButtons(): MenuItem[] {
    return [
      {
        label: 'Actualizar',
        icon: PrimeIcons.PENCIL,
        command: () => {
          if (this.selectedStudent?.id) this.redirectEditForm(this.selectedStudent.id);
        },
      },
      {
        label: 'Borrar',
        icon: PrimeIcons.TRASH,
        command: () => {
          if (this.selectedStudent?.id) this.remove(this.selectedStudent.id);
        },
      },
      {
        label: 'Oultar',
        icon: PrimeIcons.LOCK,
        command: () => {
          if (this.selectedStudent?.id) this.hide(this.selectedStudent.id);
        },
      },
      {
        label: 'Reactivar',
        icon: PrimeIcons.LOCK_OPEN,
        command: () => {
          if (this.selectedStudent?.id) this.reactivate(this.selectedStudent.id);
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

  selectUser(user: StudentModel) {
    this.selectedStudent = user;
  }

  hide(id: string) {
    this.studentsHttpService.hide(id).subscribe(student => {
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
