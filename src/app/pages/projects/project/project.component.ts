import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  project:Project;
  creationDate:string;
  endDate:string;


  constructor(private activatedRoute: ActivatedRoute, private location: Location, protected commonService: CommonService, 
    protected dateService: DateService) { }

  ngOnInit(): void {
    const data = this.activatedRoute.snapshot.data as RouteData;
    this.project = data.project;

    this.creationDate = this.dateService.formatRelativeTime(this.project.startDate, "Débuté depuis");
    this.endDate = this.dateService.formatRelativeTime(this.project.endDate, "Se termine dans");
 

  }


  onBack(): void {
    this.location.back();
  }

  payNow(project: Project) {
    this.commonService.navigate(`/payment/${project.id}`);
  }
}

interface RouteData {
  project: Project;
}
