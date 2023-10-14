import { Component, OnInit } from '@angular/core';
import { TrialBalanceServiceService } from './trial-balance-service.service';
import { process, State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { finalize } from 'rxjs/operators';
import { ReportFilter } from '../report-filter.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrls: ['./trial-balance.component.scss'],
})
export class TrialBalanceComponent implements OnInit {
  constructor(public TrialBalanceServiceService: TrialBalanceServiceService) {}
  IsLoadTrial: boolean = false;
  IsPDFGenerate: boolean = false;
  TrialBalanceList;
  Filter: ReportFilter = new ReportFilter();
  ngOnInit() {
    const self = this;
    self.getTrialBalance();
  }
  getTrialBalance() {
    const self = this;
    self.IsLoadTrial = true;
    self.TrialBalanceServiceService.GetTrialBalance(this.Filter)
      .pipe(finalize(() => (self.IsLoadTrial = false)))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          self.TrialBalanceList = result.Data;
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
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
  blob: any;
  getTrialBalancePDF() {
    const self = this;
    self.IsPDFGenerate = true;
    this.Filter.ReportsType = 3;
    self.TrialBalanceServiceService.GetTrialBalancePDF(this.Filter)
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
            let GetName = 'TrailBalance';
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
