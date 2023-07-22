import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, UrlTree, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanMatch, CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  private isAuthenticated(): boolean | Observable<boolean> {
    return this.authService.checkAuthStatus()
      .pipe(
        tap(isAuth => {
          if (isAuth) {
            this.router.navigate(['heroes']);
          }
        }),
        map(isAuth => !isAuth)
      )
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.isAuthenticated();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.isAuthenticated();
  }
}
