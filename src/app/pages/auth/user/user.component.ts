import {Component} from '@angular/core';
import {UsersHttpService} from '@services/core/users-http.service';
import {UserModel} from '@models/auth/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user: UserModel = {};

  constructor(private usersService: UsersHttpService) {
    this.findAll();
    // this.findOne();
    // this.remove();
    // this.create();
    // this.update();
  }

  create() {
    this.user = {
      bloodTypeId: 1,
      username: '12345',
      name: 'Juan',
      lastname: 'Perez',
      password: '1234',
      email: 'correo1@gmail.com'
    };

    this.usersService.create(this.user).subscribe(response => {
      console.log(response);
    });
  }

  findAll() {
    this.usersService.findAll().subscribe(response => {
      console.log(response);
    });
  }

  findOne() {
    this.usersService.findOne(1).subscribe(response => {
      console.log(response);
    });
  }

  update() {
    this.user = {
      email: 'correo1@outlook.com'
    };
    this.usersService.update(6, this.user).subscribe(response => {
      console.log(response);
    });
  }

  remove() {
    this.usersService.remove(1).subscribe(response => {
      console.log(response);
    });
  }
}
