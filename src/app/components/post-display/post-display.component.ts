import {Component, Input} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {Post} from "../../interfaces/post.entity";
import {User} from "../../interfaces/user.entity";
import {Message} from "../../interfaces/message.entity";
import {MessageService} from "../../services/message.service";
import {DateService} from "../../services/date.service";

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.scss']
})
export class PostDisplayComponent {
  @Input() post: Post;
  messages:Message[] = []
  noMessages:boolean
  messagesCount:number = 0
  creationDate:string

  constructor(private dateService:DateService, protected commonService: CommonService, private messageService:MessageService) {}

  ngOnInit() {
    this.messageService.getMessagesByPost(this.post.id).then(messages => {
      this.messages = messages;
      this.noMessages = this.messages.length === 0;
    });

    this.creationDate = this.dateService.formatRelativeTime(this.post.creationDate)
  }


  goToPost(postId: string) {
    this.commonService.navigate(`/post/${postId}`);
  }
}
