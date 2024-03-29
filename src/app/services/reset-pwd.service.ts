import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPwdService {

  constructor(private httpClient: HttpClient) { }

  resetPwd(email: string) : Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/mail/send/reset-password/${email}`);
  }
}
