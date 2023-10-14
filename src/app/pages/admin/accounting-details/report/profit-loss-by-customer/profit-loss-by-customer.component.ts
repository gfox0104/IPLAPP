import { Component, OnInit } from '@angular/core';
import { ProfitLossByCustomerService } from './profit-loss-by-customer-service.service';
import { finalize } from 'rxjs/operators';
import { ReportFilter } from '../report-filter.model';

@Component({
  selector: 'app-profit-loss-by-customer',
  templateUrl: './profit-loss-by-customer.component.html',
  styleUrls: ['./profit-loss-by-customer.component.scss'],
})
export class ProfitLossByCustomerComponent implements OnInit {
  constructor(
    public ProfitLossByCustomerService: ProfitLossByCustomerService
  ) {}
  IsLoadProfitLossByCustomer: boolean = false;
  IsPDFGenerate: boolean = false;
  ProfitAndLossByCustomer;
  Filter: ReportFilter = new ReportFilter();
  IncomeIsShow: boolean = false;
  ExpensesIsShow: boolean = false;
  OtherIncomeIsShow: boolean = false;
  CurrentDate: Date = new Date();
  CustomerList: any[] = [];
  monthNames: any[] = [];
  SetMargin: any = '';
  ngOnInit() {
    const self = this;
    self.getProfitLossByMonth();

    
  }

  getProfitLossByMonth() {
    const self = this;
    self.CustomerList = [];
    self.IsLoadProfitLossByCustomer = true;
    self.ProfitLossByCustomerService.GetProfiAndLossByCustomer(this.Filter)
      .pipe(finalize(() => (self.IsLoadProfitLossByCustomer = false)))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          self.ProfitAndLossByCustomer = result.Data;
          self.CustomerList = self.ProfitAndLossByCustomer.CustomerList;
          var getmarginlength =
            self.CustomerList.length >= 10 ? '10px' : '200px';
          self.SetMargin = '15px ' + getmarginlength;
        }
      });
  }

  blob: any;
  getProfiAndLossByCustomerPDF() {
    const self = this;
    self.IsPDFGenerate = true;
    this.Filter.ReportsType = 2;
    self.ProfitLossByCustomerService.GetProfiAndLossByCustomerPDF(this.Filter)
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
            let GetName = 'ProfitLossByCustomer';
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
