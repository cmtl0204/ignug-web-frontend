import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CreateUserDto, UpdateUserDto} from '@models/auth';
import {UsersHttpService} from '@services/auth';
import {CataloguesHttpService, CoreService} from '@services/core';
import {CatalogueModel, ColumnModel, PaginatorModel} from '@models/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  id: number = 0;
  form: FormGroup = this.newForm;
  loaded$ = this.coreService.loaded$;
  bloodTypes: CatalogueModel[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private usersHttpService: UsersHttpService,
              private cataloguesHttpService: CataloguesHttpService,
              private formBuilder: FormBuilder,
              private coreService: CoreService,
              private location: Location) {
    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
    }
  }

  ngOnInit(): void {
    this.loadBloodTypes();
    if (this.id > 0) {
      this.getUser();
      this.passwordField.clearValidators();
    } else {

    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      bloodType: [null, [Validators.required]],
      birthdate: [null, [Validators.required]],
      email: [null, [Validators.email]],
      lastname: [null, [Validators.required]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      username: [null, [Validators.required, Validators.minLength(3)]],
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

  back() {
    this.location.back();
  }

  create(user: CreateUserDto) {
    this.usersHttpService.create(user).subscribe(user => {
      this.back();
    });
  }

  getUser() {
    this.usersHttpService.findOne(this.id).subscribe(user => {
        this.form.reset(user);
      }
    );
  }

  isRequire(control: AbstractControl): boolean {
    return control.hasValidator(Validators.required);
  }

  loadBloodTypes() {
    this.cataloguesHttpService.catalogue().subscribe(bloodTypes => {
        this.bloodTypes = bloodTypes;
      }
    );
  }

  update(user: UpdateUserDto) {
    this.usersHttpService.update(this.id, user).subscribe(user => {
      this.back();
    });
  }

  get bloodTypeColumns(): ColumnModel[] {
    return [
      {field: 'name', header: 'Name'},
      {field: 'lastname', header: 'Lastname'},
    ]
  }

  get bloodTypeField() {
    return this.form.controls['bloodType'];
  }

  get birthdateField() {
    return this.form.controls['birthdate'];
  }

  get emailField() {
    return this.form.controls['email'];
  }

  get lastnameField() {
    return this.form.controls['lastname'];
  }

  get nameField() {
    return this.form.controls['name'];
  }

  get passwordField() {
    return this.form.controls['password'];
  }

  get usernameField() {
    return this.form.controls['username'];
  }
}
