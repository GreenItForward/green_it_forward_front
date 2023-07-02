import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {Community} from "../interfaces/community.entity";
import {CommunityService} from "./community.service";
import {User} from "../models/user.model";

@Injectable({ providedIn: 'root' })
export class CommunityResolver implements Resolve<Community> {
  constructor(private communityService: CommunityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Community> | Promise<Community> | Community {
    const id = route.paramMap.get('id');
    console.log(id)
    return this.communityService.getCommunity(id);
  }
}
