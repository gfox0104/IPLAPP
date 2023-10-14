import { Component, OnInit } from '@angular/core';
import { ProfitLossByVendorService } from './profit-loss-by-vendor-service.service';
import { finalize } from 'rxjs/operators';
import { ReportFilter } from '../report-filter.model';

@Component({
  selector: 'app-profit-loss-by-vendor',
  templateUrl: './profit-loss-by-vendor.component.html',
  styleUrls: ['./profit-loss-by-vendor.component.scss'],
})
export class ProfitLossByVendorComponent implements OnInit {
  constructor(public ProfitLossByVendorService: ProfitLossByVendorService) {}
  IsLoadProfitLossByVendor: boolean = false;
  IsPDFGenerate: boolean = false;
  ProfitAndLossByVendor;
  Filter: ReportFilter = new ReportFilter();
  IncomeIsShow: boolean = false;
  ExpensesIsShow: boolean = false;
  OtherIncomeIsShow: boolean = false;
  CurrentDate: Date = new Date();
  VendorList: any[] = [];
  monthNames: any[] = [];
  SetMargin: any = '';
  ngOnInit() {
    const self = this;
    self.getProfitLossByMonth();

    
  }

  getProfitLossByMonth() {
    const self = this;
    self.VendorList = [];
    self.IsLoadProfitLossByVendor = true;
    self.ProfitLossByVendorService.GetProfiAndLossByVendor(this.Filter)
      .pipe(finalize(() => (self.IsLoadProfitLossByVendor = false)))
      .subscribe((result) => {
        if (result.HttpStatusCode == 200) {
          self.ProfitAndLossByVendor = result.Data;
          self.VendorList = self.ProfitAndLossByVendor.VendorList;
          var getmarginlength = self.VendorList.length >= 10 ? '10px' : '200px';
          self.SetMargin = '15px ' + getmarginlength;
        }
      });
  }

  blob: any;
  getProfiAndLossByVendorPDF() {
    const self = this;
    self.IsPDFGenerate = true;
    this.Filter.ReportsType = 2;
    self.ProfitLossByVendorService.GetProfiAndLossByVendorPDF(this.Filter)
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
            let GetName = 'ProfitLossByVendor';
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
