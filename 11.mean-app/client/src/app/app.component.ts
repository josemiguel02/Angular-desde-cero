import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  private readonly authSrv = inject(AuthService);
  private readonly router = inject(Router);

  public finishedAuthCheck = computed<boolean>(() => {
    return this.authSrv.authStatus() !== AuthStatus.Checking;
  });

  public authStatusEffect = effect(() => {
    switch (this.authSrv.authStatus()) {
      case AuthStatus.Checking:
        return;

      case AuthStatus.Authenticated:
        this.router.navigateByUrl('/dashboard');
        return;

      case AuthStatus.NotAuthenticated:
        this.router.navigateByUrl('/auth');
        return;
    }
  });

  ngOnInit(): void {
    this.authSrv.checkAuthStatus().subscribe();
  }

}
