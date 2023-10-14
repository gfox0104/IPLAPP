import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'iplapp-dashboard-icon',
  template: `
              <a class="box m-1 text-center" [routerLink]="[routerLink]">
              <img src = "{{images}}" style="width: 56px;">
                <span>{{title}}</span>
              </a>
            `,
            styles:[
              `
                
              
                @media(width: 1600px)
                {
                  .box{
                    width:70% !important;
                  }
                }
              `
      ]
})

export class IplAppDashboardIcon {
  @Input() images;
  @Input() title;
  @Input() routerLink;

  @HostBinding('class.icons') true;
}
