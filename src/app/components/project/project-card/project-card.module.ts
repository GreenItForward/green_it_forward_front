import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared.module';
import { RouterModule } from '@angular/router';
import { ProjectCardComponent } from './project-card.component';

@NgModule({
  declarations: [ProjectCardComponent],
  exports: [
    ProjectCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    SlickCarouselModule
  ]
})
export class ProjectCardModule { }
