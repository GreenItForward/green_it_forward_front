import {Component, Inject, Input} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CommonService} from "../../services/common.service";
import {PostService} from "../../services/post.service";
import {Community} from "../../interfaces/community.entity";
import {Post} from "../../interfaces/post.entity";
import {User} from "../../interfaces/user.entity";
import {CommunityService} from "../../services/community.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-post-create-modal',
  templateUrl: './selection-modal.component.html',
  styleUrls: ['./selection-modal.component.scss']
})
export class SelectionModalComponent {
  community:Community
  post:Post
  follower:User
  type:string
  isLoading:boolean = false
  errorMessages:string[] = []

  constructor(
    public dialogRef: MatDialogRef<SelectionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService:CommonService,
    private postService:PostService,
    private communityService:CommunityService,
  ) { }

  ngOnInit(){
    this.type = this.data.type
    this.post = this.data.post
    this.community = this.data.community
    this.follower = this.data.follower
  }

  action(){
    if(this.type === 'community') this.deleteCommunity()
    if(this.type === 'post') this.deletePost()
    if(this.type === 'follower') this.removeUser()
    this.closeModal()
  }

  deleteCommunity(){
    this.communityService.deleteCommunity(this.community.id).then(r => {
      console.log(r)
      this.commonService.navigate(`/community`);
    })
  }

  deletePost(){
    this.postService.deletePost(this.post.id).then(r => {
      console.log(r)
      location.reload();
    })
  }

  removeUser(){
    this.communityService.removeFollowerFromCommunity(this.follower.id,this.community.id).then(r => {
      console.log(r)
      location.reload();
    })
  }

  closeModal(): void{
    this.dialogRef.close();
  }
}
