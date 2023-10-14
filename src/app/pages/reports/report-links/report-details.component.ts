import { Component } from '@angular/core';
import { ReportLinks } from './report-page-link';
@Component({
  templateUrl: './report-details.component.html'
})

export class ReportsComponent {
  reportLinks = ReportLinks;
  constructor(){
    
 }
 
   ngOnInit() {
 
   }
}
