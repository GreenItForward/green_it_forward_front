import { NotFoundModule } from './pages/not-found/not-found.module';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { HomeModule } from './pages/home/home.module';
import { SharedModule } from './shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatExpansionModule } from "@angular/material/expansion";
import { AdminModule } from './pages/admin/admin.module';
import { PaymentModule } from './pages/payment/payment.module';
import { AuthModule } from './pages/auth/auth.module';
import { ResetPwdComponent } from './pages/reset-pwd/reset-pwd.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectsModule } from './pages/projects/projects/projects.module';
import { ProjectModule } from './pages/projects/project/project.module';
import { ConfirmationModule } from './pages/confirmation/confirmation.module';

@NgModule({
  declarations: [
    AppComponent,
    ResetPwdComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
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
    HttpClientModule,
    MatExpansionModule,
    HomeModule,
    NotFoundModule,
    ProjectsModule,
    ProjectModule,
    AdminModule,
    PaymentModule,
    AuthModule,
    SlickCarouselModule,
    ReactiveFormsModule,
    ConfirmationModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
