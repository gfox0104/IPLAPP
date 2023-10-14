
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { AddInvoiceItemsModel, StateDetail, TaskDocDetail } from './add-invoice-item-model';
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import {environment} from '../../../../../environments/environment';
@Injectable({
  providedIn: "root"
})

export class AddInvoiceItemsServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlPOST = BaseUrl + environment.Admin.PostTaskFilter;
  public FilterDataPost(Modelobj: AddInvoiceItemsModel) {
    var ANYDTO: any = {};
    ANYDTO.Task_pkeyID = Modelobj.Task_pkeyID;
    ANYDTO.ArrayCustomPriceFilter = Modelobj.ArrayCustomPriceFilter;
    ANYDTO.ArrayDocument = Modelobj.ArrayDocument;
    ANYDTO.AutoAssignTask = Modelobj.AutoAssignTask;
    ANYDTO.ArrayPreset = Modelobj.ArrayPreset;
    ANYDTO.TaskPhotoSetting = Modelobj.TaskPhotoSetting;
    ANYDTO.Task_File_Array = Modelobj.Task_File_Array;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;

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

  private apiUrlPOSTx = BaseUrl + environment.Admin.GetTaskFilter;
  public FilterDataGet(Modelobj: AddInvoiceItemsModel) {
    var ANYDTO: any = {};
    ANYDTO.Task_pkeyID = Modelobj.Task_pkeyID;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOSTx, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrldel = BaseUrl + environment.Admin.DeleteTaskSettChild;
  public Deletetaskchild(Modelobj: AddInvoiceItemsModel) {
    var ANYDTO: any = {};
    ANYDTO.Task_sett_pkeyID = Modelobj.Task_sett_pkeyID;
    ANYDTO.Type = 4;

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

  private apiUrldel2 = BaseUrl + environment.Admin.DeleteWorkTypeTaskChild;
  public Deletetaskchilddetail(Modelobj: AddInvoiceItemsModel) {
    var ANYDTO: any = {};
    ANYDTO.WT_Task_pkeyID = Modelobj.WT_Task_pkeyID;
    ANYDTO.Type = 4;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrldel2, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlDelte = BaseUrl + environment.Admin.DeletePreset;
  public PreTextDeleteDataPost(Modelobj: AddInvoiceItemsModel) {
    let ANYDTO: any = {};
    ANYDTO.Task_Preset_pkeyId = Modelobj.Task_Preset_pkeyId;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 4;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlDelte, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrl = BaseUrl + environment.Admin.AssignTaskDoc;
  public assinedocinstPost(Modelobj: TaskDocDetail) {
    let ANYDTO: any = {};
    ANYDTO.TMF_Task_Pkey = Modelobj.TMF_Task_Pkey;
    ANYDTO.TMF_Task_IsDelete = Modelobj.TMF_Task_IsDelete;
    ANYDTO.Type = 4;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //status update for instruction
  private apiUrlstatus = BaseUrl + environment.Admin.TaskdocUpdateInst;
  public docupdatestatus(Modelobj: AddInvoiceItemsModel) {
    var ANYDTO: any = {};
    ANYDTO.DocStatusArray = Modelobj.docarr;
    ANYDTO.Type = 5;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlstatus, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  //get county details
  private apiUrlcounty = BaseUrl + environment.Admin.GetCountyState;
  public getCountydetails(Modelobj: StateDetail) {
    var ANYDTO: any = {};
    ANYDTO.StateMaster = Modelobj.StateMaster;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlcounty, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

}
