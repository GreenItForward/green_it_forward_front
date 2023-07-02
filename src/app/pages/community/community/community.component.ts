import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {CommonService} from "../../../services/common.service";
import {Community} from "../../../interfaces/community.entity";
import {Project} from "../../../models/project.model";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent {

  community: Community
  followers: User[]

  constructor(private activatedRoute: ActivatedRoute, protected commonService: CommonService, private communityService:CommonService) {}

  ngOnInit(): void {
    const data = this.activatedRoute.snapshot.data as RouteData;
    this.community = data.community;
    console.log(this.community)
  }

}


interface RouteData {
  community: Community;
}
