import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { ViewCompanyInfoModel, filterMasterModel } from './view-company-info-model';
import { BaseUrl } from '../../../../services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import {environment} from '../../../../../environments/environment'
@Injectable({
  providedIn: "root"
})
export class ViewCompanyInfoServices {

  public token: any;
  public Errorcall;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  // get user data
  private apiUrlGet = BaseUrl + environment.Admin.GetCompany;

  public ViewCompanyInfoData(Modelobj: filterMasterModel) {
    var ANYDTO: any = {};
    Modelobj.MenuID = 1;
    Modelobj.UserID = 1;
    var obj = {
      YR_Company_Name: Modelobj.YR_Company_Name,
      YR_Company_Con_Name: Modelobj.YR_Company_Con_Name,
      YR_Company_Email: Modelobj.YR_Company_Email,
      YR_Company_City: Modelobj.YR_Company_City,
      YR_Company_Phone: Modelobj.YR_Company_Phone,
      YR_Company_Address: Modelobj.YR_Company_Address,
      YR_Company_IsActive: Modelobj.YR_Company_IsActive,
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
}
