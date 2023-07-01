import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../models/project.model';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  projects: Project[] = [];
  private _projectService: ProjectService;

  constructor(private router: Router, private injector: Injector) { 
    setTimeout(() => this._projectService = injector.get(ProjectService));
  }

  public getLocalStorageItem(key: string) {
    return localStorage.getItem(key);
  }

  navigate(page: string) {
    if (page.startsWith('/') && page.length > 1) {
      page = page.substring(1);
    }

    this.router.navigate([page]);
  }

  navigateToErrorPage(description: string) {
    this.router.navigate(['/error'], { queryParams: { description: description } });
  }

  // generate random uuid (from https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid)
  generateUUID() {
     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      }
    );
  }

  async getProjectIci() : Promise<Project[]> {
    await new Promise(resolve => setTimeout(resolve)); 
  
    if (!this._projectService) {
      throw new Error('ProjectService is not defined');
    }
  
    this.projects = await this._projectService.getProjects();
    return this.projects;
  }
  
}
