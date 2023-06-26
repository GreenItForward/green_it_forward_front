import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProjectModule { }
