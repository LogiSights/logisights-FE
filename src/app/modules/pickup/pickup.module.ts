import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PickupDashboardComponent } from './pages/pickup-dashboard/pickup-dashboard.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: PickupDashboardComponent }
];

@NgModule({
  declarations: [PickupDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PickupModule { }
