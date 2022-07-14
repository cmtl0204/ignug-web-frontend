import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {debounceTime} from "rxjs";
import {UserModel} from '@models/auth';
import {ColumnModel, PaginatorModel} from '@models/core';
import {UsersHttpService} from '@services/auth';
import {CoreService, MessageService} from '@services/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  columns: ColumnModel[];
  users: UserModel[] = [];
  loaded$ = this.coreService.loaded$;
  pagination$ = this.usersHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: FormControl = new FormControl('');
  selectedUsers: UserModel[] = [];

  constructor(
    private coreService: CoreService,
    public messageService: MessageService,
    private router: Router,
    private usersHttpService: UsersHttpService,
  ) {
    this.columns = this.getColumns();
    this.pagination$.subscribe((pagination) => this.paginator = pagination);
    this.search.valueChanges.pipe(debounceTime(600)).subscribe((_) => this.findAll());
  }

  ngOnInit() {
    this.findAll();
  }

  findAll(page: number = 0) {
    this.usersHttpService.findAll(page, this.search.value).subscribe((users) => this.users = users);
  }

  getColumns(): ColumnModel[] {
    return [
      {field: 'username', header: 'Username'},
      {field: 'name', header: 'Name'},
      {field: 'lastname', header: 'Lastname'},
      {field: 'email', header: 'Email'},
      {field: 'bloodType', header: 'Blood Type'},
      {field: 'updatedAt', header: 'Updated At'},
    ]
  }

  paginate(event: any) {
    this.findAll(event.page);
  }

  redirectCreateForm() {
    this.router.navigate(['/auth/users', 'new']);
  }

  redirectEditForm(id: number) {
    this.router.navigate(['/auth/users', id]);
  }

  remove(id: number) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.usersHttpService.remove(id).subscribe((user) => {
            this.users = this.users.filter(item => item.id !== user.id);
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
          });
          this.selectedUsers = [];
        });
      }
    });
  }
}
