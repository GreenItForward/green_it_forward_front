import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ AuthComponent ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class AuthModule { }
