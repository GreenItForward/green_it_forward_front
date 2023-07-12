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
import { SettingProfileDialogComponent } from 'src/app/components/setting-profile-dialog/setting-profile-dialog.component';
import { PaymentDisplayModule } from 'src/app/components/payment-display/payment-display.module';



@NgModule({
  declarations: [
    ProfilComponent,
    EditProfileDialogComponent,
    SettingProfileDialogComponent
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
    ReactiveFormsModule,
    PaymentDisplayModule
  ]
})
export class ProfilModule { }
 