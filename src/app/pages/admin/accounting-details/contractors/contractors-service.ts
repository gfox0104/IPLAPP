import { Injectable } from '@angular/core';
import { throwError, from } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BaseUrl } from '../../../../services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import { ViewUserModel } from '../../../user/view-user/view-user-model';
import { Vendor } from './contractors.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContractorsServices {
  public Errorcall;
  private token: any;
  constructor(
    private _http: HttpClient,
    private _Route: Router,
    private xHomepageServices: HomepageServices
  ) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlGet = BaseUrl + environment.Accounting.GetVendorFilter;

  public GetVendorListData(Modelobj: Vendor) {
    var ANYDTO: any = {};
    ANYDTO.Acc_Vendor_pkeyId = Modelobj.Acc_Vendor_pkeyId;
    Modelobj.MenuID = 1;
    Modelobj.UserID = 1;

    ANYDTO.SearchMaster = {
      UserID: Modelobj.UserID,
      MenuID: Modelobj.MenuID,
    };

    ANYDTO.WhereClause = Modelobj.WhereClause = '';
    if (Modelobj.Type == 0) {
      Modelobj.Type = 1;
    }
    ANYDTO.Type = Modelobj.Type;

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
  private apiUrlPOST = BaseUrl + environment.Accounting.PostUserData;
  public UsertDataPost(Modelobj: any) {
  
    var ANYDTO: any = {};
    ANYDTO = Modelobj;
    ANYDTO.Type = 1;

    if (Modelobj.User_pkeyID != 0) {
      ANYDTO.Type = 2;
    }
    if (Modelobj.User_IsDelete) {
      ANYDTO.Type = 4;
    }

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
  private apiUrlPOST1 = BaseUrl + environment.Accounting.CreateAccVendor;
  public CreateUpdateAccVendor(Modelobj: any) {
    //////dfebugger; // why user this bcoz form validation aslo data binding sent to server and gettong error occure
    var ANYDTO: any = {};
    ANYDTO = Modelobj;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOST1, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          //console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        //catchError( this.Errorcall.handleError)
      );
  }
}
