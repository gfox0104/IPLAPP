import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { HomepageServices } from "src/app/pages/home/home.service";
import { BaseUrl } from "src/app/services/apis/rest-api";
import { environment } from "src/environments/environment";
import { PropertyLockReasonMaster } from "./property-lock-reason.model";


@Injectable({
    providedIn: "root"
  })

export class PropertyLockReasonService{
  public token: any;
  constructor(private http:HttpClient, private route:Router,private xHomepageServices: HomepageServices){
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

 private apiUrlGet = BaseUrl + environment.Admin.GetPropertyLockReasonMaster ;
 public GetPropertyLockReason(Modelobj: PropertyLockReasonMaster) {
    var ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.LockReason_PkeyID = Modelobj.LockReason_PkeyID;
    var obj = {
      LockReason_Name : Modelobj.LockReason_Name,
      LockReason_IsActive: Modelobj.LockReason_IsActive,
      LockReason_CreatedBy: Modelobj.LockReason_CreatedBy,
      LockReason_ModifiedBy: Modelobj.LockReason_ModifiedBy
    };

    ANYDTO.FilterData = JSON.stringify(obj);
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  private apiUrlPOST = BaseUrl + environment.Admin.PostPropertyLockReasonMaster;
  public PostPropertyLockReason(Modelobj:PropertyLockReasonMaster){
    //debugger;
    let ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type
    ANYDTO.LockReason_PkeyID = Modelobj.LockReason_PkeyID;
    ANYDTO.LockReason_Name = Modelobj.LockReason_Name;
    ANYDTO.LockReason_IsActive = Modelobj.LockReason_IsActive;
    ANYDTO.LockReason_IsDelete = Modelobj.LockReason_IsDelete;

    if (Modelobj.Type != 3) {
      ANYDTO.Type = 1;
      if (Modelobj.LockReason_PkeyID != 0) {
        ANYDTO.Type = 2;
      }
      if (Modelobj.LockReason_IsDelete) {
        ANYDTO.Type = 4;
      }
    }
    else{
      ANYDTO.Type = 3;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this.http
    .post<any>(this.apiUrlPOST, ANYDTO, { headers: headers })
    .pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
      );
    }
  }
