import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { ImportWorkOrderDataModel } from './order-import-queue-model';
import { ImportWorkOrderQueueDetailsModel } from '../auto-import-order/order-queue-detail-model';
import { environment } from "../../../../../environments/environment";
import { HomepageServices } from "../../../home/home.service";

@Injectable({
  providedIn: "root"
})

export class WorkOrderImportQueueServices {
  public token: any;
  baseUrl = environment.domain;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlqueueGet = this.baseUrl + "api/WorkOrderImport/GetWorkOrderQueuedata";
  public importQueuedata(Modelobj: ImportWorkOrderQueueDetailsModel) {
    debugger
    var ANYDTO: any = {};
    ANYDTO.Imrt_PkeyId = Modelobj.Imrt_PkeyId;
    ANYDTO.WhereClause = Modelobj.WhereClause;
    ANYDTO.PageNumber = Modelobj.PageNumber;
    ANYDTO.NoofRows = Modelobj.NoofRows;
    ANYDTO.Type = 3;
    ANYDTO.Imrt_Import_From_ID = Modelobj.Imrt_Import_From_ID;
    ANYDTO.Imrt_Wo_WTIDName = Modelobj.Imrt_Wo_WTIDName;
    ANYDTO.Imrt_Wo_CatIDName = Modelobj.Imrt_Wo_CatIDName;
    ANYDTO.Imrt_Wo_Number = Modelobj.Imrt_Wo_Number;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlqueueGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // Import workOder Data on button click
  private apiUrlwoda = this.baseUrl + "api/WorkOrderImport/PostImportWorkOderDetailData";
  public ImportWorkOrderDetailsData(Modelobj: ImportWorkOrderDataModel) {
    // //dfebugger
  
    var ANYDTO: any = {};
    ANYDTO.ImportWoArray = Modelobj.ImportWoArray;
   
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = 1;
    ANYDTO.Imrt_Import_From_ID = Modelobj.Imrt_Import_From_ID;
    ANYDTO.Imrt_PkeyId = Modelobj.Imrt_PkeyId;
    ANYDTO.Imrt_Wo_Import_ID = Modelobj.Imrt_Wo_Import_ID;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlwoda, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
