import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatExpansionModule} from "@angular/material/expansion";
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
  ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatExpansionModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
