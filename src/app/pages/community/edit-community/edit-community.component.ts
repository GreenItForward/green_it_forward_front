import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "../../../services/common.service";
import {Community} from "../../../interfaces/community.entity";
import { User } from 'src/app/models/user.model';
import {Post} from "../../../interfaces/post.entity";
import {PostService} from "../../../services/post.service";
import {UploadService} from "../../../services/upload.service";
import {CommunityService} from "../../../services/community.service";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";
import {DateService} from "../../../services/date.service";
import {NewCommunity} from "../../../interfaces/new-community.entity";
import {SelectionModalComponent} from "../../../components/selection-modal/selection-modal.component";

@Component({
  selector: 'app-community',
  templateUrl: './edit-community.component.html',
  styleUrls: ['./edit-community.component.scss']
})
export class EditCommunityComponent {

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

  newCommunity:NewCommunity = {name:"",description:"",imgUrl:"",followers:[]}
  file: File | null;
  formIsValid:boolean = false
  isLoading:boolean = false
  communities:Community[] = []
  errorMessages:string[] = []
  isCreator:boolean = false

  constructor(private dateService:DateService, private userService:UserService, public dialog: MatDialog, private activatedRoute: ActivatedRoute, protected commonService: CommonService,private communityService:CommunityService, private postService:PostService, private uploadService:UploadService) {}

  async ngOnInit(): Promise<void> {
    const data = this.activatedRoute.snapshot.data as RouteData;
    this.community = data.community;
    this.newCommunity = data.community;
    this.noFollowers = this.community.followers.length === 0;
    this.followers = this.community.followers
    this.baseFollowers = this.community.followers

    this.postService.getPostsByCommunity(this.community.id).then(posts => {
      this.posts = posts;
      this.basePosts = posts
      this.noPosts = this.posts.length === 0;
    });

    await this.loadImage();

    if (!this.community.imgUrl) {
      this.community.imgUrl = 'background.jpeg';
    }

    const me = await this.userService.getMe()
    const isUserAlreadyFollowed = this.community.followers.some((follower) => follower.email === me.email);
    this.communityNotFollowed = !isUserAlreadyFollowed;

    if(me.email === this.community.user.email) this.isCreator = true

    this.creationDate = this.dateService.formatRelativeTime(this.community.creationDate, "");
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
      location.reload();
    })
  }

  unFollowCommunity(){
    this.communityService.unFollowCommunity(this.community.id).then(r => {
      location.reload();
    })
  }

  async searchPosts() {
    if(this.searchText.trim() !== ""){
      this.posts = await this.postService.searchPosts(this.searchText,parseInt(this.community.id))
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

  async submitForm(){
    if (await this.checkIfValid()) {
      this.isLoading = true

      this.communityService.updateCommunity(this.community.id, this.newCommunity).then(community => {
        this.isLoading = false
        location.reload();
      })
    }
  }

  async checkIfValid(): Promise<boolean> {
    this.isLoading = true
    this.errorMessages = []
    if (this.newCommunity.name.trim() === "") {
      this.errorMessages.push("Le nom est vide")
    }

    if (this.newCommunity.description.trim() === "") {
      this.errorMessages.push("La description est vide")
    }

    return await this.communityService.getCommunities().then(async communities => {
      this.communities = communities;

      const isNameUsed = this.communities.some(community => community.name.toLowerCase() === this.newCommunity.name.toLowerCase());

      this.isLoading = false
      if (isNameUsed && this.newCommunity.name.toLowerCase() !== this.community.name.toLowerCase()) {
        this.formIsValid = false
        this.errorMessages.push("Le nom est déjà utilisé")
        return false
      } else {

        if (this.newCommunity.name.trim() === "") {
          this.formIsValid = false
          return false
        }

        if (this.newCommunity.description.trim() === "") {
          this.formIsValid = false
          return false
        }

        this.formIsValid = true;
        return true
      }
    })
  }

  openModal(type:string, post:Post|null, follower:User|null): void {
    const dialogRef = this.dialog.open(SelectionModalComponent, {
      width: '50%',
      data: {
        type:type,
        post:post,
        community:this.community,
        follower: follower
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Logique à exécuter après la fermeture de la modale
      // result contient les données renvoyées par la modale si nécessaire
    });
  }


  goToCommunity(communityId: string) {
    this.commonService.navigate(`/community/${communityId}`);
  }
}


interface RouteData {
  community: Community;
}
