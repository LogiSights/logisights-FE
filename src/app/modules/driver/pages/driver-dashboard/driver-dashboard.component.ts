import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/auth.service';
import { ToastService } from '../../../../shared/services/toast.service';

interface DeliveryTask {
  id: string;
  recipientName: string;
  address: string;
  distance: string;
  timeWindow: string;
  status: 'pending' | 'picked_up' | 'in_transit' | 'delivered';
  history: ('pending' | 'picked_up' | 'in_transit' | 'delivered')[];
}

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.scss']
})
export class DriverDashboardComponent implements OnInit {
  isOnline = true;
  today = new Date();
  
  tasks: DeliveryTask[] = [];

  constructor(public auth: AuthService, private toast: ToastService) {}

  ngOnInit() {
    this.tasks = [
      { id: 'KE-101', recipientName: 'Alice K.', address: '42 Waiyaki Way, Nairobi', distance: '1.2 km', timeWindow: '14:00 - 15:00', status: 'pending', history: [] },
      { id: 'KE-102', recipientName: 'Bob M.', address: 'Ring Road Parklands', distance: '2.5 km', timeWindow: '15:30 - 16:30', status: 'pending', history: [] },
      { id: 'KE-103', recipientName: 'Charlie N.', address: 'Lavington Mall', distance: '4.8 km', timeWindow: '16:30 - 18:00', status: 'pending', history: [] },
      { id: 'KE-104', recipientName: 'Diana W.', address: 'Kilimani, Argwings', distance: '6.1 km', timeWindow: '18:00 - 19:30', status: 'pending', history: [] },
      { id: 'KE-105', recipientName: 'Eve S.', address: 'Ngong Road', distance: '8.0 km', timeWindow: '19:30 - 20:00', status: 'pending', history: [] }
    ];
  }

  get completedCount() { return this.tasks.filter(t => t.status === 'delivered').length; }
  get pendingCount() { return this.tasks.length - this.completedCount; }
  get earnings() { return this.completedCount * 150; }
  get totalDistance() { return 22.6; }

  toggleOnline() {
    this.isOnline = !this.isOnline;
    this.toast.info(this.isOnline ? 'You are now online' : 'You went offline');
  }

  advanceStatus(task: DeliveryTask) {
    if (!this.isOnline) {
      this.toast.error('You must be online to update status.');
      return;
    }

    if (!task.history) task.history = [];
    task.history.push(task.status);

    if (task.status === 'pending') {
      task.status = 'picked_up';
      this.toast.info(`Parcel ${task.id} Picked Up`);
    } else if (task.status === 'picked_up') {
      task.status = 'in_transit';
      this.toast.info(`Parcel ${task.id} In Transit`);
    } else if (task.status === 'in_transit') {
      task.status = 'delivered';
      this.toast.success(`Parcel ${task.id} Delivered!`);
    }
  }

  undoStatus(task: DeliveryTask) {
    if (task.history && task.history.length > 0) {
      const prev = task.history.pop()!;
      task.status = prev;
      this.toast.info(`Status reverted to ${this.getButtonLabel(prev)}`);
    }
  }

  getButtonLabel(status: string): string {
    switch (status) {
      case 'pending': return 'Mark Picked Up';
      case 'picked_up': return 'Mark In Transit';
      case 'in_transit': return 'Mark Delivered';
      case 'delivered': return 'Completed';
      default: return 'Action';
    }
  }

  getButtonClass(status: string): string {
    switch (status) {
      case 'pending': return 'btn-amber';
      case 'picked_up': return 'btn-blue';
      case 'in_transit': return 'btn-green';
      case 'delivered': return 'btn-disabled';
      default: return 'btn-primary';
    }
  }
}
