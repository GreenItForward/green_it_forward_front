import { Router } from '@angular/router';
import { Component, OnInit  } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  link:string = "/auth";
 
  constructor(private Router: Router, public userService: UserService) { }

  ngOnInit(): void {

    if(localStorage.getItem('token')) {
      document.getElementById('logout')?.classList.remove('invisible');
      this.link = "/profile";
    }


  }


}