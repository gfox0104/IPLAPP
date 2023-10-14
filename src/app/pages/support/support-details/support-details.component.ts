import { Component } from '@angular/core';
import { SupportLinks } from './support-page-link';
@Component({
  templateUrl: './support-details.component.html'
})

export class SupportComponent {
  supportLinks = SupportLinks;
  constructor(){
    
 }
 
   ngOnInit() {
 
   }
}
