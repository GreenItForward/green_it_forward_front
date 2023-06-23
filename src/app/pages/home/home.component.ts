import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private commonService: CommonService) {}

  projects = this.commonService.getProjects();
  
  slides:{background:string, title:string, price:string}[] = [];

  addSlides(projects: any[]) {
    projects.forEach((project: any) => {
      this.slides.push({
        background: project.id % 2 === 0 ? 'backgroundImg1' : 'backgroundImg2',
        title: project.title,
        price: `${project.amountRaised} / ${project.totalAmount} €`,
      });
    });
  }

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
  ngOnInit(): void {
    this.addSlides(this.projects);
  }
}  