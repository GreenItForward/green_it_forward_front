import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private commonService: CommonService) {}

  projects:Project[];
  
  slides: { name: string; background: string; title: string; price: string; }[] = [];

  addSlides(projects: Project[]) {
    projects.forEach((project: Project) => {
      this.slides.push({
        name: project.name,
        background: Math.random() > 0.5 ? 'backgroundImg1' : 'backgroundImg2',
        title: project.name,
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
    this.commonService.getProjectIci().then(projects => {
      this.projects = projects;
      this.addSlides(this.projects);
    }).catch(error => {
      // Gérez l'erreur ici
    });
  }
}  