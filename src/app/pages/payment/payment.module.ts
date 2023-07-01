import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ PaymentComponent],
  imports: [
    CommonModule,
    NgxStripeModule.forRoot(environment.stripePublicKey),
    ReactiveFormsModule,
  ]
})
export class PaymentModule { }
