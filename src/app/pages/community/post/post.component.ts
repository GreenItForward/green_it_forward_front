import {Component} from '@angular/core';
import {Post} from "../../../interfaces/post.entity";
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "../../../services/common.service";
import {Message} from "../../../interfaces/message.entity";
import {MessageService} from "../../../services/message.service";
import {NewMessage} from "../../../interfaces/new-message.entity";
import {DateService} from "../../../services/date.service";

@Component({
  selector: 'app-community',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  post: Post

  newMessage:NewMessage = {text:"",post:null}
  messages: Message[]
  noMessages: boolean

  creationDate:string

  constructor(private dateService:DateService,private activatedRoute: ActivatedRoute, protected commonService: CommonService, private messageService: MessageService) {}

  ngOnInit(): void {
    const data = this.activatedRoute.snapshot.data as RouteData;
    this.post = data.post;

    this.messageService.getMessagesByPost(this.post.id).then(messages => {
      this.messages = messages;
      this.noMessages = this.messages.length === 0;
    });
    this.creationDate = this.dateService.formatRelativeTime(this.post.creationDate, "");

  }

  submitForm(){
    if(this.checkIfValid()){
      this.newMessage.text = this.newMessage.text.trim()
      this.newMessage.post = this.post
      this.messageService.createMessage(this.newMessage).then(r => {
        location.reload();
      })
    }
  }

  checkIfValid():boolean{
    return !(!this.newMessage.text.trim() || this.newMessage.text.trim() === "");
  }

}

interface RouteData {
  post: Post;
}
