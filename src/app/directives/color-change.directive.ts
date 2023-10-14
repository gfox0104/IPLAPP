import { Directive, ElementRef, HostListener, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[AppTestDir]'
})

export class ColorDirective {
  constructor(private el: ElementRef, private rendere: Renderer2) { }

  @HostBinding('style.backgroundColor') bgColor = 'orange';

  @HostListener('click') myClick() {
    this.bgColor = 'blue';
  }
}
