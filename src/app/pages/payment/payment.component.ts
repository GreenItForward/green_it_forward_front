import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StripeCardElement, StripeCardElementChangeEvent, StripeCardElementOptions, StripeElements, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeService } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { Location } from '@angular/common';

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
  paidAmount: number | null = null;
  paidAt: string | null = null;
  paidBy: string | null = null;
  last4: string | undefined;
  name: string | undefined;
  postalCode: string | undefined;
  brandCard: string | undefined;
  amount: number | undefined;
  currency: string | undefined;
  status: string | undefined;
  project: Project | undefined;
  id: string;
  token: string | null = null;
  headers: HttpHeaders | null = null;
  options: {headers: HttpHeaders};
  background: string;


constructor(private fb: FormBuilder, private stripeService: StripeService, private http: HttpClient, 
  private route: ActivatedRoute, private projectService: ProjectService, private commonService: CommonService,
  private location: Location) {
  this.paymentForm = this.fb.group({ });
  this.cardOptions = { };
  this.elementsOptions = { };
  this.errorMessage = '';
  this.successMessage = '';
  this.paidAmount = null;
  this.paidAt = null;
  this.paidBy = null;
  this.last4 = undefined;
  this.name = undefined;
  this.postalCode = undefined;
  this.brandCard = undefined;
  this.token = this.commonService.getLocalStorageItem('token');
  this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  this.options = { headers: this.headers };
  this.background = '';
}

  async ngOnInit() {
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

    const routeId = this.route.snapshot.paramMap.get('id');
    try {
      this.project = await this.projectService.getProject(routeId);
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      this.commonService.navigate("/not-found");
      return;
    }

    if(this.project.endDate && moment(this.project.endDate).isBefore(moment())) {
      this.errorMessage = "Ce projet est terminé.";
      this.commonService.navigateToErrorPage("Ce projet est terminé, vous ne pouvez plus faire de don pour ce projet.");
    }

  }

  async onSubmit() {
    if (this.paymentForm.invalid) {
      return;
    }

    let { name, amount } = this.paymentForm.value;

    name = name.trim();
    let projectId = this.project?.id;

    let paymentIntent;
    try {
      paymentIntent = await lastValueFrom(this.http.post<{ clientSecret: string }>(`${environment.apiUrl}/payments/create-payment-intent`, { amount, projectId }, this.options));
    } catch (error : any) {
      this.errorMessage = 'Une erreur inattendue est survenue lors de la création de l\'intention de paiement.';
      return;
    }
    
    
    if (!this.card) {
      this.errorMessage = "Une erreur est survenue lors du paiement";
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
          this.successMessage = "Paiement effectué avec succès";
          this.paidAmount = amount;
          this.paidAt = moment().format('DD/MM/YYYY à HH:mm:ss');
          this.paidBy = name;

          const paymentMethodId = updatedPaymentIntent.payment_method as string;
          const headers = {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          };

          this.http.get<any>(`${environment.apiUrl}/payments/payment-method/${paymentMethodId}`, { headers }).subscribe(paymentMethod => {
            this.last4 = paymentMethod.last4;
            this.name = paymentMethod.name;
            this.postalCode = paymentMethod.address.postal_code;
            this.brandCard = paymentMethod.brand;

          });

          this.http.get<any>(`${environment.apiUrl}/payments/payment-intent/${updatedPaymentIntent.id}`, { headers }).subscribe(paymentIntent => {
            this.amount = paymentIntent.amount;
            this.status = paymentIntent.status;
            this.currency = paymentIntent.currency;
          });



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

  onChange(event: any) {
    this.errorMessage = '';
    this.successMessage = '';
  }


  downloadInvoice() {
    const amount = this.amount ? this.amount / 100 : 0;

    if (this.paidAmount !== amount || this.name !== this.paidBy) {
      console.error("Payment not done");
      this.errorMessage = "Paiement non effectué";
      this.successMessage = '';
      return;
    }

    this.http.get(`${environment.apiUrl}/invoice/create-payment-intent/${this.name}/${amount}`, {
      ...this.options,
      params: {
        date: this.paidAt ? this.paidAt : moment().format('DD/MM/YYYY à HH:mm:ss'),
        last4: this.last4 ? this.last4 : '',
        brand: this.brandCard ? this.brandCard : '',
        project: this.project ? this.project.name : '',
      },

      responseType: 'blob',
    }).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'recu_wwf_' + moment().format('DD_MM_YYYY') + '.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

  }

  goBack(): void {
    this.location.back();
  }

}
