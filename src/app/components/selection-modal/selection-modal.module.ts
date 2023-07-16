import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared.module';
import { RouterModule } from '@angular/router';
import {SelectionModalComponent} from "./selection-modal.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { FormsModule } from '@angular/forms';
import {PostDisplayModule} from "../post-display/post-display.module";
import {CommunityCardModule} from "../community-card/community-card.module";
import {UserDisplayModule} from "../user-display/user-display.module";

@NgModule({
  declarations: [SelectionModalComponent],
  exports: [
    SelectionModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    SlickCarouselModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    PostDisplayModule,
    CommunityCardModule,
    UserDisplayModule
  ]
})
export class SelectionModalModule { }
