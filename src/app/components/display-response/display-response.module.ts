import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared.module';
import { RouterModule } from '@angular/router';
import {DisplayResponseComponent} from "./display-response.component";

@NgModule({
  declarations: [DisplayResponseComponent],
  exports: [
    DisplayResponseComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    SlickCarouselModule
  ]
})
export class DisplayResponseModule { }
