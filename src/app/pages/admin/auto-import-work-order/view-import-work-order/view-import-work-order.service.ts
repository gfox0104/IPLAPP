import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { viewAutoImportWorkorderModel } from './view-import-work-order-model'
import { BaseUrl } from "src/app/services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import {environment} from '../../../../../environments/environment'
@Injectable({
  providedIn: "root"
})

export class ViewAutoImportWoService {

  public token: any;
  pathParam: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlautoGet = BaseUrl + environment.Admin.GetWorkOderImport;

  public ViewAutoImportData(Modelobj: viewAutoImportWorkorderModel) {
    var ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.WI_Pkey_ID = Modelobj.WI_Pkey_ID;

    var obj = {
      Import_Form_Name: Modelobj.Import_Form_Name,
      WI_LoginName: Modelobj.WI_LoginName,
      Client_Company_Name: Modelobj.Client_Company_Name,
      WI_FriendlyName: Modelobj.WI_FriendlyName,
      WI_IsActive: Modelobj.WI_IsActive,
      WI_Createdby: Modelobj.WI_Createdby,
      WI_Modifiedby:Modelobj.WI_Modifiedby

    };

    ANYDTO.FilterData = JSON.stringify(obj);

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlautoGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // Add/update Instruction filter
  private docpostUrl = BaseUrl + environment.Admin.SaveAutoImportFilter;
  public AddUpdateFilterAdminImportData(Modelobj: viewAutoImportWorkorderModel) {
    let ANYDTO: any = {};
    ANYDTO.Import_Filter_PkeyID = Modelobj.WI_Pkey_ID;
    ANYDTO.Import_Filter_ImpFromID = Modelobj.Import_Form_Name;
    ANYDTO.Import_Filter_ImpName = Modelobj.WI_FriendlyName;
    ANYDTO.Import_Filter_ClientName = Modelobj.Client_Company_Name;
    ANYDTO.Import_Filter_LoginName = Modelobj.WI_LoginName
    ANYDTO.Import_Filter_ImpIsActive = Modelobj.WI_IsActive
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

  setPathParam(param) {
    this.pathParam = param;
  }

  getPathParam() {
    return this.pathParam;
  }
}
