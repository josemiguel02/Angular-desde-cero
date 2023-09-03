import { Directive, ElementRef, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective {

  private readonly elementRef?: ElementRef<HTMLElement>;
  private _color: string = 'green';
  private _errors?: ValidationErrors | null;
  private _show?: boolean;

  @Input()
  set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input()
  set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;

    const errorsKeys = Object.keys(value ?? {});

    if (this._show || !errorsKeys.includes('required')) {
      this.setErrorMessage();
    }
  }

  @Input()
  set show(value: boolean | undefined) {
    this._show = value;

    if (value) {
      this.setErrorMessage();
    }
  }


  constructor(
    private readonly el: ElementRef<HTMLElement>
  ) {
    this.elementRef = el;
  }


  private setStyle() {
    if (!this.elementRef) return;

    this.elementRef.nativeElement.style.color = this._color;
  }

  private setTextContent(txt: string) {
    if (!this.elementRef) return;

    this.elementRef.nativeElement.textContent = txt;
  }

  private setErrorMessage() {
    if (!this.elementRef) return;

    if (!this._errors) {
      this.setTextContent('');
      return;
    }

    const errorsKeys = Object.keys(this._errors);

    if (errorsKeys.includes('required')) {
      this.setTextContent('Este campo es requerido.');
      return;
    }

    if (errorsKeys.includes('minlength')) {
      const min = this._errors['minlength']['requiredLength'];
      const current = this._errors['minlength']['actualLength'];

      this.setTextContent(`Mínimo ${current}/${min} carácteres.`);
      return;
    }

    if (errorsKeys.includes('email')) {
      this.setTextContent('No tiene formato de correo.');
      return;
    }
  }

}
