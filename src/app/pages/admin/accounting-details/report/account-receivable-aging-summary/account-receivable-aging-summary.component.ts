import { Component, OnInit } from '@angular/core';
import { AccountReceivableAgingSummaryService } from './account-receivable-aging-summary-service.service';
import { process, State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { finalize } from 'rxjs/operators';
import { ReportFilter } from '../report-filter.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-receivable-aging-summary',
  templateUrl: './account-receivable-aging-summary.component.html',
  styleUrls: ['./account-receivable-aging-summary.component.scss'],
})
export class AccountReceivableAgingSummaryComponent implements OnInit {
  constructor(
    public AccountReceivableAgingSummaryService: AccountReceivableAgingSummaryService
  ) {}
  IsLoadAccountPayable: boolean = false;
  IsPDFGenerate: boolean = false;
  AccountPayable;
  Filter: ReportFilter = new ReportFilter();
  CurrentDate: Date = new Date();
  ngOnInit() {
    const self = this;
    self.getAccountReceivable();
  }
  getAccountReceivable() {
    const self = this;
    self.IsLoadAccountPayable = true;
    self.AccountReceivableAgingSummaryService.GetAccountReceivable(this.Filter)
      .pipe(finalize(() => (self.IsLoadAccountPayable = false)))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          self.AccountPayable = result.Data;
        }
      });
  }
 
  blob: any;
  getAccountReceivablePDF() {
    const self = this;
    self.IsPDFGenerate = true;
    this.Filter.ReportsType = 2;
    self.AccountReceivableAgingSummaryService.GetAccountReceivablePDF(
      this.Filter
    )
      .pipe(finalize(() => (self.IsPDFGenerate = false)))
      .subscribe((result) => {
        if (result != null) {
          if (result != null) {
            this.blob = new Blob([result], {
              type: 'application/pdf',
            });

            var downloadURL = window.URL.createObjectURL(result);
            var link = document.createElement('a');
            link.href = downloadURL;
            let GetName = 'Account Receivable';
            if (GetName != null) {
              link.download = GetName + '.pdf';
            }
            link.click();
            
          } else {
          }
        }
      });
  }
}
