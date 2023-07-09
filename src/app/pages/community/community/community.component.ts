import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {CommonService} from "../../../services/common.service";
import {Community} from "../../../interfaces/community.entity";
import {Project} from "../../../models/project.model";
import {User} from "../../../interfaces/user.entity";
import {Post} from "../../../interfaces/post.entity";
import {PostService} from "../../../services/post.service";
import {UploadService} from "../../../services/upload.service";
import {CommunityService} from "../../../services/community.service";
import { PostCreateModalComponent } from '../../../components/post-create-modal/post-create-modal.component';
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent {

  community: Community
  noFollowers: boolean
  noPosts: boolean
  posts: Post[]
  noImage:boolean = true
  imageFile:File
  imageSrc: string;
  communityNotFollowed:boolean = true

  constructor(private userService:UserService, public dialog: MatDialog, private activatedRoute: ActivatedRoute, protected commonService: CommonService,private communityService:CommunityService, private postService:PostService, private uploadService:UploadService) {}

  openModal(): void {
    const dialogRef = this.dialog.open(PostCreateModalComponent, {
      width: '70%',
      data: { community:this.community }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Logique à exécuter après la fermeture de la modale
      // result contient les données renvoyées par la modale si nécessaire
    });
  }

  async ngOnInit(): Promise<void> {
    const data = this.activatedRoute.snapshot.data as RouteData;
    this.community = data.community;
    this.noFollowers = this.community.followers.length === 0;

    this.postService.getPostsByCommunity(this.community.id).then(posts => {
      this.posts = posts;
      this.noPosts = this.posts.length === 0;
    });

    await this.loadImage();

    if (!this.community.imgUrl) {
      this.community.imgUrl = 'background.jpeg';
    }

    const me = await this.userService.getMe()
    const isUserAlreadyFollowed = this.community.followers.some((follower) => follower.email === me.email);
    this.communityNotFollowed = !isUserAlreadyFollowed;
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

  followCommunity(){
    this.communityService.followCommunity(this.community.id).then(r => {
      console.log(r)
      location.reload();
    })
  }

  unFollowCommunity(){
    this.communityService.unFollowCommunity(this.community.id).then(r => {
      console.log(r)
      location.reload();
    })
  }

}


interface RouteData {
  community: Community;
}
