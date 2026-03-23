import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText = '';
  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipText) return;
    
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.appendChild(this.tooltipElement, this.renderer.createText(this.tooltipText));
    
    // Minimal inline styling for the tooltip
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'background', 'var(--navy)');
    this.renderer.setStyle(this.tooltipElement, 'color', 'white');
    this.renderer.setStyle(this.tooltipElement, 'padding', '6px 10px');
    this.renderer.setStyle(this.tooltipElement, 'border-radius', '4px');
    this.renderer.setStyle(this.tooltipElement, 'font-size', '0.75rem');
    this.renderer.setStyle(this.tooltipElement, 'z-index', '1000');
    this.renderer.setStyle(this.tooltipElement, 'white-space', 'nowrap');
    this.renderer.setStyle(this.tooltipElement, 'box-shadow', '0 4px 6px rgba(0,0,0,0.1)');
    
    // Positioning
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    this.renderer.setStyle(this.tooltipElement, 'top', `${hostPos.bottom + window.scrollY + 8}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${hostPos.left + window.scrollX + (hostPos.width / 2)}px`);
    this.renderer.setStyle(this.tooltipElement, 'transform', 'translateX(-50%)');
    
    this.renderer.appendChild(document.body, this.tooltipElement);
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
