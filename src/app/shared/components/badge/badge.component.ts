import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  template: `
    <span class="badge" [ngClass]="status">
      <span class="dot"></span>
      {{ label | titlecase }}
    </span>
  `,
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  @Input() status: 'delivered' | 'in-transit' | 'pending' | 'failed' | string = 'pending';
  @Input() label: string = '';
}
