import { ResetPasswordModule } from './pages/reset-password/reset-password.module';
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
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectsModule } from './pages/projects/projects/projects.module';
import { ProjectModule } from './pages/projects/project/project.module';
import { ConfirmationModule } from './pages/confirmation/confirmation.module';
import { ProfilModule } from './pages/profil/profil.module';
import {CommunityModule} from "./pages/community/community/community.module";
import {CommunitiesModule} from "./pages/community/communities/communities.module";
import {CommunityCardModule} from "./components/community-card/community-card.module";
import { CommonModule } from '@angular/common';
import {PostModule} from "./pages/community/post/post.module";
import {PostDisplayModule} from "./components/post-display/post-display.module";
import {UserDisplayModule} from "./components/user-display/user-display.module";
import {SearchBarModule} from "./components/search-bar/search-bar.module";
import {DisplayMessageModule} from "./components/display-message/display-message.module";
import {CommunityFormModule} from "./pages/community/community-form/community-form.module";
import {PostCreateModalModule} from "./components/post-create-modal/post-create-modal.module";
import {EditCommunityModule} from "./pages/community/edit-community/edit-community.module";
import {SelectionModalModule} from "./components/selection-modal/selection-modal.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    CommonModule,
    SearchBarModule,
    DisplayMessageModule,
    CommunityFormModule,
    PostModule,
    PostCreateModalModule,
    EditCommunityModule,
    SelectionModalModule,
    PostDisplayModule,
    UserDisplayModule,
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
    CommunityModule,
    CommunitiesModule, 
    CommunityCardModule,
    ConfirmationModule,
    ProfilModule,
    ResetPasswordModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
