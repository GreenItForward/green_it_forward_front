import {Component, Input} from '@angular/core';
import {ResponseEntity} from "../../interfaces/response.entity";
import {User} from "../../interfaces/user.entity";
import {ResponseService} from "../../services/response.service";
import {DateService} from "../../services/date.service";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-display-response',
  templateUrl: './display-response.component.html',
  styleUrls: ['./display-response.component.scss']
})
export class DisplayResponseComponent {
  @Input() response:ResponseEntity

  author:User = {id:null, firstName:"", lastName:"", role:"", imageUrl:"", password:"", email:"", createdAt:new Date(), updatedAt:new Date()}
  creationDate:string

  constructor(private responseService:ResponseService, private dateService:DateService) {}

  async ngOnInit(): Promise<void> {

    this.responseService.getResponse(this.response.id).then(response => {
      this.author = response.user
    });

    this.creationDate = this.dateService.formatRelativeTime(this.response.creationDate)
  }
}
