import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = `${environment.apiUrl}/stats`;
  token: string | null = null;
  headers: HttpHeaders | null = null;
  options: {headers: HttpHeaders};
  
  constructor(private httpClient:HttpClient, private commonService: CommonService) {
    this.token = this.commonService.getLocalStorageItem('token');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.options = { headers: this.headers };
   }

    async getTotalUsers(): Promise<number> {
      return await lastValueFrom(this.httpClient.get<number>(`${this.apiUrl}/total-users`, this.options));
    }

    async getTotalProjects(): Promise<number> {
      return await lastValueFrom(this.httpClient.get<number>(`${this.apiUrl}/total-projects`, this.options));
    }

    async getUsersPerMonth(year: number): Promise<{name: string, value: number}[]> {
      const response = await lastValueFrom(this.httpClient.get<{[key: string]: number}>(`${this.apiUrl}/users-per-month/${year}`, this.options));
      const userData = Object.entries(response).map(([name, value]) => ({name, value}));
      return userData;
    }
    
}
