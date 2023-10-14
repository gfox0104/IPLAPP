import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'iplapp-support-icon',
  template: `
              <a class="text-center" [routerLink]="[routerLink]">
                <img src ="{{image}}" style = "width: 56px;">
                <span>{{stitle}}</span>
              </a>
            `,
})

export class IplAppSupportIcon {
  @Input() image;
  @Input() stitle;
  @Input() routerLink;

  @HostBinding('class.icons') true;
}
