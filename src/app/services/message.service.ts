import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {lastValueFrom} from 'rxjs';
import {CommonService} from './common.service';
import {User} from "../models/user.model";
import {Post} from "../interfaces/post.entity";
import {Message} from "../interfaces/message.entity";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = `${environment.apiUrl}/message/`;
  token: string | null = null;
  headers: HttpHeaders | null = null;
  options: {headers: HttpHeaders};

  constructor(private http: HttpClient, private commonService: CommonService) {
    this.token = this.commonService.getLocalStorageItem('token');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.options = { headers: this.headers };
  }

  async getMessage(id: string | null): Promise<Message> {
    if (!id) {
      throw new Error('Message not found');
    }

    const message = await lastValueFrom(this.http.get<Message>(`${this.apiUrl}getone/${id}`, this.options));
    if (!message) {
      throw new Error('Message not found');
    }

    return message;
  }


  async getMessages() : Promise<Message[]> {
    const messages = await lastValueFrom(this.http.get<Message[]>(`${this.apiUrl}all`, this.options));
    console.log(messages)
    return messages ? messages : [];
  }

  async getMessagesByPost(postId: string) : Promise<Message[]> {
    const messages = await lastValueFrom(this.http.get<Message[]>(`${this.apiUrl}post/${postId}`, this.options));
    console.log(messages)
    return messages ? messages : [];
  }


}
