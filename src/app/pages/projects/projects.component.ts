import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    projectName: string = '';

    constructor(private projectService: ProjectService, private commonService:CommonService, private router: Router) {}

    projects: Project[]; 
    ngOnInit() {
      this.projectService.getProjects().then(projects => {
        this.projects = projects;
      });

    }

    payNow(project: Project) {
      this.commonService.navigate(`/payment/${project.id}`);
    }
}