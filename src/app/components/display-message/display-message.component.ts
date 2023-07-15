import {Component, ElementRef, HostListener, Input} from '@angular/core';
import {Message} from "../../interfaces/message.entity";
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "../../services/common.service";
import {MessageService} from "../../services/message.service";
import { User } from 'src/app/models/user.model';
import {DateService} from "../../services/date.service";
import {ResponseEntity} from "../../interfaces/response.entity";
import {ResponseService} from "../../services/response.service";
import {NewMessage} from "../../interfaces/new-message.entity";
import {NewResponse} from "../../interfaces/new-response.entity";
import {RoleEnum} from "../../enums/role.enum";
import {UserService} from "../../services/user.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.scss']
})
export class DisplayMessageComponent {
 @Input() message:Message
  author:User;

  newResponse:NewResponse = {text:"",message:null}
  responses:ResponseEntity[]
  creationDate:string
  isDropdownOpen:boolean = false;

  constructor(private responseService:ResponseService, private dateService:DateService, private messageService: MessageService,
              private elementRef: ElementRef, public userService: UserService) {}

  async ngOnInit(): Promise<void> {
    this.messageService.getMessage(this.message.id).then(message => {
      this.author = message.user;
    });

    this.creationDate = this.dateService.formatRelativeTime(this.message.creationDate, "");

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

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  async deleteMessage(){
    await this.messageService.deleteMessage(this.message.id);
    location.reload();
  }
}
