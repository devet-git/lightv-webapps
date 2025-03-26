import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'lib-shared-toast',
  imports: [ToastModule],
  template: '<p-toast position="bottom-right" />',
})
export class ToastComponent {}
