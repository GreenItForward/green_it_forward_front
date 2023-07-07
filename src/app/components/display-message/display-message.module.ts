import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared.module';
import { RouterModule } from '@angular/router';
import {DisplayMessageComponent} from "./display-message.component";

@NgModule({
  declarations: [DisplayMessageComponent],
  exports: [
    DisplayMessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    SlickCarouselModule
  ]
})
export class DisplayMessageModule { }
