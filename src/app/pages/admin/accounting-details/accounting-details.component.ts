import { Component, OnInit } from '@angular/core';
import { AccountDetailLinks } from './accounting-detail-link';

@Component({
  templateUrl: './accounting-details.component.html',
})
export class AccountingComponent implements OnInit {
  accountDetailLinks = AccountDetailLinks;
  constructor() {}

  ngOnInit() {}
}
