import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomValidators} from "@shared/validators/custom-validators";
import {AuthHttpService, AuthService} from '@services/auth';
import {MessageService} from '@services/core';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  form: FormGroup;
  progressBar: boolean = false;

  constructor(
    private authHttpService: AuthHttpService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private router: Router,
  ) {
    this.form = this.newForm();
  }

  ngOnInit(): void {

  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: [null, [Validators.required]],
      passwordOld: [null, [Validators.required, Validators.minLength(8)]],
    }, {validators: CustomValidators.passwordMatchValidator});
  }

  onSubmit() {
    if (this.form.valid) {
      this.changePassword();
    } else {
      this.form.markAllAsTouched();
    }
  }

  changePassword() {
    this.authHttpService.resetPassword(this.form.value)
      .subscribe(
        response => {
          this.redirect();
        });
  }

  redirect() {
    this.router.navigate(['/auth/login']);
  }

  get usernameField() {
    return this.form.controls['username'];
  }

  get passwordField() {
    return this.form.controls['password'];
  }

  get passwordConfirmationField() {
    return this.form.controls['passwordConfirmation'];
  }

  get passwordOldField() {
    return this.form.controls['passwordOld'];
  }

}
