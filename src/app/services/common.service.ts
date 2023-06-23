import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  //mock of projects 
  projects:Project[] = [
    new Project('1', 'Project Green', 'This is a green project...', 'assets/manif.png', 1000, 10000, new Date(), new Date(), "James"),
    new Project('2', 'Project Green', 'This is a green project...', 'assets/manif.png', 1000, 10000, new Date(), new Date(), "Ronan"),
    new Project('3', 'Project Green', 'This is a green project...', 'assets/manif.png', 1000, 10000, new Date(), new Date(), "Charles"),
    new Project('4', 'Project Green', 'This is a green project...', 'assets/manif.png', 1000, 10000, new Date(), new Date(), "James"),
    new Project('5', 'Project Green', 'This is a green project...', 'assets/manif.png', 1000, 10000, new Date(), new Date(), "Ronan"),
    new Project('6', 'Project Green', 'This is a green project...', 'assets/manif.png', 1000, 10000, new Date(), new Date(), "Charles"),
    new Project('7', 'Project Green', 'This is a green project...', 'assets/manif.png', 1000, 10000, new Date(), new Date(), "James"),
  ];


  constructor(private Router: Router) { }

  public getLocalStorageItem(key: string) {
    return localStorage.getItem(key);
  }

  navigate(page: string) {
    if (page.charAt(0) === '/' && page.length > 1) {
      page = page.substring(1);
    }

    this.Router.navigate([page]);
  }

  // get projects
  getProjects() {
    return this.projects;
  }


}
