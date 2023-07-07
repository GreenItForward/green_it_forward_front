import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared.module';
import { RouterModule } from '@angular/router';
import {PostDisplayComponent} from "./post-display.component";

@NgModule({
  declarations: [PostDisplayComponent],
  exports: [
    PostDisplayComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    SlickCarouselModule
  ]
})
export class PostDisplayModule { }
