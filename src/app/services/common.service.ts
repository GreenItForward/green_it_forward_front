import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private Router: Router) { }

  public getLocalStorageItem(key: string) {
    return localStorage.getItem(key);
  }

  navigate(page: string) {
    if (page.charAt(0) === '/' && page.length > 1) {
      page = page.substring(1);
    }

    this.Router.navigate([page]);
  }
}
