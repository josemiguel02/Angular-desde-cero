import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './selector-page.component.html',
})
export class SelectorPageComponent {

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
  ) {}

}
