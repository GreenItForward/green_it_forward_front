import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared.module';
import { RouterModule } from '@angular/router';
import {PostComponent} from "./post.component";
import {DisplayMessageModule} from "../../../components/display-message/display-message.module";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ PostComponent ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        SlickCarouselModule,
        FormsModule,
        DisplayMessageModule
    ]
})
export class PostModule { }
