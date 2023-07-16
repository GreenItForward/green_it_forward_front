import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared.module';
import { RouterModule } from '@angular/router';
import {PostCreateModalComponent} from "./post-create-modal.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostCreateModalComponent],
  exports: [
    PostCreateModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    SlickCarouselModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule
  ]
})
export class PostCreateModalModule { }
