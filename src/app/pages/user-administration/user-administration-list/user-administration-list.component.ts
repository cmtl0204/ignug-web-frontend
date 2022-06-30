import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {UserAdministrationHttpService} from '@services/core/user-administration-http.service';
import {MessageService} from '@services/core/message.service';
import {ColModel, PaginatorModel} from '@models/core';
import {UserModel} from '@models/auth';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-user-administration-list',
  templateUrl: './user-administration-list.component.html',
  styleUrls: ['./user-administration-list.component.scss']
})

export class UserAdministrationListComponent implements OnInit {
  users$ = this.userAdministrationHttpService.users$;
  user$ = this.userAdministrationHttpService.user$;
  // loading$ = this.userAdministrationHttpService.loading$;
  // paginator$ = this.userAdministrationHttpService.paginator$;
  selectedUsers: UserModel[] = [];
  selectedUser: UserModel = {};
  cols: ColModel[];
  items: MenuItem[] = [];
  dialogForm: boolean = false;
  progressBarDelete: boolean = false;
  search: FormControl = new FormControl('');
  paginator: PaginatorModel = {currentPage: 1, perPage: 5, totalItems: 0};

  constructor(private userAdministrationHttpService: UserAdministrationHttpService,
              public messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) {
    this.cols = [
      {field: 'username', header: 'Número de documento'},
      {field: 'name', header: 'Nombres'},
      {field: 'lastname', header: 'Apellidos'},
      {field: 'email', header: 'Correo'},
      {field: 'updatedAt', header: 'Última actualización'},
    ];
    this.items = [
      {
        label: 'Cambiar Contraseña', icon: 'pi pi-key', command: () => {
          this.changePassword();
        }
      },
      {
        label: 'Suspender Usuario', icon: 'pi pi-user-minus', command: () => {
          this.deleteUser(this.selectedUser);
        }
      },
      {
        label: 'Cambiar Roles', icon: 'pi pi-id-card', command: () => {
          this.changePassword();
        }
      },
      {
        label: 'Cambiar Permisos', icon: 'pi pi-sitemap', command: () => {
          this.changePassword();
        }
      }
    ];
    // this.paginator$.subscribe(response => {
    //   this.paginator = response;
    // });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = 1) {
    this.userAdministrationHttpService.getUsers(page, this.search.value);
  }

  showForm(user: UserModel = {}) {
    this.selectedUser = user;
    this.userAdministrationHttpService.selectUser(user);
    this.dialogForm = true;
  }

  selectUser(user: UserModel) {
    this.selectedUser = user;
  }

  deleteUser(user: UserModel): void {
    // this.messageService.questionDelete({})
    //   .then((result) => {
    //     if (result.isConfirmed) {
    //       this.userAdministrationHttpService.deleteUser(user.id).subscribe(
    //         response => {
    //           this.messageService.success(response);
    //         },
    //         error => {
    //           this.messageService.error(error);
    //         }
    //       );
    //     }
    //   });
  }

  deleteUsers(): void {
    // this.messageService.questionDelete({})
    //   .then((result) => {
    //     if (result.isConfirmed) {
    //       const ids = this.selectedUsers.map(element => element.id);
    //       this.userAdministrationHttpService.deleteUsers(ids).subscribe(
    //         response => {
    //           this.messageService.success(response);
    //         },
    //         error => {
    //           this.messageService.error(error);
    //         }
    //       );
    //     }
    //   });

  }

  changePassword() {

  }

  filter(event: any) {
    if (event.key === 'Enter' || event.type === 'click') {
      this.loadUsers();
    }
  }

  paginate(event: any) {
    this.paginator.currentPage = event.page + 1;
    this.loadUsers(this.paginator.currentPage);
  }

  redirectNotFound() {
    this.router.navigate(['/common/not-found']);
  }
}
