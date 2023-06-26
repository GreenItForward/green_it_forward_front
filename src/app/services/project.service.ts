import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project.model';
import { lastValueFrom } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/project`;
  token: string | null = null;
  headers: HttpHeaders | null = null;
  options: {headers: HttpHeaders};

  constructor(private http: HttpClient, private commonService: CommonService) { 
    this.token = this.commonService.getLocalStorageItem('token');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.options = { headers: this.headers };
  }

  async getProject(id: string | null): Promise<Project> {
    if (!id) {
      throw new Error('Project not found');
    }

    const project = await lastValueFrom(this.http.get<Project>(`${this.apiUrl}/${id}`, this.options));
    if (!project) {
      throw new Error('Project not found');
    }
    
    return project;
  }


  async getProjects() : Promise<Project[]> {
    const projects = await lastValueFrom(this.http.get<Project[]>(`${this.apiUrl}`, this.options));
    return projects ? projects : [];
  }
  
}
