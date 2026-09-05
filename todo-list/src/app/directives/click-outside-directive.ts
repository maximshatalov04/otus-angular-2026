import { Directive, ElementRef, HostListener, inject, output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  readonly #elementRef = inject(ElementRef);

  readonly appClickOutside = output<void>();

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const clickedInside = this.#elementRef.nativeElement.contains(event.target);
    
    if (!clickedInside) {
      this.appClickOutside.emit();
    }
  }
}
