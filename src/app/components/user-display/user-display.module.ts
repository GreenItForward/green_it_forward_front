import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared.module';
import { RouterModule } from '@angular/router';
import {UserDisplayComponent} from "./user-display.component";

@NgModule({
  declarations: [UserDisplayComponent],
  exports: [
    UserDisplayComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    SlickCarouselModule
  ]
})
export class UserDisplayModule { }
