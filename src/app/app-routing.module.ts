import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ResetPwdComponent } from './pages/reset-pwd/reset-pwd.component';


const routes : Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: HomeComponent
  },
  {
    path: 'pages',
    component: HomeComponent
  },
  {
    path: 'project',
    component: HomeComponent
  },
  {
    path: 'community',
    component: HomeComponent
  },
  {
    path: 'profil',
    component: HomeComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'reset-pwd',
    component: ResetPwdComponent
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
