import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project.model';
import { lastValueFrom, map } from 'rxjs';
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
    const projects = await lastValueFrom(
      this.http.get<Project[]>(`${this.apiUrl}`, this.options)
        .pipe(
          map((projects: Project[]) => projects.map(project => {
            project.startDate = new Date(project.startDate);
            project.endDate = new Date(project.endDate);
            return project;
          }))
        )
    );

    return projects ? projects : [];
  }

  async getOngoingProjects() {
  const projects = await lastValueFrom(this.http.get<Project[]>(`${this.apiUrl}/ongoing`, this.options)
    .pipe(
      map((projects: Project[]) => projects.map(project => {
        project.startDate = new Date(project.startDate);
        project.endDate = new Date(project.endDate);
        return project;
      }
      ))
    )
  );

    return projects ? projects : [];
  }

  async getFinishedProjects() {
    const projects = await lastValueFrom(this.http.get<Project[]>(`${this.apiUrl}/finished`, this.options)
      .pipe(
        map((projects: Project[]) => projects.map(project => {
          project.startDate = new Date(project.startDate);
          project.endDate = new Date(project.endDate);
          return project;
        }
        ))
      )
    );

    return projects ? projects : [];
  }


  async createProject(newProject: Project): Promise<Project> {
    let dataToSend = {
      ...newProject,
      endDate: newProject.endDate.toISOString()
    };

    const project = await lastValueFrom(this.http.post<Project>(`${this.apiUrl}`, dataToSend, this.options));
    if (!project) {
      throw new Error('Failed to create project');
    }
    return project
  }

  async searchPosts(searchText: string): Promise<Project[]> {
    const projects = await lastValueFrom(this.http.get<Project[]>(`${this.apiUrl}/search/${searchText}`, this.options));
    if (!projects) {
      throw new Error('Failed to find communitites');
    }
    return projects
  }
  
}
