import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from '@models/auth';
import {UsersHttpService} from '@services/auth';
import {CoreService, MessageService} from '@services/core';
import {ColumnModel, PaginatorDto} from '@models/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: UserModel[] = [];
  selectedUsers: UserModel[] = [];
  loaded$ = this.coreService.loaded$;
  columns: ColumnModel[];

  constructor(private usersHttpService: UsersHttpService,
              private coreService: CoreService,
              public messageService: MessageService,
              private router: Router) {
    this.columns = this.getColumns();
  }

  ngOnInit() {
    this.findAll();
  }

  create() {
    // this.router.navigate([`/auth/users/new`]);
    this.router.navigate(['/auth/users', 'new']);
  }

  edit(id: number) {
    // this.router.navigate([`/auth/users/${id}`]);
    this.router.navigate(['/auth/users', id]);
  }

  findAll() {
    this.usersHttpService.findAll().subscribe(users => {
        this.users = users;
      }
    );
  }

  getColumns(): ColumnModel[] {
    return [
      {field: 'username', header: 'Username'},
      {field: 'name', header: 'Name'},
      {field: 'lastname', header: 'Lastname'},
      {field: 'email', header: 'Email'},
      {field: 'bloodType', header: 'Blood Type'},
      {field: 'updatedAt', header: 'UpdatedAt'},
    ]
  }

  remove(id: number) {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.usersHttpService.remove(id).subscribe(flag => {
          if (flag) {
            this.users = this.users.filter(user => user.id !== id);
          }
        });
      }
    });
  }

  removeAll() {
    const ids = this.selectedUsers.map(user => user.id);
    this.usersHttpService.removeAll(ids).subscribe(flag => {
      if (flag) {
        this.selectedUsers.forEach(userDeleted => {
          this.users = this.users.filter(user => user.id !== userDeleted.id);
        });
      }
    });
  }
}
