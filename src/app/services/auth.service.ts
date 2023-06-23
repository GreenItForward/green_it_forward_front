import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { create } from 'domain';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, {
      email,
      password
    });
  }

  register(user: User) {
    return this.http.post(`${this.apiUrl}/register`, {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }

  setUserData(responseData: String) {
    localStorage.setItem('userData', JSON.stringify(responseData));
  }
}