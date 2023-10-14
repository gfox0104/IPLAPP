import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { GeneralWorkOrderSettingsModel, WorkOrderSettingsPageModel } from './work-order-settings-model';
import { BaseUrl } from '../../../services/apis/rest-api';
import { HomepageServices } from '../../home/home.service';
import {environment} from '../../../../environments/environment'
@Injectable({
  providedIn: "root"
})
export class WorkOrderSettingsPageServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  // get user data
  private apiUrlPOST = BaseUrl + environment.Admin.PostWorkOrderSetting;

  public FirstDataPost(Modelobj: WorkOrderSettingsPageModel) {
    var ANYDTO: any = {};
    ANYDTO.WO_Sett_pkeyID = Modelobj.WO_Sett_pkeyID;
    ANYDTO.WO_Sett_CompanyID = Modelobj.WO_Sett_CompanyID;
    ANYDTO.WO_Sett_Allow_Dup_Num = Modelobj.WO_Sett_Allow_Dup_Num;
    ANYDTO.WO_Sett_Auto_Inc_GoBack = Modelobj.WO_Sett_Auto_Inc_GoBack;
    ANYDTO.WO_Sett_Auto_Inc_NeedInfo = Modelobj.WO_Sett_Auto_Inc_NeedInfo;
    ANYDTO.WO_Sett_Auto_Inc_Dup = Modelobj.WO_Sett_Auto_Inc_Dup;
    ANYDTO.WO_Sett_Auto_Inc_Recurring = Modelobj.WO_Sett_Auto_Inc_Recurring;
    ANYDTO.WO_Sett_Auto_Assign = Modelobj.WO_Sett_Auto_Assign;
    ANYDTO.WO_Sett_Detect_Pricing = Modelobj.WO_Sett_Detect_Pricing;
    ANYDTO.WO_Sett_Remove_Doller = Modelobj.WO_Sett_Remove_Doller;
    ANYDTO.WO_Sett_IsActive = Modelobj.WO_Sett_IsActive;
    ANYDTO.Wo_Sett_Comapny_SAlert = Modelobj.Wo_Sett_Comapny_SAlert;
    ANYDTO.Wo_Sett_Custom_Titlebar = Modelobj.Wo_Sett_Custom_Titlebar;
    ANYDTO.Wo_Sett_Default_Time = Modelobj.Wo_Sett_Default_Time;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;

    if (Modelobj.WO_Sett_pkeyID != 0) {
      ANYDTO.Type = 2;
    }
    if (Modelobj.WO_Sett_IsDelete) {
      ANYDTO.Type = 4;
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

  private apiUrlPOST2 = BaseUrl + environment.Admin.GenralSetting;

  public SecondGWDataPost(Modelobj2: GeneralWorkOrderSettingsModel) {
    var ANYDTO: any = {};
    ANYDTO.GW_Sett_pkeyID = Modelobj2.GW_Sett_pkeyID;
    ANYDTO.GW_Sett_CompanyID = Modelobj2.GW_Sett_CompanyID;
    ANYDTO.GW_Sett_Field_Complete = Modelobj2.GW_Sett_Field_Complete;
    ANYDTO.GW_Sett_Allow_Contractor = Modelobj2.GW_Sett_Allow_Contractor;
    ANYDTO.GW_Sett_Assigned_Unread = Modelobj2.GW_Sett_Assigned_Unread;
    ANYDTO.GW_Sett_Allow_Estimated = Modelobj2.GW_Sett_Allow_Estimated;
    ANYDTO.GW_Sett_Require_Estimated = Modelobj2.GW_Sett_Require_Estimated;
    ANYDTO.GW_Sett_Sent_Ass_Cooradinator = Modelobj2.GW_Sett_Sent_Ass_Cooradinator;
    ANYDTO.GW_Sett_Sent_Ass_Processor = Modelobj2.GW_Sett_Sent_Ass_Processor;
    ANYDTO.GW_Sett_Sent_Email_Multiple = Modelobj2.GW_Sett_Sent_Email_Multiple;
    ANYDTO.GW_Sett_StaffName = Modelobj2.GW_Sett_StaffName;
    ANYDTO.GW_Sett_IsActive = Modelobj2.GW_Sett_IsActive;
    ANYDTO.Type = Modelobj2.UserID;
    ANYDTO.Type = 1;

    if (Modelobj2.GW_Sett_pkeyID != 0) {
      ANYDTO.Type = 2;
    }
    if (Modelobj2.GW_Sett_IsDelete) {
      ANYDTO.Type = 4;
    }

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOST2, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  private apiUrlGet = BaseUrl + environment.Admin.GetWorkOrderSetting;

  public GetWorkOrderSettingData(Modelobj: WorkOrderSettingsPageModel) {
  ////dfebugger;
    var ANYDTO: any = {};
    ANYDTO.Type = 3;
    ANYDTO.WO_Sett_pkeyID = Modelobj.WO_Sett_pkeyID;

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
  private apiUrlGetGS = BaseUrl + environment.Admin.GetGenralSetting;

  public GetGeneralWorkOrderSettingData(Modelobj: GeneralWorkOrderSettingsModel) {
  ////dfebugger;
    var ANYDTO: any = {};
    ANYDTO.Type = 3;
    ANYDTO.GW_Sett_pkeyID = Modelobj.GW_Sett_pkeyID;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetGS, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
