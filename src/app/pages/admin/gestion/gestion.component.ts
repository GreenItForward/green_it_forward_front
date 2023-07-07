import { Component } from '@angular/core';
import {User} from "../../../models/user.model";
import {AdminService} from "../../../services/admin.service";

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent {
  users: User[]
  errorMessage: string = "";

  constructor(protected adminService: AdminService) {}

  async ngOnInit() {
    this.users = await this.adminService.getUsers();
  }

  ban(user: User) {
    this.adminService.ban(user.id).subscribe(
      async (response:any) => {
        user.role = response.role;
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }

  unban(user: User) {
    this.adminService.unban(user.id).subscribe(
      async (response:any) => {
        user.role = response.role;
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }
}
