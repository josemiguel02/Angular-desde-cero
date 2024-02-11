import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const AuthGuard: CanActivateFn = (route, state) => {
  return new Promise<boolean>(resolve => {
    const authSrv = inject(AuthService);
    const router = inject(Router);

    if (authSrv.authStatus() === AuthStatus.Authenticated) {
      return resolve(true);
    }

    router.navigateByUrl('/auth');
    return resolve(false);
  });
};
