import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionComponent } from './gestion/gestion.component';
import { AdminComponent } from './dashboard/dashboard.component';
import { StatsComponent } from './stats/stats.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'gestion',
    component: GestionComponent
  },
  {
    path: 'statistics',
    component: StatsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdminRoutingModule { }
