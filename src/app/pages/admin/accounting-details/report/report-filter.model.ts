import { DatePipe } from '@angular/common';
export class ReportFilter {
  StartDate: any = new DatePipe('en-US').transform(
    new Date(new Date().getFullYear(), 0, 1),
    'yyyy-MM-dd'
  );
  EndDate: any = new DatePipe('en-US').transform(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),
    'yyyy-MM-dd'
  );
  ReportsType: Number = 0;
}
