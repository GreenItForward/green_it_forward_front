import {Component, Input} from '@angular/core';
import {Message} from "../../interfaces/message.entity";
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "../../services/common.service";
import {MessageService} from "../../services/message.service";
import {User} from "../../interfaces/user.entity";

@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.scss']
})
export class DisplayMessageComponent {
 @Input() message:Message

  author:User = {id:"", firstName:"", lastName:"", role:"", imageUrl:"", password:"", email:"", createdAt:new Date(), updatedAt:new Date()}

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.getMessage(this.message.id).then(message => {
      console.log(message)
      this.author = message.user
    });
  }
}
