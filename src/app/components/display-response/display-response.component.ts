import {Component, ElementRef, HostListener, Input} from '@angular/core';
import {ResponseEntity} from "../../interfaces/response.entity";
import { User } from 'src/app/models/user.model';
import {ResponseService} from "../../services/response.service";
import {DateService} from "../../services/date.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-display-response',
  templateUrl: './display-response.component.html',
  styleUrls: ['./display-response.component.scss']
})
export class DisplayResponseComponent {
  @Input() response:ResponseEntity

  author:User;
  creationDate:string
  isDropdownOpen:boolean = false;

  constructor(private responseService:ResponseService, private dateService:DateService,
              private elementRef: ElementRef, public userService: UserService) {}

  async ngOnInit(): Promise<void> {
    this.responseService.getResponse(this.response.id).then(response => {
      this.author = response.user
    });

    this.creationDate = this.dateService.formatRelativeTime(this.response.creationDate, "");
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

  async deleteResponse(){
    await this.responseService.deleteResponse(this.response.id);
    location.reload();
  }
}
