import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { ViewUserModel } from "./view-user-model";
import { BaseUrl } from "../../../services/apis/rest-api";
import { HomepageServices } from "../../home/home.service";
import {environment} from '../../../../environments/environment'

@Injectable({
  providedIn: "root"
})
export class ViewUserServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  // get user data
  //private apiUrlGet = BasetUrl.Domain + "api/RESTIPL/GetUserOrder";
  private apiUrlGet = BaseUrl + environment.Admin.UserFilter;

  public ViewUserData(Modelobj: ViewUserModel) {
    ////dfebugger
    var ANYDTO: any = {};
    ANYDTO.User_pkeyID = Modelobj.User_pkeyID;
    Modelobj.MenuID = 1;
    Modelobj.UserID = 1;

    var obj = {
      User_FirstName: Modelobj.User_FirstName,
      User_LastName: Modelobj.User_LastName,
      User_Address: Modelobj.User_Address,
      User_City: Modelobj.User_City,
      User_State: Modelobj.User_State,
      User_Zip: Modelobj.User_Zip,
      User_CellNumber: Modelobj.User_CellNumber,
      User_CompanyName: Modelobj.User_CompanyName,
      User_LoginName: Modelobj.User_LoginName,
      User_Email: Modelobj.User_Email,
      User_Group: Modelobj.User_Group,
      User_Misc_Contractor_Score: Modelobj.User_Misc_Contractor_Score,
      User_IsActive: Modelobj.User_IsActive
    };

    ANYDTO.SearchMaster = {
      UserID: Modelobj.UserID,
      MenuID: Modelobj.MenuID
    };
    
    ANYDTO.WhereClause = Modelobj.WhereClause = "";
    ANYDTO.FilterData = JSON.stringify(obj);
    ANYDTO.Type = Modelobj.Type;

    if (Modelobj.Single) {
      ANYDTO.User_pkeyID = Modelobj.User_pkeyID;
      ANYDTO.Type = 2;

    }
//console.log('userjson',ANYDTO)
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          ////console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        //catchError( this.Errorcall.handleError)
      );
  }
//user save filter
private docpostUrl = BaseUrl + environment.Admin.UserFilterSave;
public AddUpdateFilterAdminuserData(Modelobj: ViewUserModel) {
  let ANYDTO: any = {};
  ANYDTO.User_Filter_PkeyID = Modelobj.User_pkeyID,
  ANYDTO.User_Filter_First_Name = Modelobj.User_FirstName,
  ANYDTO.User_Filter_Last_Name = Modelobj.User_LastName,
  ANYDTO.User_Filter_Mobile = Modelobj.User_CellNumber,
  ANYDTO.User_Filter_Company = Modelobj.User_CompanyName,
  ANYDTO.User_Filter_Login_email = Modelobj.User_Email,
  ANYDTO.User_Filter_Group = Modelobj.User_Group,
  ANYDTO.User_Filter_USRIsActive = Modelobj.User_IsActive
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
  // common handler
  private handleError(error: HttpErrorResponse) {
    if (error.status == 401) {
      alert('Unauthorized User...');
    } else {
      alert('Invalid Request...');
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
    return throwError("Something's wrong, please try again later...");
  }
}
