import { Injectable, computed, inject, signal } from '@angular/core';
import { environments } from '@/environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import {
  IUser,
  AuthStatus,
  ICheckTokenResponse,
  ILoginResponse,
  IRegisterPayload,
  IRegisterResponse,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly BASE_URL = environments.BASE_URL;
  private readonly http = inject(HttpClient);

  private _currentUser = signal<IUser | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.Checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());


  private setAuthentication({ user, accessToken }: ILoginResponse): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.Authenticated);
    sessionStorage.setItem('accessToken', accessToken);

    return true;
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.BASE_URL}/auth/login`;
    const credentials = { email, password };

    return this.http.post<ILoginResponse>(url, credentials)
      .pipe(
        map(this.setAuthentication.bind(this)),
      );
  }

  register(payload: IRegisterPayload): Observable<boolean> {
    const url = `${this.BASE_URL}/auth/register`;

    return this.http.post<IRegisterResponse>(url, payload)
      .pipe(
        map(this.setAuthentication.bind(this))
      );
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.BASE_URL}/auth/check-token`;
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
      this._authStatus.set(AuthStatus.NotAuthenticated);
      return of(false);
    };

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<ICheckTokenResponse>(url, { headers })
      .pipe(
        map(this.setAuthentication.bind(this)),
        catchError(() => {
          this._authStatus.set(AuthStatus.NotAuthenticated);

          return of(false);
        })
      );
  }

  logout() {
    if (this.authStatus() !== AuthStatus.Authenticated) return;

    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.NotAuthenticated);
    sessionStorage.clear();
  }

}
