import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared.module';
import { RouterModule } from '@angular/router';
import {DisplayMessageComponent} from "./display-message.component";
import {DisplayResponseModule} from "../display-response/display-response.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [DisplayMessageComponent],
  exports: [
    DisplayMessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    SlickCarouselModule,
    DisplayResponseModule
  ]
})
export class DisplayMessageModule { }
