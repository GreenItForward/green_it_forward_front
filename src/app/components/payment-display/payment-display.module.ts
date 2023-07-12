import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentDisplayComponent } from './payment-display.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PaymentDisplayComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PaymentDisplayComponent
  ]
})
export class PaymentDisplayModule { }
