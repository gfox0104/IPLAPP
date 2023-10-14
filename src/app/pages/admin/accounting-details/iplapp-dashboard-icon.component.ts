import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'iplapp-dashboard-icon',
  template: `
              <a class="text-center" [routerLink]="[routerLink]">
              <img src = "{{images}}" style="width: 56px; ">
                <span>{{title}}</span>
              </a>
            `,
})

export class IplAppDashboardIcon {
  @Input() images;
  @Input() title;
  @Input() routerLink;

  @HostBinding('class.icons') true;
}
