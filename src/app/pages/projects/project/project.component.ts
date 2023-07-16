import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { DateService } from 'src/app/services/date.service';
import { UploadService } from 'src/app/services/upload.service';
import * as moment from 'moment';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

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
  showDonateButton: boolean;
  today: Date = new Date();
  error : string;
  isOwner: boolean;
  editing = false;
  loading = false;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private activatedRoute: ActivatedRoute, private location: Location, protected commonService: CommonService, 
    protected dateService: DateService, private uploadService: UploadService, 
    protected projectService: ProjectService, protected userService: UserService) { }

  async ngOnInit(): Promise<void> {
    const data = this.activatedRoute.snapshot.data as RouteData;
    this.project = data.project;
    await this.loadImage();
    if (!this.project.imageUrl) {
      this.project.imageUrl = 'assets/background.jpeg';
    }

    this.isOwner = this.project.createdBy.id === (await this.userService.getMe()).id;

    this.creationDate = this.dateService.formatRelativeTime(this.project.startDate, "Débuté depuis");
    this.showDonateButton = moment(this.project.endDate).isAfter(this.today);

    this.formatEndDate();
  }


  async onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const extension = (file.name.split('.').pop() || '').toLowerCase();
      if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
        this.error = "Le fichier n'est pas un fichier image valide (jpg, jpeg, png uniquement).";
        return;
      }
      this.loading = true;
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.uploadService.uploadImage(file).then(async imageName => {
        this.project.imageUrl = imageName;
        await this.userService.updateImage(imageName);
        await this.loadImage();

        this.error = "";
      }).catch((error) => {
        this.error = error.error.message;
      });
  
      this.loading = false;
      this.error = "";
    }
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

  editProject(project: Project) {
    this.editing = true;
  }

  onSubmit() {
    this.saveProject();
  }

  async saveProject() {
    try {
      this.project.totalAmount = Number(this.project.totalAmount);
      this.formatEndDate()
      await this.projectService.updateProject(this.project);
      this.editing = false;
    } catch (error : any) {
      this.error = error.error.message;
    }
  }

  formatEndDate() {
    if (!this.showDonateButton) {
      this.endDate = this.dateService.formatRelativeTime(this.project.endDate, "S'est terminé depuis");
    } else {
      this.endDate = this.dateService.formatRelativeTime(this.project.endDate, "Se termine dans");
    }
  }

}



interface RouteData {
  project: Project;
}
