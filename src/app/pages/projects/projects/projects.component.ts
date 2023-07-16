import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from 'src/app/components/project/create-project-dialog/create-project-dialog.component';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    projectName: string = '';
    projects: Project[] = []; 
    imageFile:File
    imageSrc: string;
    noImage:boolean = true
    searchText:string = ""
    baseProjects: Project[] = [];
    filter: string = "En cours"; 

    constructor(private projectService: ProjectService, private commonService:CommonService, private router: Router,
      public dialog: MatDialog, private uploadService:UploadService) { }

      async ngOnInit() {
        await this.loadProjects();
      }

      async loadProjects() {
        switch (this.filter) {
          case "En cours":
            this.projects = await this.projectService.getOngoingProjects();
            break;
          case "Terminé":
            this.projects = await this.projectService.getFinishedProjects();
            break;
          default:
            this.projects = await this.projectService.getProjects();
            break;
        }
  
        this.projects.forEach(async project => {
          await this.loadImage(project);
          if (!project.imageUrl) {
            project.imageUrl = 'background.jpeg';
          }
        });
  
        this.baseProjects = this.projects;
      }
  

      changeFilter(event: Event) {
        const target = event.target as HTMLSelectElement;
        this.filter = target.value;
        this.loadProjects();
      }
      
    

    payNow(project: Project) {
      this.commonService.navigate(`/payment/${project.id}`);
    }

    goToProject(projectId: string) {
      this.commonService.navigate(`/project/${projectId}`);
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(CreateProjectDialogComponent, {
        width: '80%',
        data: {}
      });
    }  

    async loadImage(project:Project) {
      if (project.imageUrl !== '' && !project.imageUrl.includes('http')) {
        try {
          this.imageFile = await this.uploadService.getImage(project.imageUrl);
          this.imageSrc = URL.createObjectURL(this.imageFile);
          this.noImage = false
        } catch (error) {
          console.error('Failed to load image:', error);
        }
      }
    }

    async searchProjects(){
      if(this.searchText.trim() !== ""){
        this.projects = await this.projectService.searchPosts(this.searchText)
      }else{
        this.projects = this.baseProjects
      }
    }
}