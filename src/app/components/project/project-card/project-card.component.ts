import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../../models/project.model";
import { CommonService } from 'src/app/services/common.service';
import { UploadService } from 'src/app/services/upload.service';
import * as moment from 'moment';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() project: Project;
  noImage:boolean = true
  imageFile:File
  imageSrc: string;
  today: Date = new Date();
  showDonateButton: boolean;

  constructor(protected commonService: CommonService, private uploadService:UploadService) {}

  async ngOnInit() {
    await this.loadImage();
    if (!this.project.imageUrl) {
      this.project.imageUrl = 'background.jpeg';
    }

    this.showDonateButton = moment(this.project.endDate).isAfter(this.today);
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

  goToProject(id: string) {
    this.commonService.navigate(`/project/${id}`);
  }

  payNow(project: Project) {
    this.commonService.navigate(`/payment/${project.id}`);
  }
}
