import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Router } from '@angular/router';
import {BehaviorSubject, lastValueFrom, Subject} from 'rxjs';
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  authStatusChanged = new Subject<boolean>();

  private apiUrl = `${environment.apiUrl}/user`;
  token: string | null = null;
  headers: HttpHeaders | null = null;
  options: {headers: HttpHeaders};

  constructor(private commonService: CommonService, private Router: Router, private http: HttpClient) {
    this.token = this.commonService.getLocalStorageItem('token');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.options = { headers: this.headers };
  }

  private hasToken(): boolean {
    const hasToken = !!this.commonService.getLocalStorageItem('token');
    return hasToken;
  }

  login() {
    this.isLoggedInSubject.next(true);
    this.authStatusChanged.next(this.isLoggedInSubject.value);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.isLoggedInSubject.next(false);
    this.authStatusChanged.next(this.isLoggedInSubject.value);
    this.Router.navigate(['/auth']);
  }

  async isAdmin(): Promise<boolean> {
    if (!this.hasToken()) {
      return false;
    }
    const role: string = await this.getRole();
    return role === 'ADMINISTRATEUR';
  }

  async getMe(): Promise<User> {
    console.log("getMe", this.options);
    return await lastValueFrom(this.http.get<User>(`${this.apiUrl}/me`, this.options));
  }

  async getRole(): Promise<string> {
    return await lastValueFrom(this.http.get<string>(`${environment.apiUrl}/role/user`, this.options));
  }
}
