import { Component, Input, OnInit, ViewChild, Output, EventEmitter  } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isPhone: boolean = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isOpened: boolean = false;
  @Output() toggleSidenavEvent = new EventEmitter<boolean>();

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
    
  }

  toggleSidenav() {    
    this.navbarService.toggleSidenav();
  }








}
