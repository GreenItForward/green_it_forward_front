import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  authStatusChanged = new Subject<boolean>();

  constructor(private commonService: CommonService, private Router: Router) { }

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

  isAdmin(): boolean {
    return this.hasToken() && this.commonService.getLocalStorageItem('role') === 'admin';
  }
}
