import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private authSub: Subscription | undefined;

  constructor(public router: Router, public userService: UserService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.authSub = this.userService.authStatusChanged.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
        this.cdr.markForCheck();
      }
    );
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}
