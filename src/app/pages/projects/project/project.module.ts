import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,

  ]
})
export class ProjectModule { }
