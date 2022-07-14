import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateUserDto, UpdateUserDto} from '@models/auth';
import {CatalogueModel, ColumnModel} from '@models/core';
import {UsersHttpService} from '@services/auth';
import {CataloguesHttpService, CoreService, MessageService} from '@services/core';
import {OnExitInterface} from '@shared/interfaces';
import {DateValidators} from '@shared/validators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnExitInterface {
  id: number = 0;
  bloodTypes: CatalogueModel[] = [];
  form: FormGroup = this.newForm;
  loaded$ = this.coreService.loaded$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cataloguesHttpService: CataloguesHttpService,
    private coreService: CoreService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private usersHttpService: UsersHttpService,
  ) {
    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
    }
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched || this.form.dirty) {
      return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {
    this.loadBloodTypes();

    if (this.id > 0) {
      this.getUser();
      this.passwordField.clearValidators();
    } else {
      //Todo: Revisar para el perfil, que mas se puede implementar
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      bloodType: [null, [Validators.required]],
      birthdate: [null, [Validators.required, DateValidators.min(new Date()), DateValidators.max(new Date('2022-07-18'))]],
      email: [null, [Validators.email]],
      lastname: [null, [Validators.required]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      roles: [['admin'], [Validators.required]],
      username: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
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

  back(): void {
    this.router.navigate(['/auth/users']);
  }

  create(user: CreateUserDto): void {
    this.usersHttpService.create(user).subscribe(user => {
      this.form.reset(user);
      this.back();
    });
  }

  getUser(): void {
    this.usersHttpService.findOne(this.id).subscribe((user) => this.form.patchValue(user));
  }

  loadBloodTypes(): void {
    this.cataloguesHttpService.catalogue().subscribe((bloodTypes) => this.bloodTypes = bloodTypes);
  }

  update(user: UpdateUserDto): void {
    this.usersHttpService.update(this.id, user).subscribe((user) => {
      this.form.reset(user);
      this.back()
    });
  }

  get bloodTypeField(): AbstractControl {
    return this.form.controls['bloodType'];
  }

  get birthdateField(): AbstractControl {
    return this.form.controls['birthdate'];
  }

  get emailField(): AbstractControl {
    return this.form.controls['email'];
  }

  get lastnameField(): AbstractControl {
    return this.form.controls['lastname'];
  }

  get nameField(): AbstractControl {
    return this.form.controls['name'];
  }

  get passwordField(): AbstractControl {
    return this.form.controls['password'];
  }

  get usernameField(): AbstractControl {
    return this.form.controls['username'];
  }
}

