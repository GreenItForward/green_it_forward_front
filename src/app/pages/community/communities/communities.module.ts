import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared.module';
import { RouterModule } from '@angular/router';
import {CommunitiesComponent} from "./communities.component";
import {CommunityCardModule} from "../../../components/community-card/community-card.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [ CommunitiesComponent ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    SlickCarouselModule,
    CommunityCardModule
  ]
})
export class CommunitiesModule { }
