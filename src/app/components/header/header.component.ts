import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit  } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authSub: Subscription | undefined;
  link: string = "/auth";
  isLoggedIn: boolean = false;

  constructor(private Router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.authSub = this.userService.isLoggedIn$.subscribe(
      isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
        this.link = isAuthenticated ? "/profile" : "/auth";
      }
    );
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  logout(): void {
    this.userService.logout();
  }
}