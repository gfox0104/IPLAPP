import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from "../../../../services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import {environment} from '../../../../../environments/environment'
import { AllowablesDetails } from "./allowables-details.model";
import { PostAllowablesDetails } from "../add-allowables/allowables-details.model";

@Injectable({
  providedIn: "root"
})

export class AllowablesServices {
  public token: any;
  public Errorcall;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }




  private AplGet = BaseUrl + environment.Admin.GetAllowables;
  public GetAllowablesDetail(Modelobj:AllowablesDetails) {
    //debugger
    let ANYDTO: any = {};
    ANYDTO.Allowable_PKeyId = Modelobj.Allowable_PKeyId;
    ANYDTO.Type = Modelobj.Type;
    var obj = {
      Allowable_Name: Modelobj.Allowable_Name,
      Allowable_IsActive: Modelobj.Allowable_IsActive,
      Allowable_CreatedBy:Modelobj.Allowable_CreatedBy,
      Allowable_ModifiedBy:Modelobj.Allowable_ModifiedBy
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

  private apiUrlPOST = BaseUrl + environment.Admin.AddUpdateAllowables;
  public PostAllowableMasterData(Modelobj: PostAllowablesDetails) {
    let ANYDTO: any = {};
    ANYDTO.Allowable_PKeyId = Modelobj.Allowable_PKeyId;
    ANYDTO.Allowable_Name = Modelobj.Allowable_Name;
    ANYDTO.Allowable_StartDate = Modelobj.Allowable_StartDate;
    ANYDTO.Allowable_EndDate = Modelobj.Allowable_EndDate;
    ANYDTO.Allowable_OverallAllowables = Modelobj.Allowable_OverallAllowables;
    ANYDTO.Allowable_CompanyId = Modelobj.Allowable_CompanyId;
    ANYDTO.Allowable_IsActive = Modelobj.Allowable_IsActive;
    ANYDTO.Allowable_IsDelete = Modelobj.Allowable_IsDelete;
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.AllowablesArray = Modelobj.AllowablesArray;
    ANYDTO.Allowable_Cust_ID = Modelobj.Allowable_Cust_ID;

  
    if (Modelobj.Type != 3) {
      ANYDTO.Type = 1;

      if (Modelobj.Allowable_PKeyId != 0) {
        ANYDTO.Type = 2;
      }
      if (Modelobj.Allowable_IsDelete) {
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
  
  private getapiUrl = BaseUrl + environment.Admin.GetAllowablecatDRD;
  public GetAllowableCategoryDRD() {
    let ANYDTO: any = {};
    ANYDTO.Type = 1;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.getapiUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private docpostUrl = BaseUrl + environment.Admin.AllowablesFilterSave;
  public AddUpdateFilterAdminAllowableData(Modelobj: AllowablesDetails) {
    let ANYDTO: any = {};
    ANYDTO.Filter_Admin_Allowable_PkeyId = Modelobj.Allowable_PKeyId,
    ANYDTO.Filter_Admin_Allowable_Name = Modelobj.Allowable_Name,
    ANYDTO.Filter_Admin_Allowable_StartDate = Modelobj.Allowable_StartDate,
    ANYDTO.Filter_Admin_Allowable_EndDate = Modelobj.Allowable_EndDate,
    ANYDTO.Filter_Admin_Allowable_OverallAllowables = Modelobj.Allowable_OverallAllowables,
    ANYDTO.Filter_Admin_Allowable_Isallowable = Modelobj.Allowable_IsActive,
    ANYDTO.Filter_Admin_Allowable_IsActive = true,
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

  private DelAplGet = BaseUrl + environment.Admin.DeleteAllowablesChildDetails;
  public DeleteAllowablesChildDetail(Modelobj:AllowablesDetails) {
    //debugger
    let ANYDTO: any = {};
    ANYDTO.Allow_Child_PkeyId = Modelobj.Allowable_PKeyId;
    ANYDTO.Type = Modelobj.Type;
  
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.DelAplGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

}
