import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionComponent } from './gestion/gestion.component';
import { AdminComponent } from './dashboard/dashboard.component';
import { StatsComponent } from './stats/stats.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { SidebarComponent } from 'src/app/components/admin/sidebar/sidebar.component';
import { AdminHeaderComponent } from 'src/app/components/admin/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
     SidebarComponent, AdminHeaderComponent, GestionComponent, AdminComponent, StatsComponent],
  imports: [
    CommonModule,
    HighchartsChartModule,
    RouterModule
  ]
})
export class AdminModule { }
