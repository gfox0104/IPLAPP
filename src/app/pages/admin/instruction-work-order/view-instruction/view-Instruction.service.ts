import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { ViewInstructionModel } from './view-Instruction-model'
import { BaseUrl } from "../../../../services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import {environment} from '../../../../../environments/environment'
@Injectable({
  providedIn: "root"
})

export class ViewInstructionServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlGet = BaseUrl + environment.Admin.GetAutoInstruction;

  public ViewInstructionData(Modelobj: ViewInstructionModel) {
    //debugger;
    var ANYDTO: any = {};
    ANYDTO.Inst_Task_pkeyId =  Modelobj.Inst_Task_pkeyId;
    ANYDTO.Inst_Task_Type_pkeyId =  3;
    ANYDTO.Type =  Modelobj.Type;
   

    var obj = {
      Inst_Task_Name: Modelobj.Inst_Task_Name,
      Inst_Task_Desc: Modelobj.Inst_Task_Desc,
      Inst_Task_IsActive: Modelobj.Inst_Task_IsActive,
      Inst_Task_CreatedBy: Modelobj.Inst_Task_CreatedBy,
      Inst_Task_ModifiedBy: Modelobj.Inst_Task_ModifiedBy
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

  // Add/update Instruction filter
  private docpostUrl = BaseUrl + environment.Admin.SaveFilterInstruction;
  public AddUpdateFilterAdminInstructionData(Modelobj: ViewInstructionModel) {
    let ANYDTO: any = {};
    ANYDTO.Ins_Filter_PkeyID = Modelobj.Inst_Task_pkeyId;
    ANYDTO.Ins_Filter_InsName = Modelobj.Inst_Task_Name;
    ANYDTO.Ins_Filter_InsDesc = Modelobj.Inst_Task_Desc;
    ANYDTO.Ins_Filter_InsIsActive = Modelobj.Inst_Task_IsActive;
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
