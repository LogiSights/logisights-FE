import { Component, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() icon: string = '';
  @Input() change: any;
  
  displayValue: number = 0;
  private observer: IntersectionObserver;

  constructor(private el: ElementRef) {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.animateValue();
        this.observer.disconnect();
      }
    });
  }

  ngOnInit() {
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  animateValue() {
    const duration = 1000;
    const steps = 60;
    const stepTime = Math.abs(Math.floor(duration / steps));
    let current = 0;
    const increment = this.value / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= this.value) {
        this.displayValue = this.value;
        clearInterval(timer);
      } else {
        this.displayValue = Math.floor(current);
      }
    }, stepTime);
  }
}
