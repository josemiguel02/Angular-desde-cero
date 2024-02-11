import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '@/app/shared/services/toast.service';

@Component({
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent {

  private readonly fb = inject(FormBuilder);
  private readonly authSrv = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastSrv = inject(ToastService);

  public myForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    if (this.myForm.invalid) {
      this.myForm.markAsTouched();
      return;
    }

    const { email, password } = this.myForm.value;
    if (!email || !password) return;

    this.authSrv
      .login(email, password)
      .pipe(
        catchError(({ error }) => {
          this.toastSrv.showError(error?.message);
          return of(false);
        })
      )
      .subscribe(success => {
        if (!success) return;

        this.router.navigateByUrl('/dashboard');
      });
  }

}
