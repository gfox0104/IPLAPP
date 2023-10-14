import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[AlphanumericOnly]'
})

export class AlphanumericDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9a-zA-Z_ ]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
