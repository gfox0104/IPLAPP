import { Component, OnInit } from '@angular/core';
import { ReportsList } from './Reports_List.model';
@Component({
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  constructor() {}
  ReportsList: ReportsList[] = [];

  ngOnInit(): void {
    this.ReportsList = [
      {
        id: 1,
        Name: 'Trial Blanace',
        IsActive: false,
      },
      {
        id: 2,
        Name: 'Income Statement',
        IsActive: false,
      },
      {
        id: 3,
        Name: 'Balance Sheet',
        IsActive: false,
      },
      {
        id: 4,
        Name: 'Profit and Loss',
        IsActive: false,
      },
      {
        id: 5,
        Name: 'Profit and Loss Details',
        IsActive: false,
      },
      {
        id: 6,
        Name: 'Profit and Loss Comparison',
        IsActive: false,
      },
      {
        id: 7,
        Name: 'Account Payable Ageing Summary',
        IsActive: false,
      },
      {
        id: 8,
        Name: 'Account Receivable Ageing Summary',
        IsActive: false,
      },
      {
        id: 9,
        Name: 'Journal',
        IsActive: false,
      },
      {
        id: 10,
        Name: 'Profit and Loss By Month',
        IsActive: false,
      },
      {
        id: 11,
        Name: 'Profit and Loss By Customer',
        IsActive: false,
      },
      {
        id: 12,
        Name: 'Profit and Loss By Vendor',
        IsActive: true,
      },
    ];
  }
  CheckIsCurrentTabActive(Selected) {
    this.ReportsList.map((x) => (x.IsActive = false));
    this.ReportsList.filter((x) => x.id == Selected)[0].IsActive = true;
  }
}
