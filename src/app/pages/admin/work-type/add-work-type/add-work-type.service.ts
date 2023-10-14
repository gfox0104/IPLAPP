import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { AddCategoryModel } from './add-work-type-model';
import { BaseUrl } from '../../../../services/apis/rest-api';
import { CategoryPopupModel } from './add-work-type-model';
import { WorkTypeAutoInvoice } from './add-work-type-model';
import { HomepageServices } from '../../../home/home.service';
import{environment} from '../../../../../environments/environment';
@Injectable({
  providedIn: "root"
})

export class AddCategoryServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  // get user data
  private apiUrlPOST = BaseUrl + environment.Admin.PostWorkType;

  public WorkCategoryPost(Modelobj: AddCategoryModel) {
  ////dfebugger
    var ANYDTO: any = {};
    ANYDTO.WT_pkeyID = Modelobj.WT_pkeyID;
    ANYDTO.WT_WorkType = Modelobj.WT_WorkType;
    ANYDTO.WT_CategoryID = Modelobj.WT_CategoryID;
    ANYDTO.WT_CategoryMultiple = Modelobj.WT_CategoryMultiple;
    ANYDTO.WT_YardMaintenance = Modelobj.WT_YardMaintenance;
    ANYDTO.WT_Active = Modelobj.WT_Active;
    ANYDTO.WT_Always_recurring = Modelobj.WT_Always_recurring;
    ANYDTO.WT_Recurs_Every = Modelobj.WT_Recurs_Every;
    ANYDTO.WT_Recurs_WeekID = Modelobj.WT_Recurs_WeekID;
    ANYDTO.WT_Limit_to = Modelobj.WT_Limit_to;
    ANYDTO.WT_Cutoff_Date = Modelobj.WT_Cutoff_Date;
    ANYDTO.WT_WO_ItemID = Modelobj.WT_WO_ItemID;
    ANYDTO.WT_Contractor_AssignmentID = Modelobj.WT_Contractor_AssignmentID;
    ANYDTO.WT_Ready_for_FieldID = Modelobj.WT_Ready_for_FieldID;
    ANYDTO.WT_IsInspection = Modelobj.WT_IsInspection;
    ANYDTO.WT_AutoInvoice = Modelobj.WT_AutoInvoice;
    ANYDTO.WT_IsActive = Modelobj.WT_IsActive;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.WT_assign_upon_comple = Modelobj.WT_assign_upon_comple;
     ANYDTO.WT_Template_Id = Modelobj.WT_Template_Id;

    if(Modelobj.Type!=6)
    {
      if (Modelobj.Type != 3) {
        ANYDTO.Type = 1;
        if (Modelobj.WT_pkeyID != 0) {
          ANYDTO.Type = 2;
        }
      }
      else{
        ANYDTO.Type = 3;
      }
    }
    else
    {
      ANYDTO.Type = 6;
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



  private apiUrlPOST3 = BaseUrl + environment.Admin.PostWTInv;

  public WorkCategoryMasterInvoicePost(Modelobj3: WorkTypeAutoInvoice) {
    var ANYDTO: any = {};
    ANYDTO.Auto_Inv_Itm_PkeyID = Modelobj3.Auto_Inv_Itm_PkeyID;
    ANYDTO.Auto_Inv_Itm_StringArr = Modelobj3.Auto_Inv_Itm_StringArr;
    ANYDTO.Auto_Inv_Itm_WorkTypeID = Modelobj3.Auto_Inv_Itm_WorkTypeID;
    ANYDTO.UserID = Modelobj3.UserID;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOST3, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // post pop category
  private apiUrlPOST1 = BaseUrl + environment.Admin.PostWorkTypecat;

  public WorkCategoryPOPUPPost(Modelobj1: any) {
    var ANYDTO: any = {};
    ANYDTO.Work_Type_Cat_pkeyID = Modelobj1.Work_Type_Cat_pkeyID;
    ANYDTO.Work_Type_Name = Modelobj1.Work_Type_Name;
    ANYDTO.Work_Type_IsActive = Modelobj1.Work_Type_IsActive;
    ANYDTO.Work_Type_Client_pkeyID = Modelobj1.Work_Type_Client_pkeyID;
    ANYDTO.Work_Type_NameArr = Modelobj1.Work_Type_NameArr;
    ANYDTO.UserID = Modelobj1.UserID;
    ANYDTO.Type = Modelobj1.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOST1, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //delete work type cat
  private apiUrldel = BaseUrl + environment.Admin.DeleteWorkType;

  public DeleteWorkCategoryPOPUP(Modelobj1: CategoryPopupModel) {
    var ANYDTO: any = {};
    ANYDTO.Work_Type_Cat_pkeyID = Modelobj1.Work_Type_Cat_pkeyID;
    ANYDTO.Type = Modelobj1.Type;
    ANYDTO.Work_Type_IsActive = Modelobj1.Work_Type_IsActive;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrldel, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
