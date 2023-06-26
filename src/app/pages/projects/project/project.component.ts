import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  project:Project;

  constructor(private activatedRoute: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    const data = this.activatedRoute.snapshot.data as RouteData;
    this.project = data.project;
  }


  onBack(): void {
    this.location.back();
  }
}

interface RouteData {
  project: Project;
}
