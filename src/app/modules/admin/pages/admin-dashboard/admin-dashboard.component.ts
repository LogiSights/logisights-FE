import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ToastService } from '../../../../shared/services/toast.service';
import { ColumnConfig } from '../../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Stats
  totalUsers = 12543;
  activeDrivers = 450;
  parcelsToday = 3290;
  revenueToday = 450200;

  // User Table
  userColumns: ColumnConfig[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', type: 'badge' },
    { key: 'status', label: 'Status' },
    { key: 'joined', label: 'Joined Date' },
    { key: 'action', label: 'Action', type: 'action' }
  ];
  usersData: any[] = [];
  activeTab = 'ALL';

  // System Health
  services = [
    { name: 'Tracking Service', status: 'operational', icon: 'check_circle', color: 'success' },
    { name: 'Payment Service', status: 'operational', icon: 'check_circle', color: 'success' },
    { name: 'Notification Service', status: 'degraded', icon: 'warning', color: 'warning' },
    { name: 'Map Routing Engine', status: 'operational', icon: 'check_circle', color: 'success' }
  ];

  /* Charts Config */
  // 1. Line Chart (Deliveries last 30 days)
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40, 70, 90, 100, 120, 110, 150, 140, 130, 200],
        label: 'Deliveries',
        backgroundColor: 'rgba(26,107,255,0.1)',
        borderColor: '#1A6BFF',
        pointBackgroundColor: '#1A6BFF',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#1A6BFF',
        fill: 'origin',
      }
    ],
    labels: ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '23', '25', '27', '29', '30']
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: { line: { tension: 0.4 } },
    responsive: true,
    scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(26,107,255,0.05)' } } }
  };
  public lineChartType: ChartType = 'line';

  // 2. Doughnut Chart (Status Breakdown)
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Delivered', 'In Transit', 'Pending', 'Failed'],
    datasets: [{
      data: [350, 450, 100, 50],
      backgroundColor: ['#22C55E', '#1A6BFF', '#F59E0B', '#EF4444'],
      borderWidth: 0
    }]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // 3. Bar Chart (Top Cities)
  public barChartData: ChartData<'bar'> = {
    labels: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
    datasets: [
      { data: [6500, 2400, 1800, 900, 600], label: 'Volume', backgroundColor: '#1A6BFF', borderRadius: 8 }
    ]
  };
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(26,107,255,0.05)' } } }
  };
  public barChartType: ChartType = 'bar';

  constructor(private toast: ToastService) {}

  ngOnInit() {
    this.usersData = [
      { name: 'Peter Karanja', email: 'peter@example.com', role: 'DRIVER', status: 'Active', joined: '12 Jan 2026' },
      { name: 'Alice Wakesho', email: 'alice@example.com', role: 'SENDER', status: 'Active', joined: '15 Jan 2026' },
      { name: 'Bazaar Hub', email: 'hub@bazaar.co.ke', role: 'PICKUP', status: 'Active', joined: '20 Feb 2026' },
      { name: 'John Doe', email: 'johndoe@example.com', role: 'DRIVER', status: 'Suspended', joined: '10 Mar 2026' }
    ];
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  getFilteredUsers() {
    if (this.activeTab === 'ALL') return this.usersData;
    return this.usersData.filter(u => u.role === this.activeTab);
  }
}
