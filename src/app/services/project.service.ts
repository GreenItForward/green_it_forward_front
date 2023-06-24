import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project.model';
import { catchError, lastValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/project`;

  constructor(private http: HttpClient) { }

  async getProject(id: string | null): Promise<Project> {
    if (!id) {
      throw new Error('Project not found');
    }

    const project = await lastValueFrom(this.http.get<Project>(`${this.apiUrl}/${id}`));
    
    if (!project) {
      throw new Error('Project not found');
    }
    
    return project;
  }
  
  

}
