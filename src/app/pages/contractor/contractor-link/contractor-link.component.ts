import { Component, OnInit } from "@angular/core";

import { ContractorLinks } from './contractor-link';

@Component({
  templateUrl: "./contractor-link.component.html"
})

export class ContractorLinkPageComponent implements OnInit {

  contractorLinks = ContractorLinks;
  
  constructor(){
}

  ngOnInit() {

  }
}
