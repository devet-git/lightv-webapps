import { ApiResponse, ApiService } from '@lib/core';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { IftaLabelModule } from 'primeng/iftalabel';
import { matchValuesValidator, ToastService } from '@lib/shared';

@Component({
  selector: 'app-profile-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PasswordModule,
    InputTextModule,
    FloatLabelModule,
    IftaLabelModule,
    ButtonModule,
    RippleModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  profileForm: FormGroup;
  value!: string;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.profileForm = this.fb.group({
      username: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.email]),
      currentPassword: new FormControl('', []),
      newPassword: new FormControl('', [
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/
        ),
        // At least one uppercase, one lowercase, one number, one special character
      ]),
      confirmNewPassword: new FormControl('', [
        matchValuesValidator('newPassword'),
      ]),
    });
  }

  ngOnInit(): void {
    this.apiService.get<ApiResponse>('auth/current-user').subscribe((res) => {
      if (res.success) {
        const { username, email } = res.data;
        this.profileForm.patchValue({ username, email });
      }
    });
  }

  onSubmit() {
    const { email, currentPassword, newPassword } = this.profileForm.value;
    this.apiService
      .put<ApiResponse>('auth/current-user', {
        email,
        currentPassword,
        newPassword,
      })
      .subscribe((res) => {
        if (res.success) {
          this.toastService.success({});
          // this.messageService.add({
          //   severity: 'success',
          //   summary: 'Success',
          //   detail: 'Update profile successfully',
          //   life: 1000,
          // });
        }
        console.log(res);
      });
  }
}
