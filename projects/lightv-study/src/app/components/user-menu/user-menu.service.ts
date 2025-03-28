import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserMenuService {
  isShow = signal(true);

  toggle() {
    this.isShow.update((prev) => !prev);
  }
}
