import { Component, OnInit } from "@angular/core";

import { AdminLinks } from './admin-link';

@Component({
  templateUrl: "./admin-link.component.html"
})

export class AdminLinkPageComponent implements OnInit {

  adminLinks = AdminLinks;
  
  constructor(){
   //alert('hi');
}

  ngOnInit() {

  }
}
