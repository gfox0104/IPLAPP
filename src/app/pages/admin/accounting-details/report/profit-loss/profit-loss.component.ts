import { Component, OnInit } from '@angular/core';
import { ProfitLossServiceService } from './profit-loss-service.service';
import { finalize } from 'rxjs/operators';
import { ReportFilter } from '../report-filter.model';
@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.scss'],
})
export class ProfitLossComponent implements OnInit {
  constructor(public ProfitLossServiceService: ProfitLossServiceService) {}
  IsLoadProfitLoss: boolean = false;
  IsPDFGenerate: boolean = false;
  ProfitAndLoss;
  Filter: ReportFilter = new ReportFilter();
  IncomeIsShow: boolean = true;
  ExpensesIsShow: boolean = true;
  OtherIncomeIsShow: boolean = true;
  CurrentDate: Date = new Date();
  ngOnInit() {
    const self = this;
    self.getProfitLoss();
  }

  getProfitLoss() {
    const self = this;
    self.IsLoadProfitLoss = true;
    self.ProfitLossServiceService.GetProfiAndLoss(this.Filter)
      .pipe(finalize(() => (self.IsLoadProfitLoss = false)))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          self.ProfitAndLoss = result.Data;
        }
      });
  }
  
  blob: any;
  getProfiAndLossPDF() {
    const self = this;
    self.IsPDFGenerate = true;
    this.Filter.ReportsType = 2;
    self.ProfitLossServiceService.GetProfiAndLossPDF(this.Filter)
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
            let GetName = 'ProfitLoss';
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
