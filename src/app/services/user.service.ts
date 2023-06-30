import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
  constructor(private commonService: CommonService, private Router: Router) {
    this.emitLoginStatus();
  }
  private hasToken(): boolean {
    return !!this.commonService.getLocalStorageItem('token');
  }
  private emitLoginStatus(): void {
    this.isLoggedInSubject.next(this.hasToken());
  }

  login() {
    this.emitLoginStatus();
  }

  logout() {  
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.Router.navigate(['/auth']);
    this.emitLoginStatus();
  }

  isAdmin(): boolean {
    return this.hasToken() && this.commonService.getLocalStorageItem('role') === 'admin';
  }
}
