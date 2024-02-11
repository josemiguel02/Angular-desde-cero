import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '@/app/shared/services/toast.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [],
})
export class RegisterPageComponent {

  private readonly fb = inject(FormBuilder);
  private readonly authSrv = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastSrv = inject(ToastService);

  public myForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  register() {
    if (this.myForm.invalid) {
      this.myForm.markAsTouched();
      return;
    }

    const { name, email, password } = this.myForm.value;
    if (!name || !email || !password) return;

    const payload = { name, email, password };

    this.authSrv.register(payload)
      .pipe(
        catchError(({ error }) => {
          this.toastSrv.showError(error?.message);
          return of(false);
        })
      )
      .subscribe(success => {
        if (!success) return;

        this.router.navigateByUrl('/dashboard');
      })
  }

}
