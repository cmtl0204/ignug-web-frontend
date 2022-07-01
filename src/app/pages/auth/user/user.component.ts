import {Component} from '@angular/core';
import {UsersHttpService} from '@services/core/users-http.service';
import {CreateUserDto, UpdateUserDto, UserModel} from '@models/auth/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  createUserDto: CreateUserDto = {};
  updateUserDto: UpdateUserDto = {};

  constructor(private usersService: UsersHttpService) {
    // this.findAll();
    // this.findOne();
    // this.remove();
    this.create();
    // this.update();
  }

  create() {
    this.createUserDto = {
      bloodTypeId: 1,
      username: '12345',
      name: 'Juan',
      lastname: 'Perez',
      password: '1234',
      email: 'correo2@gmail.com'
    };

    this.usersService.create(this.createUserDto).subscribe(user => {
      console.log(user);
    });
  }

  findAll() {
    this.usersService.findAll().subscribe(users => {
      console.log(users);
    });
  }

  findOne() {
    this.usersService.findOne(1).subscribe(user => {
      console.log(user);
    });
  }

  update() {
    this.updateUserDto = {
      email: 'correo1@outlook.com'
    };
    this.usersService.update(5, this.updateUserDto).subscribe(user => {
      console.log(user);
    });
  }

  remove() {
    this.usersService.remove(1).subscribe(flag => {
      console.log(flag);
    });
  }
}
