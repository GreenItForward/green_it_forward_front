import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared.module';
import { RouterModule } from '@angular/router';
import {CommunityFormComponent} from "./community-form.component";
import {PostDisplayModule} from "../../../components/post-display/post-display.module";
import {UserDisplayModule} from "../../../components/user-display/user-display.module";
import {SearchBarModule} from "../../../components/search-bar/search-bar.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [ CommunityFormComponent ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    SlickCarouselModule,
    PostDisplayModule,
    UserDisplayModule,
    SearchBarModule,
    FormsModule,
  ]
})
export class CommunityFormModule { }
