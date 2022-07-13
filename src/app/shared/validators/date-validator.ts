import {FormControl, ValidationErrors} from '@angular/forms';
import {isDate, isBefore, isAfter, format} from 'date-fns';

export class DateValidators {
  static valid(control: FormControl): ValidationErrors | null {
    const value = control.value;

    if (value && !isNaN(new Date(value).getDate())) {
      return null;
    }

    return {dateInvalid: true};
  }

  static max(maxDate: Date): (control: FormControl) => ValidationErrors | null {
    return (control: FormControl): ValidationErrors | null => {
      const value = control.value;
      const isValid = value ? isBefore(value, maxDate) : true;
      return isValid ? null : {
        dateMax: {
          actualDate: format(value, 'yyyy-MM-dd'),
          requiredDate: format(maxDate, 'yyyy-MM-dd')
        }
      };
    };
  }

  static min(minDate: Date): (control: FormControl) => ValidationErrors | null {
    return (control: FormControl): ValidationErrors | null => {
      const value = control.value;
      const isValid = value ? isAfter(value, minDate) : true;
      return isValid ? null : {
        dateMin: {
          actualDate: format(value, 'yyyy-MM-dd'),
          requiredDate: format(minDate, 'yyyy-MM-dd')
        }
      };
    };
  }
}
