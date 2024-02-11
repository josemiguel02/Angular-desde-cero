import { Component, inject } from '@angular/core';
import { AuthService } from '@/app/auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styles: [],
})
export class DashboardLayoutComponent {

  private readonly authSrv = inject(AuthService);

  get user() {
    return this.authSrv.currentUser();
  }

  onLogout() {
    this.authSrv.logout();
  }

}
