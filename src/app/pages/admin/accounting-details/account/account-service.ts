import { Injectable } from '@angular/core';
import { throwError, from } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BaseUrl } from '../../../../services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import { filterMasterModel } from '../../client-companies/view-client-companies/view-client-companies-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountServices {
  public Errorcall;
  private token: any;
  constructor(
    private _http: HttpClient,
    private _Route: Router,
    private xHomepageServices: HomepageServices
  ) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlGet = BaseUrl + environment.Accounting.GetAccountList;
  private apiUrlPost = BaseUrl + environment.Accounting.CreateUpdateAccount;
  private apiUrlGetDropDownAccountType =
    BaseUrl + environment.Accounting.AccountTypeDrd;
  private apiUrlGetDropDownAccountDetailsByAccountTypeId =
    BaseUrl + environment.Accounting.AccountDetailsDrd;
  private apiUrlGetAccountDetailsByAccountId =
    BaseUrl + environment.Accounting.GetAccountDetails;
  private apiUrlGetAccountchild =
    BaseUrl + environment.Accounting.GetAccountChild;
  private apiUrlGetAccountActivity =
    BaseUrl + environment.Accounting.GetAccountActivity;
  public CreateUpdateAccountData(Modelobj: any) {
    Modelobj.UserID = 1;
    var ANYDTO: any = JSON.stringify(Modelobj);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPost, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public GetAccountList() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .get<any>(this.apiUrlGet, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public GetAccountTypeList() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .get<any>(this.apiUrlGetDropDownAccountType, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public GetDropDownAccountDetailsByAccountTypeIdList(Id: number) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .get<any>(
        this.apiUrlGetDropDownAccountDetailsByAccountTypeId +
          '?AccountTypeId=' +
          Id,
        { headers: headers }
      )
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public GetAccountDetailsByAccountId(Id: number) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .get<any>(this.apiUrlGetAccountDetailsByAccountId + '?AccountId=' + Id, {
        headers: headers,
      })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public GetAccountChildByAccountId(Id: number) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .get<any>(this.apiUrlGetAccountchild + '?AccountId=' + Id, {
        headers: headers,
      })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public GetAccountActivityByAccountId(Modelobj: any) {
    var ANYDTO: any = JSON.stringify(Modelobj);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetAccountActivity, ANYDTO, {
        headers: headers,
      })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
