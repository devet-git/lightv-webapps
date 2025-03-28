import { computed, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { GlobalStateManager } from '../global.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private globalState: GlobalStateManager,
    private router: Router
  ) {}
  private isSignedIn = computed(() => this.globalState.state().isSignedIn);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    this.globalState.state;
    return this.globalState.state().isSignedIn
      ? true
      : this.router.createUrlTree(['/']);
  }
}
