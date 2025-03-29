import { EventEmitter, Injectable, signal } from '@angular/core';
import { MessageService, ToastMessageOptions } from 'primeng/api';

export interface ToastOptions
  extends Omit<ToastMessageOptions, 'severity' | 'key'> {
  key?: 'message' | 'confirm';
  confirmButton?: ConfirmButton;
}

type ConfirmCallBackType = () => void;
type ConfirmButton = {
  label?: string;
  severity?: PrimengButtonSeverityType;
};
type PrimengButtonSeverityType = 'info' | 'success' | 'warn' | 'danger';
type PrimengToastSeverityType = 'success' | 'error' | 'info' | 'warn';

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
  private confirmListener = new EventEmitter<void>();
  private closeListener = new EventEmitter<void>();
  private hasConfirmation: boolean = false;
  private confirmCallBack: ConfirmCallBackType = () => {};
  private _confirmBtn = signal<ConfirmButton>({
    label: 'Confirm',
    severity: 'success',
  });
  confirmBtn = this._confirmBtn.asReadonly();

  constructor(private messageService: MessageService) {
    this.confirmListener.subscribe(() => {
      this.confirmCallBack();
      this.messageService.clear('confirm');
      this.hasConfirmation = false;
    });
    this.closeListener.subscribe(() => {
      this.hasConfirmation = false;
    });
  }

  private addToast(
    severity: PrimengToastSeverityType,
    toastOptions?: ToastOptions,
    onConfirm?: ConfirmCallBackType
  ) {
    //? allow only one confirm message at the same time
    if (toastOptions?.key == 'confirm' && this.hasConfirmation) return;

    const defaultSummaryMapper = {
      success: 'Success',
      error: 'Error',
      info: 'Notice',
      warn: 'Warning',
    };
    const defaultDetailMapper = {
      success: 'Your action was successful',
      error: 'An error occurred while processing your request',
      info: 'Here is some information for you',
      warn: 'Please be cautious about this warning',
    };
    const buttonSeverityFollowToastSeverity: Record<
      PrimengToastSeverityType,
      PrimengButtonSeverityType
    > = {
      success: 'success',
      error: 'danger',
      info: 'info',
      warn: 'warn',
    };

    this.messageService.add({
      severity,
      summary: defaultSummaryMapper[severity],
      detail: defaultDetailMapper[severity],
      life: 2000,
      key: 'message',
      ...toastOptions,
      sticky: toastOptions?.key === 'confirm',
    });

    if (toastOptions?.key == 'confirm') {
      this.hasConfirmation = true; //?mark as has confirm message
      //? update state
      this._confirmBtn.update((prev) => ({
        ...prev,
        severity: buttonSeverityFollowToastSeverity[severity],
        ...toastOptions?.confirmButton,
      }));
      //? handel callback
      if (onConfirm) {
        this.confirmCallBack = onConfirm;
      }
    }
  }

  success(toastOptions?: ToastOptions, onConfirm?: ConfirmCallBackType) {
    this.addToast('success', toastOptions, onConfirm);
  }
  error(toastOptions?: ToastOptions, onConfirm?: ConfirmCallBackType) {
    this.addToast('error', toastOptions, onConfirm);
  }

  info(toastOptions?: ToastOptions, onConfirm?: ConfirmCallBackType) {
    this.addToast('info', toastOptions, onConfirm);
  }

  warn(toastOptions?: ToastOptions, onConfirm?: ConfirmCallBackType) {
    this.addToast('warn', toastOptions, onConfirm);
  }

  // Events tsrigger for component
  triggerConfirm() {
    this.confirmListener.emit();
  }

  triggerCloseConfirm() {
    this.closeListener.emit();
  }
}
