import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiResponse } from '@lib/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

export interface UpdateUserOwnInfo {
  email: 'string';
  currentPassword: 'string';
  newPassword: 'string';
}

export interface Login {
  username: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private apiService: ApiService, private router: Router) {}
  signin(data: Login) {
    return this.apiService.post<ApiResponse<User>>('auth/signin', data);
  }

  signout() {
    this.router.navigate(['/user/login']);
    return this.apiService.post<ApiResponse>('auth/signout', {});
  }

  getCurrentUser() {
    return this.apiService.get<ApiResponse<User>>('auth/current-user');
  }

  updateUserOwnInfo(data: UpdateUserOwnInfo) {
    return this.apiService.put<ApiResponse>('auth/current-user', data);
  }
}
