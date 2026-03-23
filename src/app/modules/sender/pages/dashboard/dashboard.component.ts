import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Parcel, ParcelStatus } from '../../../../core/models';
import { ToastService } from '../../../../shared/services/toast.service';
import { ColumnConfig } from '../../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Wizard state
  currentStep = 1;
  parcelForm: FormGroup;
  isSubmitting = false;

  // Mock data
  activeParcel: Parcel | null = null;
  parcelHistory: Parcel[] = [];

  tableColumns: ColumnConfig[] = [
    { key: 'id', label: 'Tracking ID' },
    { key: 'destination', label: 'Destination' },
    { key: 'dateCreated', label: 'Date' },
    { key: 'weight', label: 'Weight (kg)' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'action', label: 'Action', type: 'action' }
  ];

  trackingSteps = ['Booked', 'Collected', 'In Transit', 'Out for Delivery', 'Delivered'];
  currentTrackingStep = 2; // In Transit

  constructor(private fb: FormBuilder, private toast: ToastService) {
    this.parcelForm = this.fb.group({
      weight: [1, Validators.required],
      dimensions: ['Small (Box)', Validators.required],
      type: ['Standard', Validators.required],
      recipientName: ['', Validators.required],
      recipientPhone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      pickupPoint: ['']
    });
  }

  ngOnInit() {
    // Generate mock history
    this.parcelHistory = [
      { id: 'KE-00123', senderId: 'u1', recipientName: 'Jane Doe', recipientPhone: '1234', destination: 'Nairobi', city: 'Nairobi', weight: 2, status: 'IN_TRANSIT', dateCreated: new Date() },
      { id: 'KE-00124', senderId: 'u1', recipientName: 'John Smith', recipientPhone: '5678', destination: 'Mombasa', city: 'Mombasa', weight: 5, status: 'DELIVERED', dateCreated: new Date(Date.now() - 86400000) },
      { id: 'KE-00125', senderId: 'u1', recipientName: 'Alice K', recipientPhone: '9012', destination: 'Kisumu', city: 'Kisumu', weight: 1.5, status: 'PENDING', dateCreated: new Date(Date.now() - 86400000 * 2) }
    ];
    this.activeParcel = this.parcelHistory[0];
  }

  nextStep() {
    if (this.currentStep < 3) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  confirmAndPay() {
    if (this.parcelForm.invalid) {
      this.toast.error('Please fill all required fields');
      return;
    }
    
    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.toast.success('Parcel booked successfully! ID: KE-00' + Math.floor(Math.random() * 1000));
      this.currentStep = 1;
      this.parcelForm.reset({ weight: 1, dimensions: 'Small (Box)', type: 'Standard' });
    }, 1500);
  }

  getCostEstimate(): number {
    const weight = this.parcelForm.get('weight')?.value || 1;
    const base = 200; // Ksh 200 base
    return base + (weight * 50);
  }
}
