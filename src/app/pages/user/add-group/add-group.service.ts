
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { AddGroupsModel, MenuMasterModel, GrouproleModel } from './add-group-model';
import { BaseUrl } from '../../../services/apis/rest-api';
import { HomepageServices } from '../../home/home.service';
import {environment} from '../../../../environments/environment'
@Injectable({
  providedIn: "root"
})
export class AddGroupsServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  // get user data
  private apiUrlPOST = BaseUrl + environment.Admin.PostGroup;

  public GruopDataPost(Modelobj: AddGroupsModel) {
    //dfebugger;
    // why user this bcoz form validation aslo data binding sent to server and gettong error occure
    var ANYDTO: any = {};
    ANYDTO.Grp_pkeyID = Modelobj.Grp_pkeyID;
    ANYDTO.Grp_Name = Modelobj.Grp_Name;
    ANYDTO.GroupRoleId = Modelobj.GroupRoleId;
    ANYDTO.MenuArray = Modelobj.MenuArray;
    ANYDTO.Grp_IsActive = Modelobj.Grp_IsActive;
    ANYDTO.Grp_IsDelete = Modelobj.Grp_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = Modelobj.Type;
   

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
  private apiUrlGet = BaseUrl + environment.Admin.GetMenu;

  public GetMenuData(Modelobj: MenuMasterModel) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
    var ANYDTO: any = {};
    ANYDTO.Ipre_MenuID = Modelobj.Ipre_MenuID;
    ANYDTO.Mgr_Group_Id = Modelobj.Mgr_Group_Id;
    ANYDTO.Type = 2;

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
  private apiUrlGetp = BaseUrl + environment.Admin.GetMenu;

  public GetMenuGroupData(Modelobj: MenuMasterModel) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
    var ANYDTO: any = {};
    ANYDTO.Ipre_MenuID = Modelobj.Ipre_MenuID;
    ANYDTO.Mgr_Group_Id = Modelobj.Mgr_Group_Id;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetp, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
       
      );
  }

  private apiUrl = BaseUrl + environment.Admin.GroupRoleDrd;

  public GetGroupdrd(Modelobj: GrouproleModel) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this._http
      .post<any>(this.apiUrl, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        
      );
  }

  // common handler
  private handleError(error: HttpErrorResponse) {
    if (error.status == 401) {
      alert('Unauthorized User...');
      window.location.href = '/admin/login';
    } else {
      alert("Invalid Request...");
    }

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Invalid request, please try again later...");
  }
}
