import { Component, OnInit } from '@angular/core';
import { ProfitLossDetailsServiceService } from './profit-loss-details-service.service';
import { process, State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { finalize } from 'rxjs/operators';
import { ReportFilter } from '../report-filter.model';

@Component({
  selector: 'app-profit-loss-details',
  templateUrl: './profit-loss-details.component.html',
  styleUrls: ['./profit-loss-details.component.scss'],
})
export class ProfitLossDetailsComponent implements OnInit {
  constructor(
    public ProfitLossDetailsServiceService: ProfitLossDetailsServiceService
  ) {}
  IsLoadProfitLossDetails: boolean = false;
  IsPDFGenerate: boolean = false;
  ProfitAndLossDetails;
  Filter: ReportFilter = new ReportFilter();
  OrdinaryIncomeExpensesIsShow: boolean = true;
  IncomeIsShow: boolean = true;
  SalesIsShow: boolean = true;
  OtherIncomeExpensesIsShow: boolean = true;
  ExpensesIsShow: boolean = true;
  CurrentDate: Date = new Date();
  ngOnInit() {
    const self = this;
    self.getProfitLossDetails();
  }
  getProfitLossDetails() {
    const self = this;
    self.IsLoadProfitLossDetails = true;
    self.ProfitLossDetailsServiceService.GetProfiAndLossDetails(this.Filter)
      .pipe(finalize(() => (self.IsLoadProfitLossDetails = false)))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          self.ProfitAndLossDetails = result.Data;
        }
      });
  }
  
  blob: any;
  getProfiAndLossDeatilsPDF() {
    const self = this;
    self.IsPDFGenerate = true;
    this.Filter.ReportsType = 7;
    self.ProfitLossDetailsServiceService.GetProfiAndLossDetailsPDF(this.Filter)
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
            let GetName = 'ProfitLossDetails';
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
