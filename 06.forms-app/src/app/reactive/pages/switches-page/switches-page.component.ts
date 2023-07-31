import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '@/shared/services/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  public person = {
    gender: 'F',
    wantNotifications: false,
  }

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) {
      return null;
    }

    const errors = this.myForm.controls[field].errors ?? {};

    for (const key in errors) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength']?.requiredLength} carácteres`;
      }
    }

    return null;
  }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);
  }

}
