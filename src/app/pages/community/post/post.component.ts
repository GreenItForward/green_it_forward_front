import {Component, Input} from '@angular/core';
import {Community} from "../../../interfaces/community.entity";
import {Post} from "../../../interfaces/post.entity";
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "../../../services/common.service";
import {PostService} from "../../../services/post.service";
import {Message} from "../../../interfaces/message.entity";
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-community',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input() community: Community

  post: Post
  messages: Message[]
  noMessages: boolean

  constructor(private activatedRoute: ActivatedRoute, protected commonService: CommonService, private messageService: MessageService) {}

  ngOnInit(): void {
    const data = this.activatedRoute.snapshot.data as RouteData;
    this.post = data.post;

    this.messageService.getMessagesByPost(this.post.id).then(messages => {
      this.messages = messages;
      this.noMessages = this.messages.length === 0;
    });
  }



}


interface RouteData {
  post: Post;
}

