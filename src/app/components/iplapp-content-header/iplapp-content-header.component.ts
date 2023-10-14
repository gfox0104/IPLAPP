import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'iplapp-content-header',
  template: `
              <div class="row m-0 module-box-header pr-1">
                <h4 class="page-title" style="font-weight: bolder;padding-left: 12px;">{{title}}</h4>
                <hr>
                <button class="btn btn-primary ml-1" (click)="onClick(button)" *ngFor="let button of buttons">
                  <i [ngClass]="[button.iclass, 'mr-1']"></i>
                  {{button.title}}
                </button>
              </div>
  `
})

export class IplAppContentHeader {
  @Input() title;
  @Input() buttons;
  @Output() clickButton = new EventEmitter();

  constructor(private router: Router) { }

  onClick(button) {
    // debugger;
    if (button.routerLink) {
      this.router.navigate([button.routerLink]);
    } else {
      this.clickButton.emit(button.title);
    }
  }
}
