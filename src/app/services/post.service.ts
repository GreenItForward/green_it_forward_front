import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {lastValueFrom} from 'rxjs';
import {CommonService} from './common.service';
import {User} from "../models/user.model";
import {Post} from "../interfaces/post.entity";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/post/`;
  token: string | null = null;
  headers: HttpHeaders | null = null;
  options: {headers: HttpHeaders};

  constructor(private http: HttpClient, private commonService: CommonService) {
    this.token = this.commonService.getLocalStorageItem('token');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.options = { headers: this.headers };
  }

  async getPost(id: string | null): Promise<Post> {
    if (!id) {
      throw new Error('Post not found');
    }

    const post = await lastValueFrom(this.http.get<Post>(`${this.apiUrl}getone/${id}`, this.options));
    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  }


  async getPosts() : Promise<Post[]> {
    const posts = await lastValueFrom(this.http.get<Post[]>(`${this.apiUrl}all`, this.options));
    console.log(posts)
    return posts ? posts : [];
  }

  async getPostsByCommunity(communityId: string) : Promise<Post[]> {
    const posts = await lastValueFrom(this.http.get<Post[]>(`${this.apiUrl}community/${communityId}`, this.options));
    console.log(posts)
    return posts ? posts : [];
  }

}
