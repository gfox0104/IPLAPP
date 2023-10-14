import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { ImportWorkOrderQueueDetailsModel } from './order-queue-detail-model'
import { environment } from "../../../../../environments/environment";
import { HomepageServices } from "../../../home/home.service";

@Injectable({
  providedIn: "root"
})

export class ImportWorkOrderQueueDetailServices {
  public token: any;
  baseUrl: string = environment.domain;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlimGet = this.baseUrl + environment.WorkOrder.GetWOImportQueueTrans;
  public WorkOrderimportQueueData(Modelobj: ImportWorkOrderQueueDetailsModel) {
    debugger
    var ANYDTO: any = {};
    ANYDTO.Imrt_PkeyId = 0;
    var obj = {
      WI_ImportFrom:Modelobj.WI_ImportFrom,
      ClientId: Modelobj.ClentId,
      WI_FriendlyName: Modelobj.WI_FriendlyName,
    };
    ANYDTO.FilterData = JSON.stringify(obj);
    ANYDTO.PageNumber = Modelobj.PageNumber;
    ANYDTO.NoofRows = Modelobj.NoofRows;
    ANYDTO.Type = 4;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlimGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // for Import Queue Delete
  private apiUrldel = this.baseUrl + environment.WorkOrder.DeleteWOImportQueueTrans;
  public DeleteWorkOrderimportQueueData(Modelobj: ImportWorkOrderQueueDetailsModel) {
    var ANYDTO: any = {};
    ANYDTO.Imrt_PkeyId = Modelobj.Imrt_PkeyId;
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

  private apiUrlchk = this.baseUrl + environment.WorkOrder.PostWOImportQueueTrans;
  public CheckNowWorkOrderimportQueueData(Modelobj: ImportWorkOrderQueueDetailsModel) {
    // debugger
    var ANYDTO: any = {};
    ANYDTO.Imrt_PkeyId = Modelobj.Imrt_PkeyId;
    ANYDTO.Imrt_Wo_Import_ID = Modelobj.Imrt_Wo_Import_ID;
    ANYDTO.Imrt_Import_From_ID = Modelobj.Imrt_Import_From_ID;
    ANYDTO.Type = 5;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlchk, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  private apiUrlch = this.baseUrl + environment.WorkOrder.GetClientForImport;
  public ChangeImportClient(Modelobj: ImportWorkOrderQueueDetailsModel) {
    var ANYDTO: any = {};
    ANYDTO.WI_ImportFrom = Modelobj.WI_ImportFrom;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlch, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  dataItem: any;
  saveDataItem(val) {
  ////dfebugger
    this.dataItem = val;
  }

  getDataItem() {
    return  this.dataItem;
  }
}
