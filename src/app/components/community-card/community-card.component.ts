import {Component, Input} from '@angular/core';
import {Community} from "../../interfaces/community.entity";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-community-card',
  templateUrl: './community-card.component.html',
  styleUrls: ['./community-card.component.scss']
})
export class CommunityCardComponent {
  @Input() community: Community;

  constructor(protected commonService: CommonService) {}

  ngOnInit() {
    if(this.community.imgUrl === undefined || this.community.imgUrl === "") this.community.imgUrl = "background.jpeg"
  }


  goToCommunity(communityId: string) {
    this.commonService.navigate(`/community/${communityId}`);
  }
}
