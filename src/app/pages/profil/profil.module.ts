import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from './profil.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ProfilComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    SharedModule,
    ScrollingModule,
    MatIconModule
  ]
})
export class ProfilModule { }
 