import { Injectable } from '@angular/core';
import { throwError, from } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BaseUrl } from '../../../../../services/apis/rest-api';
import { HomepageServices } from '../../../../home/home.service';
import { ReportFilter } from '../report-filter.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AccountReceivableAgingSummaryService {
  public Errorcall;
  private token: any;
  constructor(
    private _http: HttpClient,
    private _Route: Router,
    private xHomepageServices: HomepageServices
  ) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  private apiUrlAccountReceivableGet =
    BaseUrl + environment.Accounting.Report.GetAccountReceivableReports;
  private apiUrlAccountReceivableReportsPDFGet =
    BaseUrl + environment.Accounting.Report.GetAccountReceivableReportsPDF;
  public GetAccountReceivable(filter: ReportFilter) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    let body = JSON.stringify(filter);
    return this._http
      .post<any>(this.apiUrlAccountReceivableGet, body, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public GetAccountReceivablePDF(filter: ReportFilter) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    let body = JSON.stringify(filter);
    return this._http
      .get(
        this.apiUrlAccountReceivableReportsPDFGet +
          '?StartDate=' +
          filter.StartDate +
          '&EndDate=' +
          filter.EndDate +
          '&ReportType=' +
          filter.ReportsType,
        {
          responseType: 'blob',
          headers: headers,
        }
      )
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
