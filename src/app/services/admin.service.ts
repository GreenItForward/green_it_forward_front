import {Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {lastValueFrom} from "rxjs";
import {CommonService} from "./common.service";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  token: string | null = null;
  headers: HttpHeaders | null = null;
  options: {headers: HttpHeaders};

  constructor(private http: HttpClient, private commonService: CommonService) {
    this.token = this.commonService.getLocalStorageItem('token');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.options = { headers: this.headers };
  }

  async getUsers(): Promise<User[]> {
    const users = await lastValueFrom(this.http.get<User[]>(`${environment.apiUrl}/user/admin`, this.options));
    return users ? users : [];
  }

  async ban(userId: number) {
    return this.http.post(`${environment.apiUrl}/role/change-role`, {
      userId,
      role: "BANNIS"
    }, this.options);
  }

  async unban(userId: number) {
    return this.http.post(`${environment.apiUrl}/role/change-role`, {
      userId,
      role: "MEMBRE"
    }, this.options);
  }
}
