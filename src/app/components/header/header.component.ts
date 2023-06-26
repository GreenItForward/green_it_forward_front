import { Router } from '@angular/router';
import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  link:string = "auth";
 
  constructor(private Router: Router) { }

  ngOnInit(): void {

    if(localStorage.getItem('token')) {
      document.getElementById('logout')?.classList.remove('invisible');
      this.link = "profile";
    }

    if(localStorage.getItem('token') && localStorage.getItem('role') === 'admin') {
      document.getElementById('admin')?.classList.remove('d-none');
    }

  }

  logout() {  
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.Router.navigate(['/auth']);
  }
}