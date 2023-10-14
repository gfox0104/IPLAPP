import { Component, OnInit } from '@angular/core';
import { AccountPayableAgingSummaryService } from './account-payable-aging-summary-service.service';
import { process, State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { finalize } from 'rxjs/operators';
import { ReportFilter } from '../report-filter.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-payable-aging-summary',
  templateUrl: './account-payable-aging-summary.component.html',
  styleUrls: ['./account-payable-aging-summary.component.scss'],
})
export class AccountPayableAgingSummaryComponent implements OnInit {
  constructor(
    public AccountPayableAgingSummaryService: AccountPayableAgingSummaryService
  ) {}
  IsLoadAccountPayable: boolean = false;
  IsPDFGenerate: boolean = false;
  AccountPayable;
  Filter: ReportFilter = new ReportFilter();
  CurrentDate: Date = new Date();
  ngOnInit() {
    const self = this;
    self.getAccountPayable();
  }
  getAccountPayable() {
    const self = this;
    self.IsLoadAccountPayable = true;
    self.AccountPayableAgingSummaryService.GetAccountPayable(this.Filter)
      .pipe(finalize(() => (self.IsLoadAccountPayable = false)))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          self.AccountPayable = result.Data;
        }
      });
  }
  
  blob: any;
  getAccountPayablePDF() {
    const self = this;
    self.IsPDFGenerate = true;
    this.Filter.ReportsType = 2;
    self.AccountPayableAgingSummaryService.GetAccountPayablePDF(this.Filter)
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
            let GetName = 'Account Payable';
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
