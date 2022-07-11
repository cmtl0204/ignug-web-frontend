import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from '@models/auth';
import {UsersHttpService} from '@services/auth';
import {CoreService, MessageService} from '@services/core';
import {ColumnModel, PaginatorDto, PaginatorModel} from '@models/core';
import {FormControl} from "@angular/forms";
import {debounceTime, delay, takeUntil} from "rxjs";

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
  pagination = this.usersHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: FormControl = new FormControl('');

  constructor(private usersHttpService: UsersHttpService,
              private coreService: CoreService,
              public messageService: MessageService,
              private router: Router) {
    this.columns = this.getColumns();
    this.search.valueChanges.pipe(debounceTime(600)).subscribe(value => {
      this.findAll();
    });
    this.pagination.subscribe(pagination => {
      this.paginator.totalItems = pagination.totalItems;
      this.paginator.limit = pagination.limit;
    });
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

  findAll(page: number = 1) {
    this.usersHttpService.findAll(page, this.search.value).subscribe(users => {
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

  paginate(event: any) {
    this.paginator.page = event.page + 1;
    this.findAll(this.paginator.page);
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
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.usersHttpService.removeAll(this.selectedUsers).subscribe(users => {
          this.selectedUsers.forEach(userDeleted => {
            this.users = this.users.filter(user => user.id !== userDeleted.id);
          });
          this.selectedUsers = [];
        });
      }
    });
  }
}
