import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from "primeng/api";
import {ColumnModel, PaginatorModel, SelectStudentDto, StudentModel} from '@models/core';
import {BreadcrumbService, CoreService, MessageService, RoutesService, StudentsHttpService} from '@services/core';

@Component({
  selector: 'app-student-list',
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
  protected selectedItem: SelectStudentDto = {};
  protected selectedItems: StudentModel[] = [];
  protected items: StudentModel[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    public coreService: CoreService,
    public messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private studentsHttpService: StudentsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Estudiantes'},
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
        this.items = response.data
      });
  }

  get buildColumns(): ColumnModel[] {
    return [
      {field: 'address', header: 'Dirección de residencia'},
      {field: 'community', header: 'Horas de integración'},
      {field: 'contactEmergencyName', header: 'Nombre de contacto de emergencia'},
      {field: 'contactEmergencyPhone', header: 'Número de contacto de emergencia'},
      {field: 'email', header: 'Correo'},
      {field: 'isVisible', header: 'Es Visible'}
    ];
  }

  get buildActionButtons(): MenuItem[] {
    return [
      {
        label: 'Actualizar',
        icon: PrimeIcons.PENCIL,
        command: () => {
          if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
        },
      },
      {
        label: 'Borrar',
        icon: PrimeIcons.TRASH,
        command: () => {
          if (this.selectedItem?.id) this.remove(this.selectedItem.id);
        },
      },
      {
        label: 'Ocultar',
        icon: PrimeIcons.LOCK,
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
      }
    ];
  }

  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.studentsHttpService.remove(id).subscribe((student) => {
            this.items = this.items.filter(item => item.id !== id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.studentsHttpService.removeAll(this.selectedItems).subscribe((students) => {
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
    this.studentsHttpService.hide(id).subscribe(student => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = false;
    });
  }

  reactivate(id: string) {
    this.studentsHttpService.reactivate(id).subscribe(student => {
      const index = this.items.findIndex(item => item.id === id);
      this.items[index].isVisible = true;;
    });
  }
  
  /** Select & Paginate **/
  selectItem(item: StudentModel) {
    this.isActionButtons = true;
    this.selectedItem = item;
  }
  
  paginate(event: any) {
    this.findAll(event.page);
  }

  /** Redirects **/
  redirectCreateForm() {
    this.router.navigate([this.routesService.students, 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate([this.routesService.students, id]);
  }
}
