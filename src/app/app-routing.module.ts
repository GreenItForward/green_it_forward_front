import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AdminComponent } from './pages/admin/index/index.component';
import { GestionComponent } from './pages/admin/gestion/gestion.component';
import { StatsComponent } from './pages/admin/stats/stats.component';


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
  // admin routes
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'admin/gestion',
    component: GestionComponent
  },
  {
    path: 'admin/statistics',
    component: StatsComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
