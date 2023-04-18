import { NavbarService } from './navbar.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() isPhone: boolean = false;
  @Input() isOpened: boolean = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @Output() sidenavToggled = new EventEmitter<boolean>();

  private subscription: Subscription = new Subscription();


  constructor(private navbarService : NavbarService) { }

  ngOnInit(): void {
    this.subscription = this.navbarService.sidenavState$.subscribe(isOpened => {
      this.isOpened = isOpened;            
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
