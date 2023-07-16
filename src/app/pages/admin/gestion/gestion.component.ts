import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {AdminService} from "../../../services/admin.service";
import {UserService} from "../../../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit, OnDestroy {
  users: User[]
  errorMessage: string = "";
  roles: string[]
  currentUser: User | null = null;
  private subscription: Subscription = new Subscription();

  constructor(protected adminService: AdminService, protected userService: UserService) {}

  async ngOnInit() {
    this.users = await this.adminService.getUsers();
    this.roles = await this.userService.getEveryRoles();
    this.roles = this.roles.filter(role => role !== "BANNIS");
    this.currentUser = await this.userService.getMe();
  }

  ban(user: User) {
    this.subscription.add(
      this.adminService.ban(user.id).subscribe(
        async (response:any) => {
          user.role = response.role;
        },
        error => {
          this.errorMessage = error.error.message;
        }
      )
    );
  }

  unban(user: User) {
    this.subscription.add(
      this.adminService.unban(user.id).subscribe(
        async (response:any) => {
          user.role = response.role;
        },
        error => {
          this.errorMessage = error.error.message;
        }
      )
    );
  }

  changeRole(user: User, role: string) {
    this.subscription.add(
      this.adminService.changeRole(user.id, role).subscribe(
        async (response:any) => {
          user.role = response.role;
        },
        error => {
          this.errorMessage = error.error.message;
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
