import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DriverDashboardComponent } from './pages/driver-dashboard/driver-dashboard.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: DriverDashboardComponent }
];

@NgModule({
  declarations: [DriverDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DriverModule { }
