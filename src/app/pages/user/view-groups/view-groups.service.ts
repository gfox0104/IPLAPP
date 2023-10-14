
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { ViewGroupsModel } from './view-groups-model';
import { BaseUrl } from '../../../services/apis/rest-api';
import { HomepageServices } from '../../home/home.service';
import {environment} from '../../../../environments/environment'
@Injectable({
  providedIn: "root"
})

export class ViewGroupsServices {
  public Errorcall;
  public token: any;
  pathParam: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  // get user data
  private apiUrlGet = BaseUrl + environment.Admin.GetGroup;

  public ViewGroupsData(Modelobj: ViewGroupsModel) {
    ////dfebugger
    var ANYDTO: any = {};
    ANYDTO.Grp_pkeyID = Modelobj.Grp_pkeyID;

    var obj = {
      Grp_Name: Modelobj.Grp_Name,
      GroupRoleId:Modelobj.User_Group,
      Grp_IsActive: Modelobj.Grp_IsActive,
      Grp_CreatedBy:Modelobj.Grp_CreatedBy,
      Grp_ModifiedBy:Modelobj.Grp_ModifiedBy
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

  private docpostUrl = BaseUrl + environment.Admin.FilterGroup;
public AddUpdateFilterAdminGroupData(Modelobj: ViewGroupsModel) {
  let ANYDTO: any = {};
  ANYDTO.Group_Filter_PkeyID = Modelobj.Grp_pkeyID,
  ANYDTO.Group_Filter_Group_Name = Modelobj.Grp_Name,
  ANYDTO.Group_Filter_GRPIsActive = Modelobj.Grp_IsActive,
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

  setPathParam(param) {
    ////dfebugger
    this.pathParam = param;
  }

  getPathParam() {
    return this.pathParam;
  }
}
