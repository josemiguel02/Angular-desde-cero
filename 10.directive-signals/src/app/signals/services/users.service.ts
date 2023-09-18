import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User, UserResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private readonly http = inject(HttpClient);
  private readonly BASE_URL: string = 'https://reqres.in/api/users';

  getUserById(id: number): Observable<User> {
    return this.http.get<UserResponse>(`${this.BASE_URL}/${id}`)
      .pipe(
        map(res => res.data)
      );
  }

}
