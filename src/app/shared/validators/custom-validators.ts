import {AbstractControl, Validators} from '@angular/forms';
import {AuthHttpService} from "@services/auth";
import {map} from "rxjs/operators";

export class CustomValidators {
  static required({value}: AbstractControl): boolean {
    if (value)
      return value.hasValidator(Validators.required);
    else
      return false;
  }

  static passwordMatchValidator(control: AbstractControl) {
    const newPassword: string = control.get('newPassword')?.value; // get password from our password form control
    const confirmationPassword: string = control.get('confirmationPassword')?.value; // get password from our confirmPassword form control
    // compare is the password math
    if (newPassword !== confirmationPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmationPassword')?.setErrors({noPasswordMatch: true});
      return { noPasswordMatch: true };
    } else {
      control.get('confirmationPassword')?.setErrors(null);
      return null;
    }
  }

  static verifyUser(authHttpService: AuthHttpService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return authHttpService.verifyUser(value)
        .pipe(
          map(response => {
            return response.data === null ? null : {userNotAvailable: true};
          })
        )
    };
  }

  static validateUser(authHttpService: AuthHttpService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return authHttpService.verifyUser(value)
        .pipe(
          map(response => {
            return response.data === null ? null : {userAvailable: true};
          })
        )
    };
  }

  static verifyEmail(authHttpService: AuthHttpService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return authHttpService.verifyEmail(value)
        .pipe(
          map(response => {
            return response.data === null ? null : {emailNotAvailable: true};
          })
        )
    };
  }

  static verifyPhone(authHttpService: AuthHttpService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return authHttpService.verifyPhone(value)
        .pipe(
          map(response => {
            return response.data === null ? null : {phoneNotAvailable: true};
          })
        )
    };
  }
}
