import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  public static readonly firstNameAndLastnamePattern: string =
    '([a-zA-Z]+) ([a-zA-Z]+)';

  public static readonly emailPattern: string =
    '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  public cantBeStrider(control: AbstractControl): ValidationErrors | null {
    const value = (control.value as string)?.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      };
    }

    return null;
  }

  public isValidField(form: FormGroup, field: string) {
    return form.get(field)?.errors && form.get(field)?.touched;
  }

  public isFieldOneEqualFieldTwo(field1: string, field2: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }
}
