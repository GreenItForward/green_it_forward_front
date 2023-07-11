import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { SharedModule } from 'src/app/shared.module';
import { CreateProjectDialogComponent } from 'src/app/components/project/create-project-dialog/create-project-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectCardComponent } from 'src/app/components/project/project-card/project-card.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    CreateProjectDialogComponent,
    ProjectCardComponent 
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ]
})
export class ProjectsModule { } 