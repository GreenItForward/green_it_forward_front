import { ProjectsComponent } from './pages/projects/projects/projects.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ResetPwdComponent } from './pages/reset-pwd/reset-pwd.component';
import { ProjectComponent } from './pages/projects/project/project.component';
import { ProjectResolver } from './services/project-resolver.service';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';


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
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'project/:id',
    component: ProjectComponent,
    resolve: { project: ProjectResolver },
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
    path: 'payment/:id',
    component: PaymentComponent
  },
  {
    path: 'reset-pwd',
    component: ResetPwdComponent
  },
  {
    path: 'auth/confirm',
    component: ConfirmationComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin-routing.module').then(m => m.AdminRoutingModule)
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
