import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from "primeng/api";
import {SelectUserDto, UserModel} from '@models/auth';
import {ColumnModel, PaginatorModel} from '@models/core';
import {AuthService, UsersHttpService} from '@services/auth';
import {BreadcrumbService, CoreService, MessageService} from '@services/core';
import {BreadcrumbEnum} from "@shared/enums";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected buttonActions: MenuItem[] = this.buildButtonActions;
  protected columns: ColumnModel[] = this.buildColumns;
  protected isButtonActions: boolean = false;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected selectedUser: SelectUserDto = {};
  protected selectedUsers: UserModel[] = [];
  protected users: UserModel[] = [];

  constructor(
    public authService: AuthService,
    public coreService: CoreService,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private router: Router,
    private usersHttpService: UsersHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.USERS},
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
    this.usersHttpService.findAll(page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.users = response.data
      });
  }

  get buildColumns(): ColumnModel[] {
    return [
      {field: 'username', header: 'Username'},
      {field: 'name', header: 'Name'},
      {field: 'lastname', header: 'Lastname'},
      {field: 'email', header: 'Email'},
      {field: 'roles', header: 'Roles'},
      {field: 'suspendedAt', header: 'State'}
    ];
  }

  get buildButtonActions(): MenuItem[] {
    return [
      {
        label: 'Actualizar',
        icon: PrimeIcons.PENCIL,
        command: () => {
          if (this.selectedUser?.id) this.redirectEditForm(this.selectedUser.id);
        },
      },
      {
        label: 'Eliminar',
        icon: PrimeIcons.TRASH,
        command: () => {
          if (this.selectedUser?.id) this.remove(this.selectedUser.id);
        },
      },
      {
        label: 'Suspender',
        icon: PrimeIcons.LOCK,
        command: () => {
          if (this.selectedUser?.id) this.suspend(this.selectedUser.id);
        },
      },
      {
        label: 'Reactivar',
        icon: PrimeIcons.LOCK_OPEN,
        command: () => {
          if (this.selectedUser?.id) this.reactivate(this.selectedUser.id);
        },
      }
    ];
  }

  paginate(event: any) {
    this.findAll(event.page);
  }

  redirectCreateForm() {
    this.router.navigate(['/administration/users', 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate(['/administration/users', id]);
  }

  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.usersHttpService.remove(id).subscribe((user) => {
            this.users = this.users.filter(item => item.id !== user.id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.usersHttpService.removeAll(this.selectedUsers).subscribe((users) => {
          this.selectedUsers.forEach(userDeleted => {
            this.users = this.users.filter(user => user.id !== userDeleted.id);
            this.paginator.totalItems--;
          });
          this.selectedUsers = [];
        });
      }
    });
  }

  selectUser(user: UserModel) {
    this.isButtonActions = true;
    this.selectedUser = user;
  }

  suspend(id: string) {
    this.usersHttpService.suspend(id).subscribe(user => {
      const index = this.users.findIndex(user => user.id === id);
      this.users[index].suspendedAt = user.suspendedAt;
    });
  }

  reactivate(id: string) {
    this.usersHttpService.reactivate(id).subscribe(user => {
      const index = this.users.findIndex(user => user.id === id);
      this.users[index] = user;
    });
  }
}
