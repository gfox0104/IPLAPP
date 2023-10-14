import { Injectable } from '@angular/core';
import { throwError, from } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BaseUrl } from '../../../../services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import { filterMasterModel } from '../../client-companies/view-client-companies/view-client-companies-model';
import { AccClientfilterMasterModel } from './client.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientServices {
  public Errorcall;
  private token: any;
  constructor(
    private _http: HttpClient,
    private _Route: Router,
    private xHomepageServices: HomepageServices
  ) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlGet = BaseUrl + environment.Accounting.GetClient;
  private apiUrlPOST = BaseUrl + environment.Accounting.CreateClient;
  public ClientListData(Modelobj: AccClientfilterMasterModel) {
    var ANYDTO: any = {};
    Modelobj.MenuID = 1;
    Modelobj.UserID = 1;

    var obj = {
      Company_Name: Modelobj.Company_Name,
      City: Modelobj.City,
      Billing_Address: Modelobj.Billing_Address,
      ContactName: Modelobj.ContactName,
      StateId: Modelobj.StateId,
      IsActive: Modelobj.IsActive,
    };

    ANYDTO.SearchMaster = {
      UserID: Modelobj.UserID,
      MenuID: Modelobj.MenuID,
    };
    ANYDTO.WhereClause = Modelobj.WhereClause = '';
    ANYDTO.FilterData = JSON.stringify(obj);
    ANYDTO.Type = Modelobj.Type;

    if (Modelobj.Single) {
      ANYDTO.Acc_Client_pkeyId = Modelobj.Acc_Client_pkeyId;
      ANYDTO.Type = 2;
    }

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public CreateUpdateClient(Modelobj: any) {
    var ANYDTO: any = {};
    ANYDTO = Modelobj;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOST, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
