import { Component } from '@angular/core';
import {Community} from "../../../interfaces/community.entity";
import {ProjectService} from "../../../services/project.service";
import {CommonService} from "../../../services/common.service";
import {Router} from "@angular/router";
import {Project} from "../../../models/project.model";
import {CommunityService} from "../../../services/community.service";

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent {
  communities: Community[] = [];

  constructor(private communitiesService: CommunityService) {}

  projects: Project[];
  ngOnInit() {
    this.communitiesService.getCommunities().then(communities => {
      this.communities = communities;
    });

  }
}