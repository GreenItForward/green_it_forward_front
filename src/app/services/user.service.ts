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
  
  constructor(private commonService: CommonService, private Router: Router) { }

  private hasToken(): boolean {
    return !!this.commonService.getLocalStorageItem('token');
  }

  login() {
    this.isLoggedInSubject.next(true);
  }

  logout() {  
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.Router.navigate(['/auth']);
  }

  isAdmin(): boolean {
    return this.hasToken() && this.commonService.getLocalStorageItem('role') === 'admin';
  }
}
