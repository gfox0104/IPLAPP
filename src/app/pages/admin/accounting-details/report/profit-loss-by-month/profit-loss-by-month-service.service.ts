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
export class ProfitLossByMonthServiceService {
  public Errorcall;
  private token: any;
  constructor(
    private _http: HttpClient,
    private _Route: Router,
    private xHomepageServices: HomepageServices
  ) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  private apiUrlProfiAndLossByMonthGet =
    BaseUrl + environment.Accounting.Report.GetProfitAndLossByMonthReports;
  private apiUrlProfiAndLossByMonthPDFGet =
    BaseUrl + environment.Accounting.Report.GetProfitLossByMonthPDF;
  public GetProfiAndLossByMonth(filter: ReportFilter) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    let body = JSON.stringify(filter);
    return this._http
      .post<any>(this.apiUrlProfiAndLossByMonthGet, body, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public GetProfiAndLossByMonthPDF(filter: ReportFilter) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    let body = JSON.stringify(filter);
    return this._http
      .get(
        this.apiUrlProfiAndLossByMonthPDFGet +
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
