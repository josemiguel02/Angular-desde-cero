import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { UsersService } from '@/signals/services/users.service';
import { User } from '@/signals/interfaces/user.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styles: [],
})
export class UserInfoPageComponent implements OnInit {

  private readonly usersSrv = inject(UsersService);

  public userId = signal(1);
  public currentUser = signal<User | undefined>(undefined);
  public userWasFound = signal(true);

  public fullName = computed<string>(() => {
    if (!this.currentUser()) return 'Usuario no encontrado';
    return `${this.currentUser()!.first_name} ${this.currentUser()!.last_name}`;
  });

  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  loadUser(id: number) {
    if (id <= 0) return;

    this.userId.set(id);
    this.currentUser.set(undefined);

    this.usersSrv.getUserById(id)
      .pipe(
        catchError(() => {
          this.userWasFound.set(false);
          return of(undefined);
        })
      )
      .subscribe(user => {
        if (!user) return;

        this.currentUser.set(user);
        this.userWasFound.set(true);
      });
  }
}
