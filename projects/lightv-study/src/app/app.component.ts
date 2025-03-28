import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToastComponent } from '@lib/shared';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { StyleClassModule } from 'primeng/styleclass';
import { UserMenuService } from './components/user-menu/user-menu.service';

@Component({
  selector: 'app-root',
  imports: [
    StyleClassModule,
    RouterOutlet,
    ButtonModule,
    HeaderComponent,
    FooterComponent,
    ToastComponent,
    UserMenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(private userMenuService: UserMenuService) {}

  get isShowUserMenu() {
    return this.userMenuService.isShow();
  }
}
