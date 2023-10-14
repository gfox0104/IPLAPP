import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'iplapp-report-icon',
  template: `
              <a class="text-center" [routerLink]="[routerLink]">
               <img src = "{{images}}" style="width: 56px;">
                <span>{{rtitle}}</span>
              </a>
            `,
})

export class IplAppReportsIcon {
  @Input() images;
  @Input() rtitle;
  @Input() routerLink;

  @HostBinding('class.icons') true;
}
