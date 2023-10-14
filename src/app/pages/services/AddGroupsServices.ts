
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { AddGroupsModel, MenuMasterModel, GrouproleModel } from '../models/add-groups-model';
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { HomepageServices } from '../home/home.service';

@Injectable({
  providedIn: "root"
})
export class AddGroupsServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  // get user data
  private apiUrlPOST = BaseUrl + "api/RESTIPL/PostGroupDetails";

  public GruopDataPost(Modelobj: AddGroupsModel) {
    var ANYDTO: any = {};
    ANYDTO.Grp_pkeyID = Modelobj.Grp_pkeyID;
    ANYDTO.Grp_Name = Modelobj.Grp_Name;
    ANYDTO.GroupRoleId = Modelobj.GroupRoleId;
    ANYDTO.MenuArray = Modelobj.MenuArray;
    ANYDTO.Grp_IsActive = Modelobj.Grp_IsActive;
    ANYDTO.Grp_IsDelete = Modelobj.Grp_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;

    if (Modelobj.Grp_pkeyID != 0) {
      ANYDTO.Type = 2;
    }
    if (Modelobj.Grp_IsDelete) {
      ANYDTO.Type = 4;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOST, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // get menu details
  private apiUrlGet = BaseUrl + "api/RESTIPL/GetMenuDetails";

  public GetMenuData(Modelobj: MenuMasterModel) {
    var ANYDTO: any = {};
    ANYDTO.Ipre_MenuID = Modelobj.Ipre_MenuID;
    ANYDTO.Mgr_Group_Id = Modelobj.Mgr_Group_Id;
    ANYDTO.Type = 1;

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

  private apiUrl = BaseUrl + "api/RESTIPL/GetGroupRoleDRD";

  public GetGroupdrd(Modelobj: GrouproleModel) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrl, Modelobj, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
