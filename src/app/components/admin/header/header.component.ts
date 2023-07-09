import { Component } from '@angular/core';
import {User} from "../../../models/user.model";
import {AdminService} from "../../../services/admin.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AdminHeaderComponent {
  currentUser: User

  constructor(private adminService: AdminService, private userService: UserService) {}

  async ngOnInit() {
    this.currentUser = await this.userService.getMe();
    this.currentUser.firstName = this.currentUser.firstName ? this.currentUser.firstName : "Admin";
  }
}
