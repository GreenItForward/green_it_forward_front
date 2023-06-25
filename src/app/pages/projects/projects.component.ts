import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    projectName: string = '';

    constructor(private commonService: CommonService, private router: Router) {}

    projects: Project[] = this.commonService.getProjects();

    ngOnInit() {

    }

    payNow(project: Project) {
      this.commonService.navigate(`/payment/${project.id}`);
    }
}