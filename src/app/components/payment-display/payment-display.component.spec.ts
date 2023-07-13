import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDisplayComponent } from './payment-display.component';

describe('PaymentDisplayComponent', () => {
  let component: PaymentDisplayComponent;
  let fixture: ComponentFixture<PaymentDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentDisplayComponent]
    });
    fixture = TestBed.createComponent(PaymentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
