import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const PublicGuard: CanActivateFn = (route, state) => {
  return new Promise<boolean>((resolve) => {
    const authSrv = inject(AuthService);
    const router = inject(Router);

    if (authSrv.authStatus() !== AuthStatus.Authenticated) {
      return resolve(true);
    }

    router.navigateByUrl('/dashboard');
    return resolve(false);
  });
};
