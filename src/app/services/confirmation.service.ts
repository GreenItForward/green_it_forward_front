import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  constructor(private http: HttpClient) {}

  confirm(token: string) {
    return this.http.post(`${environment.apiUrl}/user/verify`, { token });
  }
}
