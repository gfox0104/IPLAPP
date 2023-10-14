import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'iplapp-icon-button',
  template: `
              <button class="btn btn-primary" (click)="onClick()">
                <i [ngClass]="[iclass, 'mr-1']"></i>
                {{title}}
              </button>
  `,
  styles: [ `
              :host {
                cursor: pointer;
              }
            `
          ]
})

export class IplAppIconButton {
  @Input() title;
  @Input() iclass;
  @Input() routerLink;
  @Input() param;
  @Output() clickButton = new EventEmitter();

  constructor(private router: Router) {}
 
  onClick() {
    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    } else {
      this.clickButton.emit(this.title);
    }
  }
}
