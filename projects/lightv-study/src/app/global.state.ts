import { Injectable, signal } from '@angular/core';
import { AuthService, User } from '@lib/core';
import { firstValueFrom } from 'rxjs';

export interface GlobalState {
  theme: 'light' | 'dark';
  currentUser: User | null;
  isSignedIn: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GlobalStateManager {
  private defaultState: GlobalState = {
    theme: 'light',
    currentUser: null,
    isSignedIn: false,
  };
  private _state = signal<GlobalState>(this.defaultState);

  constructor(private authService: AuthService) {
    this.loadState();
  }

  private async loadState() {
    const res = await firstValueFrom(this.authService.getCurrentUser());
    if (res.success) {
      this.update({ currentUser: res.data, isSignedIn: true });
    }
  }

  state = this._state.asReadonly();

  update(props: Partial<GlobalState>) {
    this._state.update((prev) => ({
      ...prev,
      ...props,
    }));
  }

  reset() {
    this._state.set(this.defaultState);
  }
}
