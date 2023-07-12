import {Component, Input} from '@angular/core';
import {Post} from "../../interfaces/post.entity";
import {CommonService} from "../../services/common.service";
import {User} from "../../interfaces/user.entity";

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.scss']
})
export class UserDisplayComponent {
  @Input() follower: User;
  @Input() creator: User|null;

  constructor(protected commonService: CommonService) {}

  ngOnInit() {
    if(this.follower.imageUrl === undefined || this.follower.imageUrl === "") this.follower.imageUrl = "profil.png"
  }


  goToCommunity(communityId: string) {
    //this.commonService.navigate(`/community/${communityId}`);
  }
}
