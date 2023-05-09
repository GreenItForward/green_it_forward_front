import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxStripeModule, StripeService } from 'ngx-stripe';
import { PaymentComponent } from './payment.component';
import { environment } from 'src/environments/environment';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, NgxStripeModule.forRoot(environment.stripePublicKey)],
      declarations: [PaymentComponent],
      providers: [StripeService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when fields are empty', () => {
    expect(component.paymentForm.valid).toBeFalsy();
  });

  it('should have invalid form when amount is negative', () => {
    component.paymentForm.controls['name'].setValue('test');
    component.paymentForm.controls['amount'].setValue(-1);
    expect(component.paymentForm.valid).toBeFalsy();
  });

  it('should have invalid form when amount is zero', () => {
    component.paymentForm.controls['name'].setValue('test');
    component.paymentForm.controls['amount'].setValue(0);
    expect(component.paymentForm.valid).toBeFalsy();
  });

  it('should have valid form when fields are filled', () => {
    component.paymentForm.controls['name'].setValue('test');
    component.paymentForm.controls['amount'].setValue(10);
    expect(component.paymentForm.valid).toBeTruthy();
  });
  
});