import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginData, RegisterData } from '../interfaces/auth.interface';
import { CommonService } from './common.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  token: string | null = null;
  headers: HttpHeaders | null = null;
  options: {headers: HttpHeaders};
  
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.token = this.commonService.getLocalStorageItem('token');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.options = { headers: this.headers };
  }

  login(userFormData: LoginData) {
    return this.http.post(`${this.apiUrl}/login`, userFormData);
  }

  register(userFormData: RegisterData) {
    return this.http.post(`${this.apiUrl}/register`, userFormData);
  }

  registerImage(userFormData: FormData) {
    return this.http.post(`${this.apiUrl}/register-image`, userFormData);
  }

  setUserData(responseData: String) {
    localStorage.setItem('userData', JSON.stringify(responseData));
  }

  async changePassword(passwordData: any) {
    const user = await lastValueFrom(this.http.post(`${this.apiUrl}/change-password`, {password: passwordData.password}, this.options));
    if (!user) {
      throw new Error('Failed to change password');
    }

    return user;
  }
}