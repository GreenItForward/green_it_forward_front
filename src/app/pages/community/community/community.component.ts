import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {CommonService} from "../../../services/common.service";
import {Community} from "../../../interfaces/community.entity";
import {Project} from "../../../models/project.model";
import {User} from "../../../interfaces/user.entity";
import {Post} from "../../../interfaces/post.entity";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent {

  community: Community
  noFollowers: boolean
  noPosts: boolean
  posts: Post[]

  constructor(private activatedRoute: ActivatedRoute, protected commonService: CommonService, private postService:PostService) {}

  ngOnInit(): void {
    const data = this.activatedRoute.snapshot.data as RouteData;
    this.community = data.community;
    this.noFollowers = this.community.followers.length === 0;

    this.postService.getPostsByCommunity(this.community.id).then(posts => {
      this.posts = posts;
      this.noPosts = this.posts.length === 0;
    });
  }

}


interface RouteData {
  community: Community;
}
