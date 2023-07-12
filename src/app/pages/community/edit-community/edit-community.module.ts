import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared.module';
import { RouterModule } from '@angular/router';
import {EditCommunityComponent} from "./edit-community.component";
import {PostDisplayModule} from "../../../components/post-display/post-display.module";
import {UserDisplayModule} from "../../../components/user-display/user-display.module";
import {SearchBarModule} from "../../../components/search-bar/search-bar.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [ EditCommunityComponent ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    SlickCarouselModule,
    PostDisplayModule,
    UserDisplayModule,
    SearchBarModule,
  ]
})
export class EditCommunityModule { }
