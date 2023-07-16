import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginData, RegisterData } from '../interfaces/auth.interface';
import { CommonService } from './common.service';
import { User } from '../models/user.model';

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

  setUserData(responseData: string) {
    localStorage.setItem('userData', JSON.stringify(responseData));
  }

  async changePassword(passwordData: any, token: string = '') {
    let user;
    let tempOptions = this.options;
    if (token) {
      const tempHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const tempOptions = { headers: this.headers };
    }

    try {
      user = await lastValueFrom(this.http.post(`${this.apiUrl}/change-password`, {password: passwordData.password}, token ? tempOptions : this.options));
    } catch (error) {
      throw new Error('Une erreur est survenue lors du changement de mot de passe');
    }

    return user;
  }

  async forgotPassword(email: string) {
    let response;
    try {
      response = await lastValueFrom(this.http.post(`${this.apiUrl}/forgot-password`, {email}));
    } catch (error) {
      throw new Error('Une erreur est survenue lors de la réinitialisation du mot de passe');
    }
 
    return response;
  }

  async getLoginToken(user: User): Promise<string> {
      let response: LoginResponse;
      try {
        response = await lastValueFrom(this.http.post<LoginResponse>(`${this.apiUrl}/login-token`, {user}));
      } catch (error) {
        throw new Error('Une erreur est survenue lors de la réinitialisation du mot de passe');
      }

      if(response && response.token) {
          return response.token;
      } else {
          throw new Error('Token not found in response');
      }
  }

}

interface LoginResponse {
  token: string;
}
