import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StripeCardElement, StripeCardElementChangeEvent, StripeCardElementOptions, StripeElements, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeService } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  cardOptions: StripeCardElementOptions;
  elementsOptions: StripeElementsOptions;
  card?: StripeCardElement;
  errorMessage: string;
  successMessage: string;

constructor(private fb: FormBuilder, private stripeService: StripeService, private http: HttpClient) {
  this.paymentForm = this.fb.group({ });
  this.cardOptions = { };
  this.elementsOptions = { };
  this.errorMessage = '';
  this.successMessage = '';
}

  ngOnInit() {    
    this.paymentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl(10, [Validators.required, Validators.min(1)]),
    });

    this.cardOptions = {
      style: {
        base: {
          iconColor: '#666EE8',
          color: '#31325F',
          lineHeight: '40px',
          fontWeight: 300,
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSize: '18px',
          '::placeholder': {
            color: '#CFD7E0'
          }
        }
      }
    };

    this.elementsOptions = {
      locale: 'fr'
    };

    this.stripeService.elements(this.elementsOptions).subscribe(elements => {
      this.card = elements.create('card', this.cardOptions);
      this.card.mount('#card-element');
      this.card.on('change', this.cardHandler.bind(this));
    });
  }

  async onSubmit() {
    if (this.paymentForm.invalid) {
      return;
    }

    const { name, amount } = this.paymentForm.value; 
    const paymentIntent = await lastValueFrom(this.http.post<{ clientSecret: string }>(`${environment.apiUrl}/payments/create-payment-intent`, { amount }));
  
  
    if (!this.card) {
      console.error("Card not initialized");
      return;
    }
    if (paymentIntent && paymentIntent.clientSecret) {
      this.stripeService.confirmCardPayment(paymentIntent.clientSecret, {
        payment_method: {
          card: this.card,
          billing_details: {
            name, 
          },
        },
      }).subscribe(async ({ error, paymentIntent: updatedPaymentIntent }) => {
        if (error) {
          this.errorMessage = error.message ? error.message : '';
        } else if (updatedPaymentIntent && updatedPaymentIntent.status === 'succeeded') {
          this.successMessage = "Paiement effectué avec succès"
        } else {
          this.errorMessage = updatedPaymentIntent.status;

        }
      });
    } else {
      console.error("Payment intent not initialized");
    }

  }

  cardHandler(event: StripeCardElementChangeEvent) {
    if (event.error) {
      this.errorMessage = event.error.message;
    } else {
      this.errorMessage = '';
      this.successMessage = '';
    }
  }

}
