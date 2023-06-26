import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    projects: Project[] = [
      new Project('1', 'Project Green', 'This is a green project...', 'assets/manif.png', 1000, 10000, new Date(), new Date(), "James"),
      new Project('2', 'Project Green', 'This is a green project...', 'assets/manif.png', 1000, 10000, new Date(), new Date(), "Ronan"),
      new Project('3', 'Project Green', 'This is a green project...', 'assets/manif.png', 1000, 10000, new Date(), new Date(), "Charles"),
    ];
  
    constructor() { }
  
    ngOnInit(): void { }
}