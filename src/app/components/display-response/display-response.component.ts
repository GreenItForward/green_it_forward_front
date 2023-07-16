import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {ResponseEntity} from "../../interfaces/response.entity";
import { User } from 'src/app/models/user.model';
import {ResponseService} from "../../services/response.service";
import {DateService} from "../../services/date.service";
import {UserService} from "../../services/user.service";
import {AdminService} from "../../services/admin.service";
import {RoleEnum} from "../../enums/role.enum";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-display-response',
  templateUrl: './display-response.component.html',
  styleUrls: ['./display-response.component.scss']
})
export class DisplayResponseComponent implements OnInit, OnDestroy {
  @Input() response:ResponseEntity

  author:User;
  me:User;
  creationDate:string
  isDropdownOpen:boolean = false;
  protected readonly RoleEnum = RoleEnum;
  private subscription: Subscription = new Subscription();

  constructor(private responseService:ResponseService, private dateService:DateService, private elementRef: ElementRef,
              public userService: UserService, private adminService: AdminService) {}

  async ngOnInit(): Promise<void> {
    this.responseService.getResponse(this.response.id).then(response => {
      this.author = response.user
    });

    this.me = await this.userService.getMe();

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

  ban() {
    this.subscription.add(
      this.adminService.ban(this.author.id).subscribe(
        async (response:any) => {
          this.author.role = response.role;
        }
      )
    );
  }

  unban() {
    this.subscription.add(
      this.adminService.unban(this.author.id).subscribe(
        async (response:any) => {
          this.author.role = response.role;
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
