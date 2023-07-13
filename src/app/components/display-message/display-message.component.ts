import {Component, Input} from '@angular/core';
import {Message} from "../../interfaces/message.entity";
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "../../services/common.service";
import {MessageService} from "../../services/message.service";
import {User} from "../../interfaces/user.entity";
import {DateService} from "../../services/date.service";
import {ResponseEntity} from "../../interfaces/response.entity";
import {ResponseService} from "../../services/response.service";
import {NewMessage} from "../../interfaces/new-message.entity";
import {NewResponse} from "../../interfaces/new-response.entity";

@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.scss']
})
export class DisplayMessageComponent {
 @Input() message:Message
  author:User = {id:null, firstName:"", lastName:"", role:"", imageUrl:"", password:"", email:"", createdAt:new Date(), updatedAt:new Date()}

  newResponse:NewResponse = {text:"",message:null}
  responses:ResponseEntity[]
  creationDate:string

  constructor(private responseService:ResponseService, private dateService:DateService, private messageService: MessageService) {}

  async ngOnInit(): Promise<void> {
    this.messageService.getMessage(this.message.id).then(message => {
      this.author = message.user
    });

    this.creationDate = this.dateService.formatRelativeTime(this.message.creationDate)

    this.responses = await this.responseService.getResponsesByMessage(this.message.id)
  }

  submitForm(){
    if(this.checkIfValid()){
      this.newResponse.text = this.newResponse.text.trim()
      this.newResponse.message = this.message
      this.responseService.createResponse(this.newResponse).then(r => {
        location.reload();
      })
    }
  }

  checkIfValid():boolean{
    return !(!this.newResponse.text.trim() || this.newResponse.text.trim() === "");
  }
}
