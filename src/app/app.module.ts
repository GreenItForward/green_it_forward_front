import { NotFoundModule } from './pages/not-found/not-found.module';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentComponent } from './pages/payment/payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { HomeModule } from './pages/home/home.module';
import { SharedModule } from './shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
  ], 
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(environment.stripePublicKey),
    HttpClientModule,
    HomeModule,
    NotFoundModule,
    SlickCarouselModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
