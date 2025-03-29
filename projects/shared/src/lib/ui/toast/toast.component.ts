import { ToastService } from '@lib/shared';
import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'lib-shared-toast',
  imports: [ToastModule, ButtonModule, AvatarModule],
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  constructor(private toastService: ToastService) {}

  get confirmButton() {
    return this.toastService.confirmBtn();
  }

  onConfirm() {
    this.toastService.triggerConfirm();
  }

  onCloseConfirm() {
    this.toastService.triggerCloseConfirm();
  }
}
