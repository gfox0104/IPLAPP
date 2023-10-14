import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { ViewMainCategoryModel } from './view-main-category-model';
import { BaseUrl } from "../../../../services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import{environment} from '../../../../../environments/environment';
@Injectable({
  providedIn: "root"
})

export class ViewMainCategoryServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  // get user data
  private apiUrlGet = BaseUrl + environment.Admin.GetCategory;
  public ViewmainCategoryData(Modelobj: ViewMainCategoryModel) {
    var ANYDTO: any = {};
    ANYDTO.Type =  Modelobj.Type;
    ANYDTO.Main_Cat_pkeyID = Modelobj.Main_Cat_pkeyID;
  

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
// filter data
private apiUrlGetfr = BaseUrl + environment.Admin.FilterCategory;

public ViewfiltercatData(Modelobj: ViewMainCategoryModel) {
  //debugger
  var ANYDTO: any = {};

  ANYDTO.Type =  Modelobj.Type;
  ANYDTO.Main_Cat_pkeyID = Modelobj.Main_Cat_pkeyID;

  var obj = {
    Main_Cat_Name: Modelobj.Main_Cat_Name,

    Main_Cat_IsActive: Modelobj.Main_Cat_Active
  };

  ANYDTO.FilterData = JSON.stringify(obj);

  let headers = new HttpHeaders({ "Content-Type": "application/json" });
  headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
  return this._http
    .post<any>(this.apiUrlGetfr, ANYDTO, { headers: headers })
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
}
 // Add/update Category filter
 private docpostUrl = BaseUrl + environment.Admin.SaveFilterCate;
 public AddUpdateFilterAdminCategoryData(Modelobj: ViewMainCategoryModel) {
   //debugger
   let ANYDTO: any = {};
   ANYDTO.Category_Filter_PkeyID = Modelobj.Main_Cat_pkeyID;
   ANYDTO.Category_Filter_CategoryName = Modelobj.Main_Cat_Name;
   ANYDTO.Category_Filter_CategoryIsActive = Modelobj.Main_Cat_Active;
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
