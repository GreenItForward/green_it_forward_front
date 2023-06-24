import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  //mock of projects  - will be replaced by API call
  projects:Project[] = [
    new Project('2f009e72-5f7d-454b-9790-70ab23ee739a', 'Project Green', 'This is a green project...', 'assets/manif.png', 1000, 10000, new Date(), new Date(), "James"),
    new Project(this.generateUUID(), 'Project Green', 'This is a green project...', 'assets/manif.png', 1000, 10000, new Date(), new Date(), "Ronan"),
    new Project(this.generateUUID(), 'Project Green', 'This is a green project...', 'assets/manif.png', 1000, 10000, new Date(), new Date(), "Charles"),
    new Project(this.generateUUID(), 'Project Green', 'This is a green project...', 'assets/manif.png', 1000, 10000, new Date(), new Date(), "James"),
    new Project(this.generateUUID(), 'Project Green', 'This is a green project...', 'assets/manif.png', 1000, 10000, new Date(), new Date(), "Ronan"),
    new Project(this.generateUUID(), 'Project Green', 'This is a green project...', 'assets/manif.png', 1000, 10000, new Date(), new Date(), "Charles"),
    new Project(this.generateUUID(), 'Project Green', 'This is a green project...', 'assets/manif.png', 1000, 10000, new Date(), new Date(), "James"),
  ];


  constructor(private Router: Router) { }

  public getLocalStorageItem(key: string) {
    return localStorage.getItem(key);
  }

  navigate(page: string) {
    if (page.startsWith('/') && page.length > 1) {
      page = page.substring(1);
    }

    this.Router.navigate([page]);
  }

  getProjects() {
    return this.projects;
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


}
