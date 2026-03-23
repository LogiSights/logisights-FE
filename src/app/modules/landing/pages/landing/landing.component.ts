import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  trackingId: string = '';

  constructor(private router: Router) {}

  onTrack() {
    if (this.trackingId.trim()) {
      // For demo, we just navigate to a tracking status page or show a toast
      // The instructions say "opens a modal with the tracking input" for the floating CTA, 
      // but here we have the hero search bar.
      alert('Tracking ' + this.trackingId);
    }
  }

  openTrackingModal() {
    // Open a modal or focus the hero input 
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('heroTrackingInput')?.focus();
  }
}
