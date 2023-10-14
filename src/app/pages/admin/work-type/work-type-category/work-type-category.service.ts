
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { ViewWorkTypeCategoryModel } from "./work-type-category-model";
import { BaseUrl } from "../../../../services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import{environment} from '../../../../../environments/environment';
@Injectable({
  providedIn: "root"
})

export class ViewWorkTypeCategoryServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  // get user data
  private apiUrlGet = BaseUrl + environment.Admin.GetWorkType;
  public ViewWorkTypeData(Modelobj: ViewWorkTypeCategoryModel) {
    //debugger;
    var ANYDTO: any = {};
    ANYDTO.WT_pkeyID = Modelobj.WT_pkeyID;
    Modelobj.MenuID = 1;
    Modelobj.UserID = 1;

    var obj = {
      WT_WorkType: Modelobj.WT_WorkType,
      WT_CategoryID: Modelobj.WT_CategoryID,
      WT_CreatedBy: Modelobj.WT_CreatedBy,
      WT_Type_ModifiedBy : Modelobj.WT_Type_ModifiedBy,

      
      WT_IsActive: Modelobj.WT_IsActive

    };

    ANYDTO.SearchMaster = {
      UserID: Modelobj.UserID,
      MenuID: Modelobj.MenuID
    };
    ANYDTO.WhereClause = Modelobj.WhereClause = "";
    ANYDTO.FilterData = JSON.stringify(obj);
    ANYDTO.Type = Modelobj.Type;

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
  private docpostUrl = BaseUrl + environment.Admin.SaveWorkTypeFilter;
  public AddUpdateFilterAdminWorkTypeData(Modelobj: ViewWorkTypeCategoryModel) {
    let ANYDTO: any = {};
    ANYDTO.WT_Filter_PkeyId = Modelobj.WT_pkeyID,
    ANYDTO.WT_Filter_Name = Modelobj.WT_WorkType,
    ANYDTO.WT_Filter_Group = Modelobj.WT_CategoryID,
    ANYDTO.WT_Filter_WTIsActive = Modelobj.WT_IsActive,
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
