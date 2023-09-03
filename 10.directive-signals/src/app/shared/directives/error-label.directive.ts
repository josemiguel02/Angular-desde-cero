import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[errorLabel]',
})
export class ErrorLabelDirective implements OnChanges {

  @Input() color: string = 'green';
  @Input() errors: ValidationErrors | null | undefined;
  @Input() touched?: boolean;
  @Input() dirty?: boolean;

  constructor(
    private readonly el: ElementRef<HTMLElement>
  ) {}

  ngOnChanges(): void {
    this.setStyle();
    this.setErrorMessage();
  }

  private setStyle(): void {
    if (!this.el) return;

    this.el.nativeElement.style.color = this.color;
  }

  private setTextContent(txt: string): void {
    if (!this.el) return;

    this.el.nativeElement.textContent = txt;
  }

  private setErrorMessage(): void {
    if (!this.el) return;

    if (!this.errors) {
      this.setTextContent('');
      return;
    }

    const errorMessage = this.getErrorMessage();
    this.setTextContent(errorMessage);
  }

  private getErrorMessage(): string {
    if (!this.errors) return '';

    const errorsKeys = Object.keys(this.errors);

    if (errorsKeys.includes('required') && (this.touched || this.dirty)) {
      return 'Este campo es requerido.';
    }

    if (errorsKeys.includes('minlength')) {
      const min = this.errors['minlength']['requiredLength'];
      const current = this.errors['minlength']['actualLength'];

      return `Mínimo ${current}/${min} carácteres.`;
    }

    if (errorsKeys.includes('email')) {
      return 'No tiene formato de correo.';
    }

    return '';
  }
}
