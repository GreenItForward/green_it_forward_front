import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared.module';
import { RouterModule } from '@angular/router';
import {PostComponent} from "./post.component";
import {DisplayMessageModule} from "../../../components/display-message/display-message.module";

@NgModule({
  declarations: [ PostComponent ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        SlickCarouselModule,
        DisplayMessageModule
    ]
})
export class PostModule { }
