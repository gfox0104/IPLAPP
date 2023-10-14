
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { Task_GroupPopupModel, BidInvoiceItemModel } from './bid-invoice-item-model';
import { BaseUrl } from '../../../../services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import {environment} from '../../../../../environments/environment';
@Injectable({
  providedIn: "root"
})

export class BidInvoiceItemServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }


  private apiUrlPOST = BaseUrl + environment.Admin.PostTask;

  public TaskMasterPost(Modelobj: BidInvoiceItemModel) {
    // debugger
    var ANYDTO: any = {};
    ANYDTO.Task_pkeyID = Modelobj.Task_pkeyID;
    ANYDTO.Task_Type = Modelobj.Task_Type;
    ANYDTO.Task_Name = Modelobj.Task_Name;
    ANYDTO.Task_Group = Modelobj.Task_Group;
    ANYDTO.Task_Contractor_UnitPrice = Modelobj.Task_Contractor_UnitPrice;
    ANYDTO.Task_UOM = Modelobj.Task_UOM;
    ANYDTO.Task_Client_UnitPrice = Modelobj.Task_Client_UnitPrice;
    ANYDTO.Task_Photo_Label_Name = Modelobj.Task_Photo_Label_Name;
    ANYDTO.Task_IsActive = Modelobj.Task_IsActive;
    ANYDTO.Task_AutoInvoiceComplete = Modelobj.Task_AutoInvoiceComplete;
    ANYDTO.Task_File_Array = Modelobj.Task_File_Array;
    ANYDTO.Task_Flat_Free = Modelobj.Task_Flat_Free;
    ANYDTO.Task_Price_Edit = Modelobj.Task_Price_Edit;
    ANYDTO.Task_Disable_Default = Modelobj.Task_Disable_Default;
    ANYDTO.Task_Auto_Assign = Modelobj.Task_Auto_Assign;

    ANYDTO.UserID = Modelobj.UserID;

    if (Modelobj.Type != 3) {

       ANYDTO.Type = 1;

      if (Modelobj.Task_pkeyID != 0) {
        ANYDTO.Type = 2;
      }
      if (Modelobj.Task_IsDelete) {
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

  private apiUrlPOST3 = BaseUrl + environment.Admin.PostTaskGroup;

  public TaskGroupPOPUPPost(Modelobj3: Task_GroupPopupModel) {
    // debugger
    var ANYDTO: any = {};
    ANYDTO.Task_Group_pkeyID = Modelobj3.Task_Group_pkeyID;
    ANYDTO.Task_Group_Name = Modelobj3.Task_Group_Name;
    ANYDTO.Task_Group_Client_pkeyID = Modelobj3.Task_Group_Client_pkeyID;
    ANYDTO.Task_GroupNameArr = Modelobj3.Task_Group_NameArray;
    ANYDTO.Task_Group_IsActive = Modelobj3.Task_Group_IsActive;
    ANYDTO.Task_Group_Client_data = Modelobj3.Task_Group_Client_data;
    ANYDTO.UserID = Modelobj3.UserID;
    ANYDTO.Type = Modelobj3.Type

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

  //Get Task group
  private apiUrlGet6 = BaseUrl + environment.Admin.GetTaskGroup;

  public GetTaskGroupDetailsDropdownGet() {
    // debugger
    var ModelDTO: any = {};
    ModelDTO.Task_Group_pkeyID = 0;
    ModelDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet6, ModelDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
