import {Component, Input} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {Post} from "../../interfaces/post.entity";
import {User} from "../../interfaces/user.entity";

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.scss']
})
export class PostDisplayComponent {
  @Input() post: Post;

  constructor(protected commonService: CommonService) {}

  ngOnInit() {

  }


  goToPost(postId: string) {
    this.commonService.navigate(`/post/${postId}`);
  }
}
