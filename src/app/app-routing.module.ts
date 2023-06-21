import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProjectsComponent } from './pages/projects/projects.component';


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
