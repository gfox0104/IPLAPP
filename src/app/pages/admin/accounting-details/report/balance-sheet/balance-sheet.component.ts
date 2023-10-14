import { Component, OnInit } from '@angular/core';
import { BalanceSheetServiceService } from './balance-sheet-service.service';
import { process, State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { finalize } from 'rxjs/operators';
import { ReportFilter } from '../report-filter.model';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss'],
})
export class BalanceSheetComponent implements OnInit {
  constructor(public BalanceSheetServiceService: BalanceSheetServiceService) {}
  IsLoadBalance: boolean = false;
  IsPDFGenerate: boolean = false;
  BalanceSheet: any;
  IsShow: boolean = false;
  Filter: ReportFilter = new ReportFilter();
  AssetsIsShow: boolean = true;
  CurrentAssetsIsShow: boolean = true;
  AccountsReceivableIsShow: boolean = true;
  LiabilitiesAndEquityIsShow: boolean = true;
  CurrentLiabilitiesIsShow: boolean = true;
  EquityIsShow: boolean = true;
  CurrentDate: Date = new Date();
  ngOnInit() {
    const self = this;
    self.getBalanceSheet();
  }
  getBalanceSheet() {
    const self = this;
    self.IsLoadBalance = true;
    self.BalanceSheetServiceService.GetBalanceSheet(this.Filter)
      .pipe(finalize(() => (self.IsLoadBalance = false)))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          self.BalanceSheet = result.Data;
        }
      });
  }
  
  getSum(drcr, list) {
    
    if (list) {
      const sum = list
        .map((v) => v[drcr])
        .reduce((sum, current) => sum + current, 0);
      return sum;
    }
    return 0;
  }
  public aggregates: any[] = [
    { field: 'Amount', aggregate: 'sum' },
    { field: 'IsExpense', aggregate: 'count' },
  ];
  public state: State = {
    group: [{ field: 'IsExpense', aggregates: this.aggregates }],
  };
  public dataBalanceStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
  blob: any;
  getBalanceSheetPDF() {
    const self = this;
    self.IsPDFGenerate = true;
    this.Filter.ReportsType = 1;
    self.BalanceSheetServiceService.GetBalanceSheetPDF(this.Filter)
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
            let GetName = 'BalanceSheet';
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
