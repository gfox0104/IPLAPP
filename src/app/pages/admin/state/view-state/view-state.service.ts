import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { ViewStateModel } from './view-state-model'
import { BaseUrl } from "../../../../services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import{environment}from '../../../../../environments/environment';
@Injectable({
  providedIn: "root"
})

export class ViewUserServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlGet = BaseUrl + environment.Admin.GetState;

  public ViewStateData(Modelobj: ViewStateModel) {
    var ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.IPL_StateID = Modelobj.IPL_StateID;

    var obj = {
      IPL_StateName: Modelobj.IPL_StateName,
      IPL_State_IsActive: Modelobj.IPL_State_IsActive,
      IPL_State_CreatedBy: Modelobj.IPL_State_CreatedBy,
      IPL_State_ModifiedBy: Modelobj.IPL_State_ModifiedBy
  
    };
  
    ANYDTO.FilterData = JSON.stringify(obj);

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  private docpostUrl = BaseUrl + environment.Admin.SaveStateFilter;
  public AddUpdateFilterAdminCustomerData(Modelobj: ViewStateModel) {
    let ANYDTO: any = {};
    ANYDTO.State_Filter_PkeyId = Modelobj.IPL_StateID,
    ANYDTO.State_Filter_Name = Modelobj.IPL_StateName,
    ANYDTO.State_Filter_IsStateActive = Modelobj.IPL_State_IsActive,
    ANYDTO.State_Filter_IsActive = true,
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
