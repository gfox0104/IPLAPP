import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import {
  ViewClientCompaniesModel,
  filterMasterModel
} from "./view-client-companies-model";
import { BaseUrl } from "../../../../services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import {environment} from '../../../../../environments/environment'
@Injectable({
  providedIn: "root"
})

export class ViewClientCompaniesServices {
  public token: any;
  public Errorcall;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  // get user data
  private apiUrlGet = BaseUrl + environment.Admin.GetClient;

  public ClientComapnyViewData(Modelobj: filterMasterModel) {
    // debugger
    var ANYDTO: any = {};
    Modelobj.MenuID = 1;
    Modelobj.UserID = 1;

    var obj = {
      Client_Company_Name: Modelobj.Client_Company_Name,
      Client_City: Modelobj.Client_City,
      Client_Billing_Address: Modelobj.Client_Billing_Address,
      Client_ContactName: Modelobj.Client_ContactName,
      Client_StateId: Modelobj.Client_StateId,
      Client_CreatedBy:Modelobj.Client_CreatedBy,
      Client_ModifiedBy:Modelobj.Client_ModifiedBy,

      Client_IsActive: Modelobj.Client_IsActive,
    };

    ANYDTO.SearchMaster = {
      UserID: Modelobj.UserID,
      MenuID: Modelobj.MenuID
    };
    ANYDTO.WhereClause = Modelobj.WhereClause = "";
    ANYDTO.FilterData = JSON.stringify(obj);
    ANYDTO.Type = Modelobj.Type;

    if (Modelobj.Single) {
      ANYDTO.Client_pkeyID = Modelobj.Client_pkeyID;
      ANYDTO.Type = 2;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          //console.log('client company', data)
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private docpostUrl = BaseUrl + environment.Admin.FilterClient;
  public AddUpdateFilterAdminClientData(Modelobj: filterMasterModel) {
    let ANYDTO: any = {};
    ANYDTO.Client_Filter_PkeyID = Modelobj.Client_pkeyID;
    ANYDTO.Client_Filter_ClientName = Modelobj.Client_Company_Name;
    ANYDTO.Client_Filter_City = Modelobj.Client_City;
    ANYDTO.Client_Filter_Address = Modelobj.Client_Billing_Address;
    ANYDTO.Client_Filter_State = Modelobj.Client_StateId;
    ANYDTO.Client_Filter_CLTIsActive = Modelobj.Client_IsActive;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.docpostUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

}
