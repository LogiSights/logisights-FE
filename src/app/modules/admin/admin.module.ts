import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { BaseChartDirective } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';
const routes: Routes = [
  { path: '', component: AdminDashboardComponent }
];

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgChartsModule
    // BaseChartDirective
  ]
})
export class AdminModule { }
