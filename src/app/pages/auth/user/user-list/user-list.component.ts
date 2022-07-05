import {Component, OnInit} from '@angular/core';
import {UserModel} from '@models/auth';
import {UsersHttpService} from '@services/auth';
import {CoreService, MessageService} from '@services/core';
import {ColModel, PaginatorDto} from '@models/core';
import {ConfirmEventType} from "primeng/api";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: UserModel[] = [];
  selectedUsers: UserModel[] = [];
  loaded$ = this.coreService.loaded$;
  cols: ColModel[] = [];

  constructor(private usersHttpService: UsersHttpService,
              private coreService: CoreService,
              public messageService: MessageService) {
    this.cols = this.getColumns();
  }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.usersHttpService.findAll().subscribe(users => {
        this.users = users;
      }
    );
  }

  remove(id: number) {
    this.usersHttpService.remove(id).subscribe(flag => {
      if (flag) {
        this.users = this.users.filter(user => user.id !== id);
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

  edit(id: number) {
    console.log(id);
  }

  create() {

  }

  getColumns() {
    return [
      {field: 'username', header: 'Username'},
      {field: 'name', header: 'Name'},
      {field: 'lastname', header: 'Lastname'},
      {field: 'email', header: 'Email'},
      {field: 'bloodType', header: 'Blood Type'},
      {field: 'createdAt', header: 'CreatedAt'},
    ]
  }
}
