import { UserService } from 'src/app/services/user.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {lastValueFrom} from 'rxjs';
import {CommonService} from './common.service';
import {Community} from "../interfaces/community.entity";
import { User } from '../models/user.model';
import {NewCommunity} from "../interfaces/new-community.entity";

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private apiUrl = `${environment.apiUrl}/communities/`;
  token: string | null = null;
  headers: HttpHeaders | null = null;
  options: {headers: HttpHeaders};

  constructor(private http: HttpClient, private commonService: CommonService) {
    this.token = this.commonService.getLocalStorageItem('token');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.options = { headers: this.headers };
  }

  async getCommunity(id: string | null): Promise<Community> {
    if (!id) {
      throw new Error('Community not found');
    }

    const community : Community= await lastValueFrom(this.http.get<Community>(`${this.apiUrl}community/${id}`, this.options));
    if (!community) {
      throw new Error('Community not found');
    }
    community.followers = await this.getCommunityUsers(id)
    return community;
  }

  async getCommunityUsers(id: string | null) : Promise<User[]> {
    if (!id) {
      throw new Error('Community not found');
    }
    const users = await lastValueFrom(this.http.get<User[]>(`${this.apiUrl}community/${id}/users`, this.options));
    if (!users) {
      throw new Error('Users not found');
    }
    return users ? users : [];
  }

  async getCommunities() : Promise<Community[]> {
    const communities = await lastValueFrom(this.http.get<Community[]>(`${this.apiUrl}all`, this.options));
    return communities ? communities : [];
  }

  async createCommunity(newCommunity: NewCommunity): Promise<Community> {
    const community = await lastValueFrom(this.http.post<Community>(`${this.apiUrl}`, newCommunity, this.options));
    if (!community) {
      throw new Error('Failed to create community');
    }
    return community
  }

  async updateCommunity(communityId:string, newCommunity: NewCommunity): Promise<Community> {
    console.log(newCommunity)
    const communityBody = {
        name: newCommunity.name,
        description: newCommunity.description,
    }
    const community = await lastValueFrom(this.http.patch<Community>(`${this.apiUrl}community/${communityId}`, communityBody, this.options));
    if (!community) {
      throw new Error('Failed to update community');
    }
    return community
  }

  async deleteCommunity(communityId:string): Promise<void> {
    await lastValueFrom(this.http.delete<void>(`${this.apiUrl}delete/${communityId}`, this.options));
  }

  async searchCommunities(searchText: string): Promise<Community[]> {
    const communitites = await lastValueFrom(this.http.get<Community[]>(`${this.apiUrl}search/${searchText}`, this.options));
    if (!communitites) {
      throw new Error('Failed to find communitites');
    }
    return communitites
  }

  async followCommunity(id: string): Promise<void> {
    const community = await lastValueFrom(this.http.post<Community>(`${this.apiUrl}community/${id}/follow`, null, this.options));
    if (!community) {
      throw new Error('Failed to follow community');
    }
  }

  async unFollowCommunity(id: string): Promise<void> {
    const community = await lastValueFrom(this.http.post<Community>(`${this.apiUrl}community/${id}/unfollow`, null, this.options));
    if (!community) {
      throw new Error('Failed to unfollow community');
    }
  }

  async removeFollowerFromCommunity(userId: number | null, communityId: string): Promise<void> {
    const community = await lastValueFrom(this.http.patch<Community>(`${this.apiUrl}removefollower`, {userId:userId, communityId:communityId}, this.options));
    if (!community) {
      throw new Error('Failed to unfollow community');
    }
  }
  async getCommunitiesByUser(user: User): Promise<Community[]> {
    const communities = await lastValueFrom(this.http.get<Community[]>(`${this.apiUrl}user/${user.id}/communities`, this.options));
    return communities ? communities : [];
  }

}
