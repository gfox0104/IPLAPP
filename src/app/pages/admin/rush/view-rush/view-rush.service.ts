
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";

import { Router } from "@angular/router";
import { ViewRushModel } from './view-rush-model'
import { BaseUrl } from "../../../../services/apis/rest-api";
import { HomepageServices } from '../../../home/home.service';
import{environment} from '../../../../../environments/environment';
@Injectable({
  providedIn: "root"
})

export class ViewRushServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  // get user data
  private apiUrlGet = BaseUrl + environment.Admin.GetRushes;

  public ViewStateData(Modelobj: ViewRushModel) {
    var ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.rus_pkeyID = Modelobj.rus_pkeyID;

    var obj = {
      rus_Name: Modelobj.rus_Name,
      rus_IsActive: Modelobj.rus_IsActive,
      rus_CreatedBy: Modelobj.rus_CreatedBy,
      rus_ModifiedBy: Modelobj.rus_ModifiedBy
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
  // Add/update Rush filter
 private docpostUrl = BaseUrl + environment.Admin.FilterRushes;
 public AddUpdateFilterAdminRushData(Modelobj: ViewRushModel) {
   let ANYDTO: any = {};
   ANYDTO.Rush_Filter_PkeyID = Modelobj.rus_pkeyID;
   ANYDTO.Rush_Filter_RushName = Modelobj.rus_Name;
   ANYDTO.Rush_Filter_RushIsActive = Modelobj.rus_IsActive;
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
