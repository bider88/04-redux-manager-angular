import { Injectable } from '@angular/core';
import iziToast from 'izitoast';
import { ToastInterface } from 'src/app/models/utils/toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  showInfo(toast: ToastInterface) {
    console.log(toast);
    iziToast.info({
      position: 'bottomRight',
      timeout: 5000,
      ...toast,
    });
  }

  showWarning(toast: ToastInterface) {
    iziToast.warning({
      position: 'bottomRight',
      timeout: 5000,
      ...toast,
    });
  }

  showSuccess(toast: ToastInterface) {
    iziToast.success({
      position: 'bottomRight',
      timeout: 5000,
      ...toast,
    });
  }

  showError(toast: ToastInterface) {
    iziToast.error({
      position: 'bottomRight',
      timeout: 5000,
      ...toast,
    });
  }
}
