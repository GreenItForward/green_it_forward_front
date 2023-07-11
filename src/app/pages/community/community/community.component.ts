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
import {DateService} from "../../../services/date.service";

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
  followers: User[]
  noImage:boolean = true
  imageFile:File
  imageSrc: string;
  communityNotFollowed:boolean = true
  creationDate:string
  basePosts: Post[] = []
  baseFollowers: User[] = []
  searchText:string = ""
  searchUser:string = ""

  constructor(private dateService:DateService, private userService:UserService, public dialog: MatDialog, private activatedRoute: ActivatedRoute, protected commonService: CommonService,private communityService:CommunityService, private postService:PostService, private uploadService:UploadService) {}

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
    this.followers = this.community.followers
    this.baseFollowers = this.community.followers

    this.postService.getPostsByCommunity(this.community.id).then(posts => {
      this.posts = posts;
      console.log(posts)
      this.noPosts = this.posts.length === 0;
    });

    await this.loadImage();

    if (!this.community.imgUrl) {
      this.community.imgUrl = 'background.jpeg';
    }

    const me = await this.userService.getMe()
    const isUserAlreadyFollowed = this.community.followers.some((follower) => follower.email === me.email);
    this.communityNotFollowed = !isUserAlreadyFollowed;

    this.creationDate = this.dateService.formatRelativeTime(this.community.creationDate)
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

  async searchPosts() {
    if(this.searchText.trim() !== ""){
      this.posts = await this.postService.searchPosts(this.searchText,parseInt(this.community.id))
      console.log(this.posts)
    }
    else{
      this.posts = this.basePosts
    }
  }

  searchFollowers() {
    if (this.searchUser.trim() !== "") {
      this.followers = this.baseFollowers.filter(follower =>
        (follower.firstName && follower.firstName.toLowerCase().includes(this.searchUser.toLowerCase())) ||
        (follower.lastName && follower.lastName.toLowerCase().includes(this.searchUser.toLowerCase())) ||
        (follower.email && follower.email.toLowerCase().includes(this.searchUser.toLowerCase()))
      );
    } else {
      this.followers = [...this.baseFollowers];
    }
  }

}


interface RouteData {
  community: Community;
}
