import { Injectable } from '@angular/core';
import {lastValueFrom} from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {CommonService} from "./common.service";
import {UploadResponse} from "../interfaces/upload-response.entity";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = `${environment.apiUrl}/upload/`;
  token: string | null = null;
  headers: HttpHeaders | null = null;
  options: {headers: HttpHeaders};

  constructor(private http: HttpClient, private commonService: CommonService) {
    this.token = this.commonService.getLocalStorageItem('token');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.options = { headers: this.headers };
  }

  async uploadImage(image: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', image);

    const imageName = await lastValueFrom(this.http.post<UploadResponse>(`${this.apiUrl}`, formData,  this.options))
    if (!imageName) {
      throw new Error('Failed to upload');
    }
    return imageName.filename
  }

  async getImage(imageName: string): Promise<File> {
    const imageBlob = await lastValueFrom(this.http.get(`${this.apiUrl}${imageName}`, { responseType: 'blob', ...this.options }));
    const imageFile = new File([imageBlob], imageName);
    if (!imageFile) {
      throw new Error('Failed to upload');
    }
    return imageFile
  }
}
