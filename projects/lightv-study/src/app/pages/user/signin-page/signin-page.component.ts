import { Component, OnInit } from '@angular/core';
import { ApiResponse, ApiService, AuthService } from '@lib/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '@lib/shared';
import { GlobalStateManager } from '../../../global.state';

@Component({
  selector: 'app-signin-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss',
})
export class SigninPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastServer: ToastService,
    private globalState: GlobalStateManager
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}

  onSigninFormSubmit(event: Event) {
    event.preventDefault();

    const { username, password } = this.loginForm.value;
    this.authService.signin({ username, password }).subscribe((res) => {
      if (res.success) {
        this.toastServer.success();
        this.globalState.update({ isSignedIn: true });
      }
    });
  }

  onSiginWithGoogle() {
    document.location.href = 'http://localhost:3000/auth/signin/google';
  }
}
