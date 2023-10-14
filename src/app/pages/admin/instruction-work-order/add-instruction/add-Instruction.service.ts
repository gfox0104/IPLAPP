import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { AddInstructionModel } from './add-instruction-model';
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import { ViewInstructionModel } from '../view-instruction/view-Instruction-model';
import {environment} from '../../../../../environments/environment'

@Injectable({
  providedIn: "root"
})
export class AddInstructionServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlPOST = BaseUrl + environment.Admin.PostInstruction;
  public AutoInstructionDataPost(Modelobj: AddInstructionModel) {
    debugger
    var ANYDTO: any = {};

    ANYDTO.Inst_Task_pkeyId = Modelobj.Inst_Task_pkeyId;
    ANYDTO.Inst_Task_Type_pkeyId = Modelobj.Inst_Task_Type_pkeyId;
    ANYDTO.Inst_Task_Name = Modelobj.Inst_Task_Name;
    ANYDTO.Inst_Task_Desc = Modelobj.Inst_Task_Desc;
    ANYDTO.Inst_Task_IsActive = Modelobj.Inst_Task_IsActive;
    ANYDTO.Inst_Task__IsDelete = Modelobj.Inst_Task_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Instruction_Json_PkeyId = Modelobj.Instruction_Json_PkeyId;
    ANYDTO.AutoAssinArray = Modelobj.AutoAssinArray;
    ANYDTO.Inst_Task_IsAutoAssign = Modelobj.Inst_Task_IsAutoAssign;


    if (Modelobj.Type != 3) {
      ANYDTO.Type = 1;

      if (Modelobj.Inst_Task_pkeyId != 0) {
        ANYDTO.Type = 2;
      }
      if (Modelobj.Inst_Task_IsDelete) {
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

  private apiUrldrd = BaseUrl + environment.Admin.GetFormsDrd;
  public DropdownDataPost(Modelobj: AddInstructionModel) {
    var ANYDTO: any = {};

    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrldrd, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiUrlGet12 = BaseUrl + environment.Admin.DeleteIntruction;

  public DeleteInstructionData(Modelobj: AddInstructionModel) {
    var ANYDTO: any = {};
    ANYDTO.Inst_Task_pkeyId =  Modelobj.Inst_Task_pkeyId;
    ANYDTO.Inst_Task_Type_pkeyId =  3;
    ANYDTO.Type =  4

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet12, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

}
