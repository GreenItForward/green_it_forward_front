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

  constructor(private adminService: AdminService) {}

  async ngOnInit() {
    this.users = await this.adminService.getUsers();
  }
}
