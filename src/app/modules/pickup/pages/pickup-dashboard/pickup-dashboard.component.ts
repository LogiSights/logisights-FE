import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../../shared/services/toast.service';
import { ColumnConfig } from '../../../../shared/components/data-table/data-table.component';

interface InventoryItem {
  id: string;
  recipientName: string;
  phone: string;
  dateArrived: Date;
  daysWaiting: number;
  status: string;
}

interface ActivityEvent {
  time: Date;
  staff: string;
  action: string;
  parcelId: string;
  type: 'in' | 'out';
}

@Component({
  selector: 'app-pickup-dashboard',
  templateUrl: './pickup-dashboard.component.html',
  styleUrls: ['./pickup-dashboard.component.scss']
})
export class PickupDashboardComponent implements OnInit {
  checkInId = '';
  inventory: InventoryItem[] = [];
  activities: ActivityEvent[] = [];

  tableColumns: ColumnConfig[] = [
    { key: 'id', label: 'Tracking ID' },
    { key: 'recipientName', label: 'Recipient' },
    { key: 'phone', label: 'Phone' },
    { key: 'dateArrived', label: 'Date Arrived' },
    { key: 'daysWaiting', label: 'Days Waiting' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'action', label: 'Action', type: 'action' }
  ];

  constructor(private toast: ToastService) {}

  ngOnInit() {
    this.inventory = [
      { id: 'KE-2001', recipientName: 'Sarah J.', phone: '0712...', dateArrived: new Date(), daysWaiting: 0, status: 'pending' },
      { id: 'KE-1984', recipientName: 'Michael T.', phone: '0734...', dateArrived: new Date(Date.now() - 86400000 * 2), daysWaiting: 2, status: 'pending' },
      { id: 'KE-1900', recipientName: 'Evans K.', phone: '0799...', dateArrived: new Date(Date.now() - 86400000 * 4), daysWaiting: 4, status: 'failed' } // Overdue
    ];

    this.activities = [
      { time: new Date(Date.now() - 1200000), staff: 'You', action: 'Checked Out', parcelId: 'KE-1995', type: 'out' },
      { time: new Date(Date.now() - 3600000), staff: 'You', action: 'Checked In', parcelId: 'KE-2001', type: 'in' }
    ];
  }

  get awaitingCount() { return this.inventory.length; }
  get checkedInToday() { return 12; }
  get checkedOutToday() { return 45; }
  get overdueCount() { return this.inventory.filter(i => i.daysWaiting > 3).length; }

  onCheckIn() {
    if (!this.checkInId.trim()) {
      this.toast.error('Please enter a tracking ID');
      return;
    }
    
    // Simulate check-in
    const newItem: InventoryItem = {
      id: this.checkInId.toUpperCase(),
      recipientName: 'Walk-in Customer',
      phone: 'N/A',
      dateArrived: new Date(),
      daysWaiting: 0,
      status: 'pending'
    };
    
    this.inventory = [newItem, ...this.inventory];
    this.activities = [
      { time: new Date(), staff: 'You', action: 'Checked In', parcelId: newItem.id, type: 'in' },
      ...this.activities
    ];
    
    this.toast.success(`Parcel ${newItem.id} checked in successfully!`);
    this.checkInId = '';
  }
}
