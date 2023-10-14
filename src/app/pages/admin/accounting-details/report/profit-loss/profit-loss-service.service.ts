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
export class ProfitLossServiceService {
  public Errorcall;
  private token: any;
  constructor(
    private _http: HttpClient,
    private _Route: Router,
    private xHomepageServices: HomepageServices
  ) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  private apiUrlProfiAndLossGet =
    BaseUrl + environment.Accounting.Report.GetProfitAndLossReports;
  private apiUrlProfiAndLossPDFGet =
    BaseUrl + environment.Accounting.Report.GetProfitLossPDF;
  public GetProfiAndLoss(filter: ReportFilter) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    let body = JSON.stringify(filter);
    return this._http
      .post<any>(this.apiUrlProfiAndLossGet, body, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public GetProfiAndLossPDF(filter: ReportFilter) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    let body = JSON.stringify(filter);
    return this._http
      .get(
        this.apiUrlProfiAndLossPDFGet +
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
