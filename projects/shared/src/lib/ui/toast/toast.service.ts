import { Injectable } from '@angular/core';
import { MessageService, ToastMessageOptions } from 'primeng/api';

export interface ToastOptions
  extends Omit<ToastMessageOptions, 'severity' | 'summary'> {}
/**
 * import { MessageService } from 'primeng/api';
 * To use this service in app, let add MessageService to provider in app.config.ts file
 *
 * @export
 * @class ToastService
 * @typedef {ToastService}
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  success(toastOptions?: ToastOptions) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      life: 1000,
      ...toastOptions,
    });
  }

  error(toastOptions?: ToastOptions) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      life: 1000,
      ...toastOptions,
    });
  }

  notice(toastOptions?: ToastOptions) {
    this.messageService.add({
      severity: 'info',
      summary: 'Notice',
      life: 1000,
      ...toastOptions,
    });
  }

  warn(toastOptions?: ToastOptions) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      life: 1000,
      ...toastOptions,
    });
  }
}
