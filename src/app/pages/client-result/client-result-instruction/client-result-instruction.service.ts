import { Injectable } from "@angular/core";
import { throwError, from } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import {
  ClientResultInstructionModel, InstructionMasterDrDNameModel,
  InstructionMasterTaskTypeModel, InstructionAcessLogModel,
  InstructionMasterTaskModel
} from './client-result-instruction-model';
import { environment } from '../../../../environments/environment';
import { HomepageServices } from '../../home/home.service';

@Injectable({
  providedIn: "root"
})

export class ClientResultInstructionServices {
  public Errorcall;
  public token: any;
  baseUrl = environment.domain;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  // get Dropdown for Type
  private apiUrlGet = this.baseUrl + environment.ClientResult.GetInstructionType;
  public InstructionTypeName(Modelobj: InstructionMasterTaskTypeModel) {
    let ANYDTO: any = {};
    ANYDTO.Ins_Type_pkeyId = Modelobj.Ins_Type_pkeyId;
    ANYDTO.Type = Modelobj.Type;

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

  // get Dropdown for Type Name
  private apiUrltaskGet = this.baseUrl + environment.ClientResult.GetInstructionTask;
  public InstructionTaskTypeName(Modelobj: InstructionMasterTaskModel) {
    debugger
    let ANYDTO: any = {};
    ANYDTO.Task_pkeyID = Modelobj.Task_pkeyID;
    ANYDTO.Inst_Task_pkeyId = Modelobj.Inst_Task_pkeyId;
    ANYDTO.WorkOrderID = Modelobj.WorkOrderID;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrltaskGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // get Dropdown for Task Name
  private apiUrltaskNameGet = this.baseUrl + environment.ClientResult.GetInstructionTaskName;
  public InstructionTaskNamedata(Modelobj: InstructionMasterDrDNameModel) {
    ////dfebugger
    let ANYDTO: any = {};
    ANYDTO.Inst_Task_pkeyId = 2;
    ANYDTO.WorkOrderID = Modelobj.WorkOrderID;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrltaskNameGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          //debugger
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // get Dropdown for Task Name
  private PostInstrdct = this.baseUrl + environment.ClientResult.PostDeleteInstruction;
  public DeleteInstructionPost(Modelobj: ClientResultInstructionModel) {
    let ANYDTO: any = {};
    ANYDTO.Instr_pkeyId = Modelobj.Instr_pkeyId;
    ANYDTO.Instr_WO_Id = Modelobj.Instr_WO_Id;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.PostInstrdct, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private PostInstruct = this.baseUrl + environment.ClientResult.PostInstructionClient;
  public InstructionPost(Modelobj: ClientResultInstructionModel) {
    debugger
    let ANYDTO: any = {};

    ANYDTO.InstctionMasterDTO = Modelobj.InstructionDataArray;
    ANYDTO.Instruction_Master_ChildDTO = Modelobj.SingleEditBox;
    // ANYDTO.Instruction_Master_ChildDTO  = Modelobj.Instr_Comand_Mobile;
    ANYDTO.Instr_WO_Id = Modelobj.Instr_WO_Id;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.PostInstruct, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // get Dropdown for Task Name
  private GetInstructMain = this.baseUrl + environment.ClientResult.GetInstruction;
  public InstructionGetMain(Modelobj: ClientResultInstructionModel) {
    let ANYDTO: any = {};
    ANYDTO.Instr_pkeyId = Modelobj.Instr_pkeyId;
    ANYDTO.Instr_WO_Id = Modelobj.Instr_WO_Id;
    ANYDTO.Type = 2;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.GetInstructMain, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  //  Get Acess log Data
  private GetAccessLog = this.baseUrl + environment.ClientResult.GetNewAccessLogData;
  public InsructionAcessLogData(Modelobj: InstructionAcessLogModel) {
    let ANYDTO: any = {};
    ANYDTO.Access_PkeyID = Modelobj.Alm_Pkey;
    ANYDTO.Access_WorkerOrderID = Modelobj.Alm_workOrder_ID;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.GetAccessLog, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
 // delete file instruction
 private Getinsfile = this.baseUrl + environment.ClientResult.DeleteInstructionFile;
 public delinstructionfile(Modelobj: InstructionAcessLogModel) {
   let ANYDTO: any = {};
   ANYDTO.Client_Result_Photo_ID = Modelobj.Inst_Doc_PkeyID;
   ANYDTO.Type = 4;

   let headers = new HttpHeaders({ "Content-Type": "application/json" });
   headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
   return this._http
     .post<any>(this.Getinsfile, ANYDTO, { headers: headers })
     .pipe(
       tap(data => {
         return data;
       }),
       catchError(this.xHomepageServices.CommonhandleError)
     );
 }

}
