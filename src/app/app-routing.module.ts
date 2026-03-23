import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule) },
  { path: '', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'sender', loadChildren: () => import('./modules/sender/sender.module').then(m => m.SenderModule), canActivate: [authGuard], data: { roles: ['SENDER'] } },
  { path: 'driver', loadChildren: () => import('./modules/driver/driver.module').then(m => m.DriverModule), canActivate: [authGuard], data: { roles: ['DRIVER'] } },
  { path: 'pickup', loadChildren: () => import('./modules/pickup/pickup.module').then(m => m.PickupModule), canActivate: [authGuard], data: { roles: ['PICKUP'] } },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), canActivate: [authGuard], data: { roles: ['ADMIN'] } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
