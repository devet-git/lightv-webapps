import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserMenuService {
  private _isShow = signal(true);
  isShow = this._isShow.asReadonly();

  toggle() {
    this._isShow.update((prev) => !prev);
  }
}
