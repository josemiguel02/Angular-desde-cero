import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'environments/environments';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = environments.BASE_URL;
  private user?: User;

  constructor(private http: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;

    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users/1`)
      .pipe(
        tap(user => (this.user = user)),
        tap(user => localStorage.setItem('token', crypto.randomUUID()))
      );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthStatus(): Observable<boolean> | boolean {
    if (!localStorage.getItem('token')) {
      return false;
    }

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.BASE_URL}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => Boolean(user)),
        catchError(() => of(false)),
      );
  }
}
