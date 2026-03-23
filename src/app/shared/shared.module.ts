import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Material Imports
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BadgeComponent } from './components/badge/badge.component';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ToastComponent } from './components/toast/toast.component';
import { TooltipDirective } from './directives/tooltip.directive';

// Services
import { ToastService } from './services/toast.service';

const MODULES = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FormsModule,
  MatIconModule,
  MatMenuModule,
  MatBadgeModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatDividerModule,
  MatInputModule
];

const COMPONENTS = [
  NavbarComponent,
  SidebarComponent,
  BadgeComponent,
  StatCardComponent,
  DataTableComponent,
  ToastComponent,
  TooltipDirective
];

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    BadgeComponent,
    StatCardComponent,
    DataTableComponent,
    ToastComponent,
    TooltipDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    NavbarComponent,
    SidebarComponent,
    BadgeComponent,
    StatCardComponent,
    DataTableComponent,
    ToastComponent,
    TooltipDirective
  ],
  providers: [ToastService]
})
export class SharedModule { }
