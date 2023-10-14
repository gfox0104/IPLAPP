import { Component, OnInit } from '@angular/core';
import { IncomeStatementServiceService } from './income-statement-service.service';
import { process, State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { finalize } from 'rxjs/operators';
import { ReportFilter } from '../report-filter.model';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-income-statement',
  templateUrl: './income-statement.component.html',
  styleUrls: ['./income-statement.component.scss'],
})
export class IncomeStatementComponent implements OnInit {
  constructor(public IncomeStatementService: IncomeStatementServiceService) {}
  IsLoadIncome: boolean = false;
  IsPDFGenerate: boolean = false;
  IncomeStatement;
  Filter: ReportFilter = new ReportFilter();
  ngOnInit() {
    const self = this;
    self.getIncomeStatement();
  }
  getIncomeStatement() {
    const self = this;
    self.IsLoadIncome = true;
    self.IncomeStatementService.GetIncomeStatement(this.Filter)
      .pipe(finalize(() => (self.IsLoadIncome = false)))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          self.IncomeStatement = result.Data;
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
  getIncomeStatementPDF() {
    const self = this;
    self.IsPDFGenerate = true;
    this.Filter.ReportsType = 4;
    self.IncomeStatementService.GetIncomeStatementPDF(this.Filter)
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
            let GetName = 'IncomeStatement';
            if (GetName != null) {
              link.download = GetName + '.pdf';
            }
            link.click();
            
          } else {
          }
        }
      });
  }
  accountTypes: any = [
    { id: 1, name: 'Assets' },
    { id: 2, name: 'Liabilities' },
    { id: 3, name: 'Equity' },
  ];
  getSumRevenue() {
    if (this.IncomeStatement) {
      return this.IncomeStatement.filter((item) => !item.IsExpense)
        .map((v) => v.Amount)
        .reduce((acc, score) => acc + score, 0);
    }
    return 0;
  }

  getSumExpense() {
    if (this.IncomeStatement) {
      return this.IncomeStatement.filter((item) => item.IsExpense)
        .map((v) => v.Amount)
        .reduce((acc, score) => acc + score, 0);
    }
    return 0;
  }
}
