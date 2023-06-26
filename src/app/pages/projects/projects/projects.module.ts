import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProjectsModule { }