import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CreateUserDto, UpdateUserDto} from '@models/auth';
import {UsersHttpService} from '@services/auth';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  id: number = 0;
  form: FormGroup = this.newForm;

  constructor(private activatedRoute: ActivatedRoute,
              private usersHttpService: UsersHttpService,
              private formBuilder: FormBuilder) {
    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
    }
  }

  ngOnInit(): void {
    if (this.id > 0) {
      this.getUser();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      bloodType: [null, [Validators.required]],
      birthdate: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      lastname: [null, [Validators.required]],
      name: [null, [Validators.required]],
      username: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.id > 0) {
        this.update(this.form.value);
      } else {
        this.create(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  create(user: CreateUserDto) {
    this.usersHttpService.create(user).subscribe(user => {
      console.log(user);
    });
  }

  update(user: UpdateUserDto) {
    this.usersHttpService.update(this.id, user).subscribe(user => {
      console.log(user);
    });
  }

  getUser() {
    this.usersHttpService.findOne(this.id).subscribe(user => {
        this.form.reset(user);
      }
    );
  }

  get bloodTypeField() {
    return this.form.get('bloodType');
  }

  get birthdateField() {
    return this.form.get('birthdate');
  }

  get emailField() {
    return this.form.get('email');
  }

  get lastnameField() {
    return this.form.get('lastname');
  }

  get nameField() {
    return this.form.get('name');
  }

  get usernameField() {
    return this.form.get('username');
  }
}
