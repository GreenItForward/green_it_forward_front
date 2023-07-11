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
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  authStatusChanged = new Subject<boolean>();

  private apiUrl = `${environment.apiUrl}/user`;
  token: string | null = null;
  headers: HttpHeaders | null = null;
  options: {headers: HttpHeaders};

  constructor(private commonService: CommonService, private Router: Router, private http: HttpClient) {
    this.token = this.commonService.getLocalStorageItem('token');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.options = { headers: this.headers };
    this.isAdmin()
      .then(isAdmin => this.isAdminSubject.next(isAdmin))
      .catch(error => console.error('Erreur lors de la vérification du statut administrateur:', error));
  }

  private hasToken(): boolean {
    return !!this.commonService.getLocalStorageItem('token');
  }

  login() {
    this.isLoggedInSubject.next(true);
    this.authStatusChanged.next(this.isLoggedInSubject.value);
    this.token = this.commonService.getLocalStorageItem('token');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.options = { headers: this.headers };
    this.isAdmin()
      .then(isAdmin => this.isAdminSubject.next(isAdmin))
      .catch(error => console.error('Erreur lors de la vérification du statut administrateur:', error));
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.authStatusChanged.next(this.isLoggedInSubject.value);
    this.isAdminSubject.next(false);
    this.headers = new HttpHeaders().set('Authorization', ``);
    this.options = { headers: this.headers };
    this.Router.navigate(['/auth']);
  }

  async isAdmin(): Promise<boolean> {
    if(!this.hasToken()) {
      return false;
    }
    const response: any = await this.getRole();
    return response.role === 'ADMINISTRATEUR';
  }

  async getMe(): Promise<User> {
    return await lastValueFrom(this.http.get<User>(`${this.apiUrl}/me`, this.options));
  }

  async getRole(): Promise<any> {
    return await lastValueFrom(this.http.get(`${environment.apiUrl}/role/user`, this.options));
  }

  async getEveryRoles(): Promise<Array<string>> {
    return await lastValueFrom(this.http.get<Array<string>>(`${environment.apiUrl}/role/all`, this.options));
  }

  async updateUser(user: User): Promise<User> {
    const response = await this.http.put<User>(`${this.apiUrl}/edit`, user, this.options).toPromise();
  
    if (!response) {
      throw new Error('Server response was undefined');
    }
  
    return response;
  }


  async updateImage(image: File): Promise<User> {
    const formData = new FormData();
    formData.append('image', image);
    return await lastValueFrom(this.http.put<User>(`${this.apiUrl}/edit-image`, formData, this.options));
  }

}
 