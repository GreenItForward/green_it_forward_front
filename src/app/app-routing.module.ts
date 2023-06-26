import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AdminComponent } from './pages/admin/dashboard/dashboard.component';
import { GestionComponent } from './pages/admin/gestion/gestion.component';
import { StatsComponent } from './pages/admin/stats/stats.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ResetPwdComponent } from './pages/reset-pwd/reset-pwd.component';


const routes : Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    component: AuthComponent
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
    component: ProjectsComponent
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
  },
  {
    path: 'reset-pwd',
    component: ResetPwdComponent
  },
  /* LAST ROUTE */
  {
    path: '**',
    component: NotFoundComponent
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
