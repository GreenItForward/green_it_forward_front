import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from './profil.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIconModule } from '@angular/material/icon';
import { EditProfileDialogComponent } from 'src/app/components/edit-profile-dialog/edit-profile-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProfilComponent,
    EditProfileDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    SharedModule,
    ScrollingModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class ProfilModule { }
 