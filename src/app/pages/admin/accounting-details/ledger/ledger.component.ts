import { Component, OnInit } from '@angular/core';
import { LedgerServices } from './ledger-service';

import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { finalize } from 'rxjs/operators';
@Component({
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss'],
})
export class LedgerComponent implements OnInit {
  constructor(private ledgerServices: LedgerServices) {}
  LedgerList;
  IsLoad: boolean = false;
  ngOnInit(): void {
    const self = this;
    self.IsLoad = true;
    self.ledgerServices
      .Getall()
      .pipe(finalize(() => (self.IsLoad = false)))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          result.Data.forEach((element) => {
            element.LedgH_Date = new Date(element.LedgH_Date);
          });
          self.LedgerList = result.Data;
        }
      });
  }

  public state: State = {};
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
}
