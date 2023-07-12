import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { DateService } from 'src/app/services/date.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  project:Project;
  creationDate:string;
  endDate:string;
  imageFile: File;
  imageSrc: string;
  noImage: boolean = true;


  constructor(private activatedRoute: ActivatedRoute, private location: Location, protected commonService: CommonService, 
    protected dateService: DateService, private uploadService: UploadService) {}

  async ngOnInit(): Promise<void> {
    const data = this.activatedRoute.snapshot.data as RouteData;
    this.project = data.project;
    await this.loadImage();
    if (!this.project.imageUrl) {
      this.project.imageUrl = 'assets/background.jpeg';
    }

    this.creationDate = this.dateService.formatRelativeTime(this.project.startDate, "Débuté depuis");
    this.endDate = this.dateService.formatRelativeTime(this.project.endDate, "Se termine dans");
 

  }


  onBack(): void {
    this.location.back();
  }

  payNow(project: Project) {
    this.commonService.navigate(`/payment/${project.id}`);
  }


  async loadImage() {
    if (this.project.imageUrl !== '') {
      try {
        this.imageFile = await this.uploadService.getImage(this.project.imageUrl);
        this.imageSrc = URL.createObjectURL(this.imageFile);
        this.noImage = false
      } catch (error) {
        console.error('Failed to load image:', error);
      }
    }
  }
}

interface RouteData {
  project: Project;
}
