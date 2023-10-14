import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from "../../../../services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import {environment} from '../../../../../environments/environment'
import { AddAllowablesModel, ViewAllowablesModel } from "./view-allowables-details-model";
@Injectable({
  providedIn: "root"
})

export class ViewAllowablesServices {
  public token: any;
  public Errorcall;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  // get user data


  private AplGet = BaseUrl + environment.Admin.GetAllowablesDetails;
  public GetAllowablesData(Modelobj:ViewAllowablesModel) {
    let ANYDTO: any = {};
    ANYDTO.Allowables_Cat_PkeyId = Modelobj.Allowables_Cat_PkeyId;
    ANYDTO.Type = Modelobj.Type;
    var obj = {
      Allowables_Cat_Name: Modelobj.Allowables_Cat_Name,
      Allowables_Cat_IsActive: Modelobj.Allowables_Cat_IsActive,
      Allowables_Cat_CreatedBy: Modelobj.Allowables_Cat_CreatedBy,
      Allowables_Cat_ModifiedBy: Modelobj.Allowables_Cat_ModifiedBy
    };
  
    ANYDTO.FilterData = JSON.stringify(obj);

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.AplGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlPOST = BaseUrl + environment.Admin.PostAllowablesDetails;

  public PostAllowableData(Modelobj: AddAllowablesModel) {
    let ANYDTO: any = {};
    ANYDTO.Allowables_Cat_PkeyId = Modelobj.Allowables_Cat_PkeyId;
    ANYDTO.Allowables_Cat_Name = Modelobj.Allowables_Cat_Name;
    ANYDTO.Allowables_Cat_IsActive = Modelobj.Allowables_Cat_IsActive;
    ANYDTO.Allowables_Cat_IsDelete = Modelobj.Allowables_Cat_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;

  
    if (Modelobj.Type != 3) {
      ANYDTO.Type = 1;

      if (Modelobj.Allowables_Cat_PkeyId != 0) {
        ANYDTO.Type = 2;
      }
      if (Modelobj.Allowables_Cat_IsDelete) {
        ANYDTO.Type = 4;
      }
    }
    else{
      ANYDTO.Type = 3;
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

  private docpostUrl = BaseUrl + environment.Admin.AddAdminFilterAllowablesCategory;
  public AddUpdateFilterAdminAllowableCategoryData(Modelobj: ViewAllowablesModel) {
    let ANYDTO: any = {};
    ANYDTO.Allowables_Cat_Filter_PkeyId = Modelobj.Allowables_Cat_PkeyId,
    ANYDTO.Allowables_Cat_Filter_Name = Modelobj.Allowables_Cat_Name,
    ANYDTO.Allowables_Cat_Filter_IsCateActive = Modelobj.Allowables_Cat_IsActive,
    ANYDTO.Allowables_Cat_Filter_IsActive = true,
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
