import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [ HomeComponent ],
  imports: [
    CommonModule,
    SharedModule,
    SlickCarouselModule
  ]
})
export class HomeModule { }
