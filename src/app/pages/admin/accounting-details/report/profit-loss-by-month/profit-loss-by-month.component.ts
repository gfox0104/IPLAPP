import { Component, OnInit } from '@angular/core';
import { ProfitLossByMonthServiceService } from './profit-loss-by-month-service.service';
import { finalize } from 'rxjs/operators';
import { ReportFilter } from '../report-filter.model';

@Component({
  selector: 'app-profit-loss-by-month',
  templateUrl: './profit-loss-by-month.component.html',
  styleUrls: ['./profit-loss-by-month.component.scss'],
})
export class ProfitLossByMonthComponent implements OnInit {
  constructor(
    public ProfitLossByMonthServiceService: ProfitLossByMonthServiceService
  ) {}
  IsLoadProfitLossByMonth: boolean = false;
  IsPDFGenerate: boolean = false;
  ProfitAndLossByMonth;
  Filter: ReportFilter = new ReportFilter();
  IncomeIsShow: boolean = false;
  ExpensesIsShow: boolean = false;
  OtherIncomeIsShow: boolean = false;
  CurrentDate: Date = new Date();
  SelectedMonthList: any[] = [];
  monthNames: any[] = [];
  SetMargin: any = '';
  ngOnInit() {
    const self = this;
    self.getProfitLossByMonth();

    
  }

  getProfitLossByMonth() {
    const self = this;
    self.SelectedMonthList = [];
    self.IsLoadProfitLossByMonth = true;
    self.ProfitLossByMonthServiceService.GetProfiAndLossByMonth(this.Filter)
      .pipe(finalize(() => (self.IsLoadProfitLossByMonth = false)))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          self.ProfitAndLossByMonth = result.Data;
          self.SelectedMonthList = self.ProfitAndLossByMonth.SelectedMonthList;
          var getmarginlength =
            self.SelectedMonthList.length >= 10 ? '10px' : '200px';
          self.SetMargin = '15px ' + getmarginlength;
        }
      });
  }

  blob: any;
  getProfiAndLossByMonthPDF() {
    const self = this;
    self.IsPDFGenerate = true;
    this.Filter.ReportsType = 2;
    self.ProfitLossByMonthServiceService.GetProfiAndLossByMonthPDF(this.Filter)
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
            let GetName = 'ProfitLossByMonth';
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
