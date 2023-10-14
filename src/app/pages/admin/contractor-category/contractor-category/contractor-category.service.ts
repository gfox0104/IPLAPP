import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { ContractorCategoryModel } from './contractor-category-model';
import { BaseUrl } from "../../../../services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import{environment} from '../../../../../environments/environment'
@Injectable({
  providedIn: "root"
})

export class ContractorCategoryServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  // get user data http://localhost:63050/api/RESTIPL/GetContractorCateData
  private apiUrlGet = BaseUrl + environment.Admin.GetContractor;
  public ViewmainCategoryData(Modelobj: ContractorCategoryModel) {
    // debugger
    var ANYDTO: any = {};
    ANYDTO.Type =  1;
    ANYDTO.WhereClause = null;
    ANYDTO.Con_Cat_PkeyID = Modelobj.Con_Cat_PkeyID;
  

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
private apiUrlGetfr = BaseUrl + environment.Admin.FilterConCate;

public ViewfiltercatData(Modelobj: ContractorCategoryModel) {
  // //dfebugger
  var ANYDTO: any = {};

  ANYDTO.Type =  Modelobj.Type;
  ANYDTO.Con_Cat_pkeyID = Modelobj.Con_Cat_PkeyID;

  var obj = {
    Con_Cat_Name: Modelobj.Con_Cat_Name,
    Con_Cat_IsActive: Modelobj.Con_Cat_IsActive,
    Con_Cat_CreatedBy:Modelobj.Con_Cat_CreatedBy,
    Con_Cat_ModifiedBy:Modelobj.Con_Cat_ModifiedBy
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
private docpostUrl = BaseUrl + environment.Admin.SaveConFilter;
public AddUpdateFilterAdminConCatData(Modelobj: ContractorCategoryModel) {
  let ANYDTO: any = {};
  ANYDTO.ConCat_Filter_PkeyId = Modelobj.Con_Cat_PkeyID,
  ANYDTO.ConCat_Filter_Name = Modelobj.Con_Cat_Name,
  ANYDTO.ConCat_Filter_CatIsActive = Modelobj.Con_Cat_IsActive,
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
