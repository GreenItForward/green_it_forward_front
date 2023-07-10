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
import {CommunityComponent} from "./pages/community/community/community.component";
import {CommunitiesComponent} from "./pages/community/communities/communities.component";
import {CommunityResolver} from "./services/community-resolver.service";
import {PostComponent} from "./pages/community/post/post.component";
import {PostResolver} from "./services/post-resolver.service";
import {CommunityFormComponent} from "./pages/community/community-form/community-form.component";
import { ProfilComponent } from './pages/profil/profil.component';

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
    component: CommunitiesComponent
  },
  {
    path: 'community/create',
    component: CommunityFormComponent
  },
  {
    path: 'community/:id',
    component: CommunityComponent,
    resolve: { community: CommunityResolver },
  },
  {
    path: 'post/:id',
    component: PostComponent,
    resolve: { post: PostResolver },
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
  /* USER ROUTES */
  {
    path: 'user/profile',
    component: ProfilComponent
  },
  /* ADMIN ROUTES */
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
