import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {lastValueFrom} from 'rxjs';
import {CommonService} from './common.service';
import {User} from "../models/user.model";
import {Post} from "../interfaces/post.entity";
import {NewCommunity} from "../interfaces/new-community.entity";
import {Community} from "../interfaces/community.entity";
import {NewPost} from "../interfaces/new-post.entity";

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

  async deletePost(id: string | null): Promise<void> {
    if (!id) {
      throw new Error('Post not found');
    }

    await lastValueFrom(this.http.delete<Post>(`${this.apiUrl}delete/${id}`, this.options));
  }

  async createPost(newPost: NewPost): Promise<Post> {
    const post = await lastValueFrom(this.http.post<Post>(`${this.apiUrl}`, newPost, this.options));
    if (!post) {
      throw new Error('Failed to create post');
    }
    return post
  }

  async searchPosts(searchText: string, communityId:number): Promise<Post[]> {
    const posts = await lastValueFrom(this.http.post<Post[]>(`${this.apiUrl}search/${searchText}`,{communityId}, this.options));
    if (!posts) {
      throw new Error('Failed to find posts');
    }
    return posts
  }

  async getPosts() : Promise<Post[]> {
    const posts = await lastValueFrom(this.http.get<Post[]>(`${this.apiUrl}all`, this.options));
    return posts ? posts : [];
  }

  async getPostsByCommunity(communityId: string) : Promise<Post[]> {
    const posts = await lastValueFrom(this.http.get<Post[]>(`${this.apiUrl}community/${communityId}`, this.options));
    return posts ? posts : [];
  }

}
