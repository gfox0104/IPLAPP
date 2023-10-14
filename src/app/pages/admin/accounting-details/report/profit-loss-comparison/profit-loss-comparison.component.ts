import { Component, OnInit } from '@angular/core';
import { ProfitLossComparisonServiceService } from './profit-loss-comparison-service.service';
import { process, State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { finalize } from 'rxjs/operators';
import { ReportFilter } from '../report-filter.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-profit-loss-comparison',
  templateUrl: './profit-loss-comparison.component.html',
  styleUrls: ['./profit-loss-comparison.component.scss'],
})
export class ProfitLossComparisonComponent implements OnInit {
  constructor(
    public ProfitLossComparisonServiceService: ProfitLossComparisonServiceService
  ) {}
  IsLoadProfitLoss: boolean = false;
  IsPDFGenerate: boolean = false;
  ProfitAndLossComparison;
  Filter: ReportFilter = new ReportFilter();
  IncomeIsShow: boolean = true;
  ExpensesIsShow: boolean = true;
  CurrentDate: Date = new Date();
  OldStartDate: any = new DatePipe('en-US').transform(
    new Date(
      new Date(this.Filter.StartDate).getFullYear() - 1,
      new Date(this.Filter.StartDate).getMonth(),
      new Date(this.Filter.StartDate).getDate()
    ),
    'yyyy-MM-dd'
  );
  OldEndDate: any = new DatePipe('en-US').transform(
    new Date(
      new Date(this.Filter.EndDate).getFullYear() - 1,
      new Date(this.Filter.EndDate).getMonth(),
      new Date(this.Filter.EndDate).getDate()
    ),
    'yyyy-MM-dd'
  );
  ngOnInit() {
    const self = this;
    self.getProfitLossComparison();
  }

  getProfitLossComparison() {
    const self = this;
    self.OldStartDate = new DatePipe('en-US').transform(
      new Date(
        new Date(this.Filter.StartDate).getFullYear() - 1,
        new Date(this.Filter.StartDate).getMonth(),
        new Date(this.Filter.StartDate).getDate()
      ),
      'yyyy-MM-dd'
    );
    self.OldEndDate = new DatePipe('en-US').transform(
      new Date(
        new Date(this.Filter.EndDate).getFullYear() - 1,
        new Date(this.Filter.EndDate).getMonth(),
        new Date(this.Filter.EndDate).getDate()
      ),
      'yyyy-MM-dd'
    );
    self.IsLoadProfitLoss = true;
    self.ProfitLossComparisonServiceService.GetProfiAndLossComparison(
      this.Filter
    )
      .pipe(finalize(() => (self.IsLoadProfitLoss = false)))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          self.ProfitAndLossComparison = result.Data;
        }
      });
  }
 
  
  blob: any;
  getProfiAndLossComparisonPDF() {
    const self = this;
    self.IsPDFGenerate = true;
    this.Filter.ReportsType = 8;
    self.ProfitLossComparisonServiceService.GetProfiAndLossComparisonPDF(
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
            let GetName = 'ProfitLossComparison';
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
