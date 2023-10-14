import { Component, OnInit } from '@angular/core';
import { JournalService } from './journal-service.service';
import { process, State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { finalize } from 'rxjs/operators';
import { ReportFilter } from '../report-filter.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
})
export class JournalComponent implements OnInit {
  constructor(public JournalService: JournalService) {}
  IsLoadJournal: boolean = false;
  IsPDFGenerate: boolean = false;
  Journal;
  Filter: ReportFilter = new ReportFilter();
  OrdinaryIncomeExpensesIsShow: boolean = true;
  IncomeIsShow: boolean = true;
  SalesIsShow: boolean = true;
  OtherIncomeExpensesIsShow: boolean = true;
  ExpensesIsShow: boolean = true;
  CurrentDate: Date = new Date();
  ngOnInit() {
    const self = this;
    self.Filter.StartDate = new DatePipe('en-US').transform(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      'yyyy-MM-dd'
    );
    self.getJournal();
  }
  getJournal() {
    const self = this;
    self.IsLoadJournal = true;
    self.JournalService.GetJournal(this.Filter)
      .pipe(finalize(() => (self.IsLoadJournal = false)))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          self.Journal = result.Data;
        }
      });
  }
  
  blob: any;
  getProfiAndLossDeatilsPDF() {
    const self = this;
    self.IsPDFGenerate = true;
    this.Filter.ReportsType = 7;
    self.JournalService.GetJournalPDF(this.Filter)
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
            let GetName = 'Journal';
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
