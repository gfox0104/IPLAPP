import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { ViewUOMModel } from './view-UOM-model'
import { BaseUrl } from "src/app/services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import {environment} from '../../../../../environments/environment'

@Injectable({
  providedIn: "root"
})
export class ViewUOMServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlGet = BaseUrl +   environment.Admin.GetUom;

  public ViewUOMData(Modelobj: ViewUOMModel) {
    var ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.UOM_pkeyId = Modelobj.UOM_pkeyId;

    var obj = {
      UOM_Name: Modelobj.UOM_Name,
      UOM_IsActive: Modelobj.UOM_IsActive,
      UOM_CreatedBy:Modelobj.UOM_CreatedBy,
      UOM_ModifiedBy: Modelobj.UOM_ModifiedBy
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

  // Add/update UOM filter
  private docpostUrl = BaseUrl + environment.Admin.SaveUomFilter;
  public AddUpdateFilterAdminUOMData(Modelobj: ViewUOMModel) {
    let ANYDTO: any = {};
    ANYDTO.UOM_Filter_PkeyID = Modelobj.UOM_pkeyId;
    ANYDTO.UOM_Filter_UOMName = Modelobj.UOM_Name;
    ANYDTO.UOM_Filter_UOMIsActive = Modelobj.UOM_IsActive;
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
