import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slides = [
    { background: 'backgroundImg1', title: 'Slide 1', price: '1000 / 25000 €' },
    { background: 'backgroundImg2', title: 'Slide 2', price: '130 / 1000 €' },
    { background: 'backgroundImg1', title: 'Slide 1', price: '1000 / 1200 €' },
    { background: 'backgroundImg2', title: 'Slide 2', price: '280 / 300 €' },
    { background: 'backgroundImg1', title: 'Slide 1', price: '167 / 200 €' },
    { background: 'backgroundImg2', title: 'Slide 2', price: '1800 / 2000 €' },
  ];
  slideConfig = { slidesToShow: 4, slidesToScroll: 4 };

  nbProjects = 1292;
  nbUsers = 3594;

  slickInit(e: any) {
  }
  breakpoint(e: any) {
  }
  afterChange(e: any) {
  }
  beforeChange(e: any) {
  }
  constructor(private router: Router) {}
  ngOnInit(): void {}
}  