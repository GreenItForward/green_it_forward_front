import {Component, Input} from '@angular/core';
import {CommonService} from "../../services/common.service";
import { User } from 'src/app/models/user.model';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.scss']
})
export class UserDisplayComponent {
  @Input() follower: User;
  @Input() creator: User;
  noImage:boolean = true
  imageFile:File
  imageSrc: string;

  constructor(protected commonService: CommonService, private uploadService:UploadService) {}

  ngOnInit() {
    if(this.follower.imageUrl === undefined || this.follower.imageUrl === "") this.follower.imageUrl = "profil.png"
    this.loadImage();
  }


  goToCommunity(communityId: string) {
    //this.commonService.navigate(`/community/${communityId}`);
  }

  async loadImage() {
    if (this.follower.imageUrl !== '') {
      try {
        this.imageFile = await this.uploadService.getImage(this.follower.imageUrl as string);
        this.imageSrc = URL.createObjectURL(this.imageFile);
        this.noImage = false
      } catch (error) {
        console.error('Failed to load image:', error);
      }
    }
  }
}
