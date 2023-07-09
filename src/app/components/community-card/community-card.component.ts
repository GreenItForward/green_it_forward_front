import {Component, Input, OnInit} from '@angular/core';
import {Community} from "../../interfaces/community.entity";
import {CommonService} from "../../services/common.service";
import {UploadService} from "../../services/upload.service";

@Component({
  selector: 'app-community-card',
  templateUrl: './community-card.component.html',
  styleUrls: ['./community-card.component.scss']
})
export class CommunityCardComponent {
  @Input() community: Community;
  noImage:boolean = true
  imageFile:File
  imageSrc: string;

  constructor(protected commonService: CommonService, private uploadService:UploadService) {}

  async ngOnInit() {
    await this.loadImage();

    if (!this.community.imgUrl) {
      this.community.imgUrl = 'background.jpeg';
    }
  }

  async loadImage() {
    if (this.community.imgUrl !== '') {
      try {
        this.imageFile = await this.uploadService.getImage(this.community.imgUrl);
        this.imageSrc = URL.createObjectURL(this.imageFile);
        this.noImage = false
      } catch (error) {
        console.error('Failed to load image:', error);
      }
    }
  }

  goToCommunity(communityId: string) {
    this.commonService.navigate(`/community/${communityId}`);
  }
}
