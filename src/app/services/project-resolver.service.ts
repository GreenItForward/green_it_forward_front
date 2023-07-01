import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Injectable({ providedIn: 'root' })
export class ProjectResolver implements Resolve<Project> {
  constructor(private projectService: ProjectService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project> | Promise<Project> | Project {
    const id = route.paramMap.get('id');
    return this.projectService.getProject(id);
  }
}
