import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared.module';
import { RouterModule } from '@angular/router';
import {CommunityComponent} from "./community.component";
import {PostDisplayModule} from "../../../components/post-display/post-display.module";
import {UserDisplayModule} from "../../../components/user-display/user-display.module";
import {SearchBarModule} from "../../../components/search-bar/search-bar.module";

@NgModule({
  declarations: [ CommunityComponent ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    SlickCarouselModule,
    PostDisplayModule,
    UserDisplayModule,
    SearchBarModule,
  ]
})
export class CommunityModule { }
