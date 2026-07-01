import { Directive, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  host:{
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
    '(focus)': 'show()',
    '(blur)': 'hide()',
  }
})
export class TooltipDirective {
  readonly appTooltip = input<string | undefined>("");
  
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private tooltipElement: HTMLElement | null = null;

  show(): void{
    const tooltipText = this.appTooltip(); 
    if (!tooltipText) return;

    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipElement, 'app-tooltip');

    const textNode = this.renderer.createText(tooltipText);
    this.renderer.appendChild(this.tooltipElement, textNode);

    this.renderer.appendChild(document.body, this.tooltipElement);

    this.setPosition();
  }

  hide(): void{
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }

  private setPosition() {
    if (!this.tooltipElement) return;

    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement.getBoundingClientRect();

    const top = hostPos.top - tooltipPos.height - 10;
    const left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;

    this.renderer.setStyle(this.tooltipElement, 'top', `${top + window.scrollY}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left + window.scrollX}px`);
  }
}
