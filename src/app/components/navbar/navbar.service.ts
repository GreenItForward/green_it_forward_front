import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private _sidenavState = new BehaviorSubject<boolean>(false);
  sidenavState$ = this._sidenavState.asObservable();

  constructor() {}

  toggleSidenav() {    
    this._sidenavState.next(!this._sidenavState.value);
  }
}
