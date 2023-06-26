import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  ourMailContact = environment.ourMailContact;
  ourPhoneContact = environment.ourPhoneContact;

  @ViewChild('email') email: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
