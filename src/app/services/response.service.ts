import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {lastValueFrom} from 'rxjs';
import {CommonService} from './common.service';
import {ResponseEntity} from "../interfaces/response.entity";
import {NewResponse} from "../interfaces/new-response.entity";

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private apiUrl = `${environment.apiUrl}/response/`;
  token: string | null = null;
  headers: HttpHeaders | null = null;
  options: {headers: HttpHeaders};

  constructor(private http: HttpClient, private commonService: CommonService) {
    this.token = this.commonService.getLocalStorageItem('token');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.options = { headers: this.headers };
  }

  async getResponse(id: string | null): Promise<ResponseEntity> {
    if (!id) {
      throw new Error('Response not found');
    }

    const response = await lastValueFrom(this.http.get<ResponseEntity>(`${this.apiUrl}getone/${id}`, this.options));
    if (!response) {
      throw new Error('Response not found');
    }

    return response;
  }

  async createResponse(newResponse: NewResponse): Promise<ResponseEntity> {
    const response = await lastValueFrom(this.http.post<ResponseEntity>(`${this.apiUrl}`, newResponse, this.options));
    if (!response) {
      throw new Error('Failed to create response');
    }
    return response
  }

  async getResponses() : Promise<ResponseEntity[]> {
    const responses = await lastValueFrom(this.http.get<ResponseEntity[]>(`${this.apiUrl}all`, this.options));
    return responses ? responses : [];
  }

  async getResponsesByMessage(messageId: string) : Promise<ResponseEntity[]> {
    const responses = await lastValueFrom(this.http.get<ResponseEntity[]>(`${this.apiUrl}message/${messageId}`, this.options));
    return responses ? responses : [];
  }


  async getResponsesByUser() : Promise<ResponseEntity[]> {
    const responses = await lastValueFrom(this.http.get<ResponseEntity[]>(`${this.apiUrl}user`, this.options));
    return responses ? responses : [];
  }


}
