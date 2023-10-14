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
export class ProfitLossByVendorService {
  public Errorcall;
  private token: any;
  constructor(
    private _http: HttpClient,
    private _Route: Router,
    private xHomepageServices: HomepageServices
  ) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  private apiUrlProfiAndLossByVendorGet =
    BaseUrl + environment.Accounting.Report.GetProfitAndLossByVendorReports;
  private apiUrlProfiAndLossByVendorPDFGet =
    BaseUrl + environment.Accounting.Report.GetProfitLossByVendorPDF;
  public GetProfiAndLossByVendor(filter: ReportFilter) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    let body = JSON.stringify(filter);
    return this._http
      .post<any>(this.apiUrlProfiAndLossByVendorGet, body, {
        headers: headers,
      })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public GetProfiAndLossByVendorPDF(filter: ReportFilter) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    let body = JSON.stringify(filter);
    return this._http
      .get(
        this.apiUrlProfiAndLossByVendorPDFGet +
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
