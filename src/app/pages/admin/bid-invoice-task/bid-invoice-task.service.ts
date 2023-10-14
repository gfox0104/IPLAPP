
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { BidInvoiceItemViewTaskModel } from './bid-invoice-task-model'
import { BaseUrl } from "../../../services/apis/rest-api";
import { HomepageServices } from "../../home/home.service";
  import {environment} from '../../../../environments/environment';


@Injectable({
  providedIn: "root"
})
export class BidInvoiceItemViewTaskServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlGet = BaseUrl + environment.Admin.GetTask;

  public ViewTaskMasterData(Modelobj: BidInvoiceItemViewTaskModel) {
    var ANYDTO: any = {};
    ANYDTO.Task_pkeyID = Modelobj.Task_pkeyID;
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.WorkOrderID = Modelobj.WorkOrderID
    if (Modelobj.Task_pkeyID != 0) {
      ANYDTO.Type = 2;
    }
    var obj = {
      Task_Name: Modelobj.Task_Name,
      Task_Photo_Label_Name: Modelobj.Task_Photo_Label_Name,
      Task_Type: Modelobj.Task_Type,
      Task_IsActive: Modelobj.Task_IsActive,
      Task_CreatedBy: Modelobj.Task_CreatedBy,
      Task_ModifiedBy: Modelobj.Task_ModifiedBy,
    };

    ANYDTO.FilterData = JSON.stringify(obj);

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

  // Add/update Task filter
  private docpostUrl = BaseUrl + environment.Admin.SaveFilterTask;
  public AddUpdateFilterAdminTaskData(Modelobj: BidInvoiceItemViewTaskModel) {
    let ANYDTO: any = {};
    ANYDTO.Task_Filter_PkeyID = Modelobj.Task_pkeyID;
    ANYDTO.Task_Filter_TaskName = Modelobj.Task_Name;
    ANYDTO.Task_Filter_TaskType = Modelobj.Task_Type;
    ANYDTO.Task_Filter_TaskPhName = Modelobj.Task_Photo_Label_Name;
    ANYDTO.Task_Filter_TaskIsActive = Modelobj.Task_IsActive;
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
