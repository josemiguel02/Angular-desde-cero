import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '@/shared/services/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoritesGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ])
  });

  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  get favoritesGames() {
    return this.myForm.get('favoritesGames') as FormArray;
  }

  set favoritesGames(formArray: FormArray) {
    (this.myForm.controls['favoritesGames'] as FormArray) = formArray;
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  isValidFieldInArray(formArray: FormArray, idx: number): boolean | null {
    return formArray.controls[idx].errors
      && formArray.controls[idx].touched;
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

  onAddToFavorites() {
    if (this.newFavorite.invalid) {
      return;
    }

    const newGame = this.newFavorite.value;

    this.favoritesGames.push(
      this.fb.control(newGame, [Validators.required])
    );

    this.newFavorite.reset();
  }

  onDeleteFavorite(idx: number) {
    this.favoritesGames.removeAt(idx);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.favoritesGames = this.fb.array([]);

    this.myForm.reset();
  }
}
