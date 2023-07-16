import { UserService } from 'src/app/services/user.service';
import { UploadService } from 'src/app/services/upload.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { CommonService } from 'src/app/services/common.service';
import { StatsService } from 'src/app/services/stats.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(protected router: Router, private commonService: CommonService, private statsService: StatsService,
    private uploadService: UploadService, protected userService: UserService,
    private changeDetector: ChangeDetectorRef) { }

  projects:Project[];
  nbProjects: number;
  nbUsers: number;  
  slides: { name: string; background: string; title: string; price: string; }[] = [];
  private subscription: Subscription;

  async addSlides(projects: Project[]) {
    for (let project of projects) {
      const background = await this.loadImage(project.imageUrl);
      this.slides.push({
          name: project.name,
          background: background,
          title: project.name,
          price: `${project.amountRaised} / ${project.totalAmount} €`,
      });
  }
  }

  slideConfig = { slidesToShow: 4, slidesToScroll: 4 };

  slickInit(e: any) { }
  breakpoint(e: any) { }
  afterChange(e: any) { }
  beforeChange(e: any) { }  

  async loadImage(imageUrl: string) {
      let imageFile;
      try {
        imageFile = await this.uploadService.getImage(imageUrl);
      } catch (error) {
        imageFile = await this.uploadService.getImage('background.jpeg');
      }

      return URL.createObjectURL(imageFile);
  }


  async ngOnInit(): Promise<void> {
    this.subscription = this.userService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.initProjectsAndStats();
      }
      this.changeDetector.detectChanges();
    });

  }

  

  onDiscoverProjects() {
    this.userService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.router.navigate(['/projects']);
      }else {
      this.commonService.navigate('/auth');
      }
    });
  }

  async initProjectsAndStats() {
    this.slides = [];

    this.commonService.getProjectIci().then(projects => {
      this.projects = projects;
      this.addSlides(this.projects);
    }).catch(error => {
      console.error(error);
    });
  
    try {
      this.nbProjects = await this.statsService.getTotalProjects();
      this.nbUsers = await this.statsService.getTotalUsers();
    } catch (error) {
        console.error(error);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
} 