import { Component } from '@angular/core';
import {NewCommunity} from "../../../interfaces/new-community.entity";
import {CommunityService} from "../../../services/community.service";
import {Community} from "../../../interfaces/community.entity";
import {UploadService} from "../../../services/upload.service";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-community',
  templateUrl: './community-form.component.html',
  styleUrls: ['./community-form.component.scss']
})
export class CommunityFormComponent {
  newCommunity:NewCommunity = {name:"",description:"",imgUrl:"",followers:[]}
  file: File | null;
  formIsValid:boolean = false
  isLoading:boolean = false
  communities:Community[] = []
  errorMessages:string[] = []

  constructor(private commonService:CommonService, private communityService:CommunityService, private uploadService:UploadService) {
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
    this.checkIfValid()
  }

  async beforeSubmit() {
    if(this.file !== undefined && this.file !== null){
      this.uploadService.uploadImage(this.file).then(async imageName => {
        this.newCommunity.imgUrl = imageName
        await this.submitForm()
      })
    }
    else await this.submitForm()
  }

  async submitForm(){
    if (await this.checkIfValid()) {
      this.isLoading = true

      this.communityService.createCommunity(this.newCommunity).then(community => {
        this.isLoading = false
        this.commonService.navigate(`/community/${community.id}`);
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

    if (this.file) {
      if(await this.checkIfFileIsImage() === false){
        this.errorMessages.push("Le fichier n'est pas une image")
      }
    }

    return await this.communityService.getCommunities().then(async communities => {
      this.communities = communities;

      const isNameUsed = this.communities.some(community => community.name.toLowerCase() === this.newCommunity.name.toLowerCase());

      this.isLoading = false
      if (isNameUsed) {
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

        if (this.file) {
          if (await this.checkIfFileIsImage() === false) {
            this.formIsValid = false
            return false
          }
        }

        this.formIsValid = true;
        return true
      }
    })
  }

  async checkIfFileIsImage(): Promise<boolean> {
    if (this.file && this.file.type.split('/')[0] === 'image') {
      return true;
    } else {
      return false;
    }
  }
}
