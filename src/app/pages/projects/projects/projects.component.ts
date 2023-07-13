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
    projects: Project[]; 
    imageFile:File
    imageSrc: string;
    noImage:boolean = true

    constructor(private projectService: ProjectService, private commonService:CommonService, private router: Router,
      public dialog: MatDialog, private uploadService:UploadService) { }





    async ngOnInit() {
      this.projectService.getProjects().then(projects => {
        this.projects = projects;
        this.projects.forEach(async project => {
          await this.loadImage(project);
          if (!project.imageUrl) {
            project.imageUrl = 'background.jpeg';
          }
        });
      });

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
}