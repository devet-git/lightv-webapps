import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  OnInit,
} from '@angular/core';
import { AuthService } from '@lib/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { GlobalStateManager } from '../../global.state';
import { Router } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { UserMenuService } from './user-menu.service';
import { ToastService } from '@lib/shared';

@Component({
  selector: 'app-user-menu',
  imports: [
    CommonModule,
    MenuModule,
    BadgeModule,
    RippleModule,
    AvatarModule,
    ButtonModule,
    StyleClassModule,
  ],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(
    private authService: AuthService,
    private globalState: GlobalStateManager,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private userMenuService: UserMenuService,
    private toastService: ToastService
  ) {
    effect(() => {
      this.updateMenuItem();
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.updateMenuItem();
  }

  get isShow() {
    return this.userMenuService.isShow();
  }

  private updateMenuItem() {
    this.items = [
      {
        label: 'Course',
        items: [
          {
            label: 'New',
            icon: 'pi pi-plus',
            disabled: !this.globalState.state().isSignedIn,
          },
          {
            label: 'Created',
            icon: 'pi pi-verified',
            badge: '99+',
            disabled: !this.globalState.state().isSignedIn,
          },
        ],
      },
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            disabled: !this.globalState.state().isSignedIn,
            command: () => {
              this.navigateToMyProfile();
            },
          },
          {
            label: 'Messages',
            icon: 'pi pi-inbox',
            // badge: '2',
            disabled: !this.globalState.state().isSignedIn,
          },
          { separator: true },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            visible: this.globalState.state().isSignedIn,
            command: () => this.onLogout(),
          },
          {
            label: 'Login',
            icon: 'pi pi-sign-in',
            visible: !this.globalState.state().isSignedIn,
            command: () => this.navigateToLogin(),
          },
        ],
      },
    ];
  }

  onLogout() {
    this.toastService.notice({
      detail: 'Are your sure?',
      key: 'confirm',
      sticky: true,
    });
    // this.authService.signout().subscribe((res) => {
    //   if (res.success) {
    //     this.globalState.update({ isSignedIn: false });
    //   }
    // });
  }

  navigateToLogin() {
    this.router.navigate(['/user/login']);
  }

  navigateToMyProfile() {
    this.router.navigate(['/user/me']);
  }

  toggleMenu() {
    this.userMenuService.toggle();
  }
}
