import {Component, OnInit} from '@angular/core';
import {UserModel} from '@models/auth';
import {UsersHttpService} from '@services/auth';
import {CoreService, MessageService} from '@services/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: UserModel[] = [];
  isLoading$ = this.coreService.loaded$;

  constructor(private usersHttpService: UsersHttpService,
              private coreService: CoreService,
              public messageService: MessageService) {

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

  edit(id: number) {
    console.log(id);
  }

  create() {

  }
}
