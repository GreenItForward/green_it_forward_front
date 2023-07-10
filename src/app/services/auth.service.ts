import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginData, RegisterData } from '../interfaces/auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(userFormData: LoginData) {
    return this.http.post(`${this.apiUrl}/login`, userFormData);
  }

  register(userFormData: FormData) {
    return this.http.post(`${this.apiUrl}/register`, userFormData);
  }

  setUserData(responseData: String) {
    localStorage.setItem('userData', JSON.stringify(responseData));
  }
}