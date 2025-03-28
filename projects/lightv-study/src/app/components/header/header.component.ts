import { ApiService, AuthService } from '@lib/core';
import { Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GlobalStateManager } from '../../global.state';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private globalState: GlobalStateManager
  ) {}
  isSignedIn = computed(() => this.globalState.state().isSignedIn);

  onLogout() {
    this.authService.signout().subscribe((res) => {
      if (res.success) {
        this.globalState.update({ isSignedIn: false });
      }
    });
  }
}
