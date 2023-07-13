import {Component, Inject, Input} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {NewPost} from "../../interfaces/new-post.entity";
import {CommonService} from "../../services/common.service";
import {PostService} from "../../services/post.service";
import {Community} from "../../interfaces/community.entity";

@Component({
  selector: 'app-post-create-modal',
  templateUrl: './post-create-modal.component.html',
  styleUrls: ['./post-create-modal.component.scss']
})
export class PostCreateModalComponent {
  @Input() community:Community
  newPost:NewPost = {subject:"", text:"", community:null}
  formIsValid:boolean = false
  isLoading:boolean = false
  errorMessages:string[] = []

  constructor(
    public dialogRef: MatDialogRef<PostCreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService:CommonService,
    private postService:PostService
  ) { }

  ngOnInit(){
    if(this.data) this.newPost.community = this.data.community
  }

  closeModal(): void{
    this.dialogRef.close();
  }

  async submitForm(){
    if (await this.checkIfValid()) {
      this.isLoading = true

      this.postService.createPost(this.newPost).then(post => {
        this.isLoading = false
        this.closeModal()
        this.commonService.navigate(`/post/${post.id}`);
      })
    }
  }

  async checkIfValid(): Promise<boolean> {
    this.isLoading = true
    this.errorMessages = []
    if (this.newPost.subject.trim() === "") {
      this.errorMessages.push("Le sujet est vide")
    }

    if (this.newPost.text.trim() === "") {
      this.errorMessages.push("Le post est vide")
    }

    if (this.newPost.subject.trim() === "") {
      this.isLoading = false
      this.formIsValid = false
      return false
    }

    if (this.newPost.text.trim() === "") {
      this.isLoading = false
      this.formIsValid = false
      return false
    }

    this.isLoading = false
    this.formIsValid = true
    return true
  }
}
