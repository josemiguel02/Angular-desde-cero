import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly toastSrv = inject(ToastrService);

  showSuccess(message: string) {
    this.toastSrv.success(message, 'Éxito', {
      progressBar: true,
    });
  }

  showError(message: string) {
    this.toastSrv.error(message, 'Error', {
      progressBar: true,
    });
  }

  showInfo(message: string) {
    this.toastSrv.info(message, 'Info', {
      progressBar: true,
    });
  }
}
