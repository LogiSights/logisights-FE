import { Component } from '@angular/core';
import { ToastService, ToastMessage } from '../../services/toast.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(50px) scale(0.95)' }),
          stagger(100, [
            animate('0.3s cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 1, transform: 'translateX(0) scale(1)' }))
          ])
        ], { optional: true }),
        query(':leave', [
          animate('0.2s cubic-bezier(0.4, 0.0, 1, 1)', style({ opacity: 0, transform: 'translateX(50px) scale(0.95)' }))
        ], { optional: true })
      ])
    ])
  ]
})
export class ToastComponent {
  toasts$ = this.toastService.toasts$;

  constructor(private toastService: ToastService) {}

  dismiss(id: number) {
    this.toastService.remove(id);
  }

  getIcon(type: string): string {
    switch(type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'info': default: return 'info';
    }
  }
}
