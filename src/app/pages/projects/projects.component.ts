import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    constructor(private commonService: CommonService) { }

    projects: Project[] = this.commonService.getProjects();


  
    ngOnInit(): void { }
}