import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { ClientResultsInvoiceModel, Invoice_ContractorDTO, Invoice_ClientDTO, scorecardDTO } from './client-results-invoice-model';
import { environment } from '../../../../environments/environment';
import { HomepageServices } from '../../home/home.service';
import { CommonStatusDTO } from '../common-client-header/common-status-model';
import { DropdownModel } from '../../models/dropdown-model';
@Injectable({
  providedIn: "root"
})
export class ClientResultsInvoiceServices {

  private token: any;
  baseUrl = environment.domain;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlPOST = this.baseUrl + "";


  public ContractorInvoicePost(Modelobj: ClientResultsInvoiceModel) {
    var ANYDTO: any = {};
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

  private apiUrlPOST2 = this.baseUrl + environment.ClientResult.GetClientResultInvoiceWOIDAutoCom;
  public ContractorClientGetInvoiceData(Modelobj: ClientResultsInvoiceModel) {
    // debugger
    var ANYDTO: any = {};
    ANYDTO.Inv_Con_Wo_ID = Modelobj.workOrder_ID;
    ANYDTO.Type = 1;

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

  //taskdrd
  private apiUrlGet10 = this.baseUrl + environment.ClientResult.GetDropDownData;

  public DropdownGetClientResult(Modelobj: DropdownModel) {
    // debugger
    let ANYDTO: any = {};
    ANYDTO.WorkOrderID = Modelobj.WorkOrderID;
    ANYDTO.WorkOrderID_mul = Modelobj.WorkOrderID_mul;
    ANYDTO.Type = Modelobj.Type;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet10,ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // status Dropdown
  private apiUrlGet12 = this.baseUrl + environment.ClientResult.GetStatusDrd;

  public DropdownGetStatus(Modelobj: CommonStatusDTO) {
    var ANYDTO: any = {};
    ANYDTO.whereclause = Modelobj.whereclause;
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http.post<any>(this.apiUrlGet12, ANYDTO, { headers: headers }).pipe(
      tap(data => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
  }


  //post Contractor
  private apiUrlPOST22 = this.baseUrl + environment.ClientResult.ContractorInvoice;
  public ContractorInvoiceDataPOST(Modelobj: Invoice_ContractorDTO) {
     debugger
    let ANYDTO: any = {};

    ANYDTO.Inv_Con_pkeyId = Modelobj.Inv_Con_pkeyId;
    ANYDTO.Inv_Con_Invoice_Id = Modelobj.Inv_Con_Invoice_Id;
    ANYDTO.Inv_Con_TaskId = Modelobj.Inv_Con_TaskId;
    ANYDTO.Inv_Con_Wo_ID = Modelobj.Inv_Con_Wo_ID;
    ANYDTO.Inv_Con_Uom_Id = Modelobj.Inv_Con_Uom_Id;
    ANYDTO.Inv_Con_Sub_Total = Modelobj.Inv_Con_Sub_Total;
    ANYDTO.Inv_Con_ContDiscount = Modelobj.Inv_Con_ContDiscount;
    ANYDTO.Inv_Con_ContTotal = Modelobj.Inv_Con_ContTotal;
    ANYDTO.Inv_Con_Short_Note = Modelobj.Inv_Con_Short_Note;
    ANYDTO.Inv_Con_Inv_Followup = Modelobj.Inv_Con_Inv_Followup;
    ANYDTO.Inv_Con_Inv_Comment = Modelobj.Inv_Con_Inv_Comment;
    ANYDTO.Inv_Con_Ref_ID = Modelobj.Inv_Con_Ref_ID;
    ANYDTO.Inv_Con_Followup_Com = Modelobj.Inv_Con_Followup_Com;
    ANYDTO.Inv_Con_Invoce_Num = Modelobj.Inv_Con_Invoce_Num;
    ANYDTO.Inv_Con_Inv_Date = Modelobj.Inv_Con_Inv_Date;
    ANYDTO.Inv_Con_Inv_Hold_Date = Modelobj.Inv_Con_Inv_Hold_Date;
    ANYDTO.Inv_Con_Status = Modelobj.Inv_Con_Status;
    ANYDTO.Inv_Con_DiscountAmount = Modelobj.Inv_Con_DiscountAmount;
    ANYDTO.Inv_Con_IsActive = Modelobj.Inv_Con_IsActive;
    ANYDTO.Inv_Con_IsDelete = Modelobj.Inv_Con_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.Inv_Con_Auto_Invoice = Modelobj.Task_Inv_Auto_Invoice;
    ANYDTO.Invoice_Contractor_ChildDTO = Modelobj.ContractorInvoiceArrayVal;
    ANYDTO.Inv_Con_Inv_Approve_Date = Modelobj.Inv_Con_Inv_Approve_Date;
    ANYDTO.Inv_Con_Inv_Approve = Modelobj.Inv_Con_Inv_Approve;

//console.log('json',ANYDTO)
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOST22, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //post Multiple Contractor
  private ContractorInvoice_Multiple = this.baseUrl + environment.ClientResult.ContractorInvoice_Multiple;
  public ContractorInvoiceDataPOST_Multiple(Modelobj: Invoice_ContractorDTO) {
    // debugger
    let ANYDTO: any = {};

    ANYDTO.Inv_Con_pkeyId = Modelobj.Inv_Con_pkeyId;
    ANYDTO.Inv_Con_Invoice_Id = Modelobj.Inv_Con_Invoice_Id;
    ANYDTO.Inv_Con_TaskId = Modelobj.Inv_Con_TaskId;
    ANYDTO.Inv_Con_Wo_ID = Modelobj.Inv_Con_Wo_ID;
    ANYDTO.Inv_Con_Uom_Id = Modelobj.Inv_Con_Uom_Id;
    ANYDTO.Inv_Con_Sub_Total = Modelobj.Inv_Con_Sub_Total;
    ANYDTO.Inv_Con_ContDiscount = Modelobj.Inv_Con_ContDiscount;
    ANYDTO.Inv_Con_ContTotal = Modelobj.Inv_Con_ContTotal;
    ANYDTO.Inv_Con_Short_Note = Modelobj.Inv_Con_Short_Note;
    ANYDTO.Inv_Con_Inv_Followup = Modelobj.Inv_Con_Inv_Followup;
    ANYDTO.Inv_Con_Inv_Comment = Modelobj.Inv_Con_Inv_Comment;
    ANYDTO.Inv_Con_Ref_ID = Modelobj.Inv_Con_Ref_ID;
    ANYDTO.Inv_Con_Followup_Com = Modelobj.Inv_Con_Followup_Com;
    ANYDTO.Inv_Con_Invoce_Num = Modelobj.Inv_Con_Invoce_Num;
    ANYDTO.Inv_Con_Inv_Date = Modelobj.Inv_Con_Inv_Date;
    ANYDTO.Inv_Con_Inv_Hold_Date = Modelobj.Inv_Con_Inv_Hold_Date;
    ANYDTO.Inv_Con_Status = Modelobj.Inv_Con_Status;
    ANYDTO.Inv_Con_DiscountAmount = Modelobj.Inv_Con_DiscountAmount;
    ANYDTO.Inv_Con_IsActive = Modelobj.Inv_Con_IsActive;
    ANYDTO.Inv_Con_IsDelete = Modelobj.Inv_Con_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.Inv_Con_Auto_Invoice = Modelobj.Task_Inv_Auto_Invoice;
    ANYDTO.Invoice_Contractor_ChildDTO = Modelobj.ContractorInvoiceArrayVal;
    ANYDTO.Inv_Con_Inv_Approve_Date = Modelobj.Inv_Con_Inv_Approve_Date;
    ANYDTO.Inv_Con_Inv_Approve = Modelobj.Inv_Con_Inv_Approve;
    ANYDTO.WorkOrderID_mul = Modelobj.WorkOrderID_mul;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.ContractorInvoice_Multiple, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  //post Client
  private apiUrlPOST2442 = this.baseUrl + environment.ClientResult.ClientInvoice;
  public ClientInvoiceDataPOST(Modelobj: Invoice_ClientDTO) {
    // debugger
    var ANYDTO: any = {};
    ANYDTO.Inv_Client_pkeyId = Modelobj.Inv_Client_pkeyId;
    ANYDTO.Inv_Client_Invoice_Id = Modelobj.Inv_Client_Invoice_Id;
    ANYDTO.Inv_Client_WO_Id = Modelobj.Inv_Client_WO_Id;
    ANYDTO.Inv_Client_Task_Id = Modelobj.Inv_Client_Task_Id;
    ANYDTO.Inv_Client_Uom_Id = Modelobj.Inv_Client_Uom_Id;
    ANYDTO.Inv_Client_Sub_Total = Modelobj.Inv_Client_Sub_Total;
    ANYDTO.Inv_Client_Client_Dis = Modelobj.Inv_Client_Client_Dis;
    ANYDTO.Inv_Client_Client_Total = Modelobj.Inv_Client_Client_Total;
    ANYDTO.Inv_Client_Short_Note = Modelobj.Inv_Client_Short_Note;
    ANYDTO.Inv_Client_Inv_Complete = Modelobj.Inv_Client_Inv_Complete;
    ANYDTO.Inv_Client_Credit_Memo = Modelobj.Inv_Client_Credit_Memo;
    ANYDTO.Inv_Client_Sent_Client = Modelobj.Inv_Client_Sent_Client;
    ANYDTO.Inv_Client_Comp_Date = Modelobj.Inv_Client_Comp_Date;
    ANYDTO.Inv_Client_Invoice_Number = Modelobj.Inv_Client_Invoice_Number;
    ANYDTO.Inv_Client_Inv_Date = Modelobj.Inv_Client_Inv_Date;
    ANYDTO.Inv_Client_Internal_Note = Modelobj.Inv_Client_Internal_Note;
    ANYDTO.Inv_Client_Status = Modelobj.Inv_Client_Status;
    ANYDTO.Inv_Client_Discout_Amount = Modelobj.Inv_Client_Discout_Amount;
    ANYDTO.Inv_Client_IsActive = Modelobj.Inv_Client_IsActive;
    ANYDTO.Inv_Client_IsDelete = Modelobj.Inv_Client_IsDelete;
    ANYDTO.Inv_Client_Followup = Modelobj.Inv_Client_Followup;
    ANYDTO.Inv_Client_Hold_Date = Modelobj.Inv_Client_Hold_Date;
    //20-12-2022
    ANYDTO.Inv_Client_IsNoCharge = Modelobj.Inv_Client_IsNoCharge;
    ANYDTO.Inv_Client_NoChargeDate = Modelobj.Inv_Client_NoChargeDate;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.Invoice_Client_ChildDTO = Modelobj.ClientInvoiceArrayVal;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOST2442, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  //post Multiple CLient Invoice
  private ClientInvoice_Multiple_url = this.baseUrl + environment.ClientResult.ClientInvoice_Multiple;
  public ClientInvoiceDataPOST_Multiple(Modelobj: Invoice_ClientDTO) {
    // debugger
    var ANYDTO: any = {};
    ANYDTO.Inv_Client_pkeyId = Modelobj.Inv_Client_pkeyId;
    ANYDTO.Inv_Client_Invoice_Id = Modelobj.Inv_Client_Invoice_Id;
    ANYDTO.Inv_Client_WO_Id = Modelobj.Inv_Client_WO_Id;
    ANYDTO.Inv_Client_Task_Id = Modelobj.Inv_Client_Task_Id;
    ANYDTO.Inv_Client_Uom_Id = Modelobj.Inv_Client_Uom_Id;
    ANYDTO.Inv_Client_Sub_Total = Modelobj.Inv_Client_Sub_Total;
    ANYDTO.Inv_Client_Client_Dis = Modelobj.Inv_Client_Client_Dis;
    ANYDTO.Inv_Client_Client_Total = Modelobj.Inv_Client_Client_Total;
    ANYDTO.Inv_Client_Short_Note = Modelobj.Inv_Client_Short_Note;
    ANYDTO.Inv_Client_Inv_Complete = Modelobj.Inv_Client_Inv_Complete;
    ANYDTO.Inv_Client_Credit_Memo = Modelobj.Inv_Client_Credit_Memo;
    ANYDTO.Inv_Client_Sent_Client = Modelobj.Inv_Client_Sent_Client;
    ANYDTO.Inv_Client_Comp_Date = Modelobj.Inv_Client_Comp_Date;
    ANYDTO.Inv_Client_Invoice_Number = Modelobj.Inv_Client_Invoice_Number;
    ANYDTO.Inv_Client_Inv_Date = Modelobj.Inv_Client_Inv_Date;
    ANYDTO.Inv_Client_Internal_Note = Modelobj.Inv_Client_Internal_Note;
    ANYDTO.Inv_Client_Status = Modelobj.Inv_Client_Status;
    ANYDTO.Inv_Client_Discout_Amount = Modelobj.Inv_Client_Discout_Amount;
    ANYDTO.Inv_Client_IsActive = Modelobj.Inv_Client_IsActive;
    ANYDTO.Inv_Client_IsDelete = Modelobj.Inv_Client_IsDelete;
    ANYDTO.Inv_Client_Followup = Modelobj.Inv_Client_Followup;
    ANYDTO.Inv_Client_Hold_Date = Modelobj.Inv_Client_Hold_Date;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.Invoice_Client_ChildDTO = Modelobj.ClientInvoiceArrayVal;
    ANYDTO.WorkOrderID_mul = Modelobj.WorkOrderID_mul;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.ClientInvoice_Multiple_url, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiClientPaymentRecordPost = this.baseUrl + environment.ClientResult.ClientPaymentData;
  private apiConPaymentRecordPost = this.baseUrl + environment.ClientResult.ContractorPaymentData;

  public PaymentRecordPost(param: any, isContractor: boolean) {
    ////dfebugger
    let apiUrl = isContractor ? this.apiConPaymentRecordPost : this.apiClientPaymentRecordPost;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(apiUrl, param, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiClientPaymentRecordGet = this.baseUrl + environment.ClientResult.GetClientPaymentData;
  private apiConPaymentRecordGet = this.baseUrl + environment.ClientResult.GetContractorPaymentData;

  public PaymentRecordGet(param: any, isContractor: boolean) {
    ////dfebugger
    let apiUrl = isContractor ? this.apiConPaymentRecordGet : this.apiClientPaymentRecordGet;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(apiUrl, param, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiConPaymentRecordDelete = this.baseUrl + environment.ClientResult.ContractorPaymentData;
  private apiClientPaymentRecordDelete = this.baseUrl + environment.ClientResult.ClientPaymentData;

  public PaymentRecrodDelete(param: any, isContractor: boolean) {
    let apiUrl = isContractor ? this.apiConPaymentRecordDelete : this.apiClientPaymentRecordDelete;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(apiUrl, param, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiExpensePost = this.baseUrl + environment.ClientResult.CreateUpdateContractorPayment;
  public ExpenseAdd(param: any) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiExpensePost, param, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  private apiExpensePost_multiple = this.baseUrl + environment.ClientResult.CreateUpdateContractorPayment_Multiple;
  public ExpenseAdd_Multiple(param: any) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiExpensePost_multiple, param, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiExpenseGet = this.baseUrl + environment.ClientResult.ClientExpensePayment;
  public ExpenseGet(param: any) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiExpenseGet, param, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiExpenseDelete = this.baseUrl + environment.ClientResult.CreateUpdateContractorPayment;
  public ExpenseDelete(param: any) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiExpenseDelete, param, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  private apiscore = this.baseUrl + environment.ClientResult.PostScoreCarddata;
  public ScoreCardData(Modelobj: scorecardDTO) {
    let ANYDTO: any = {};
    ANYDTO.Scd_pkeyId = Modelobj.Scd_pkeyId;
    ANYDTO.Scd_Wo_Id = Modelobj.Scd_Wo_Id;
    ANYDTO.Scd_Status_Id = Modelobj.Scd_Status_Id;
    ANYDTO.Scd_Comment = Modelobj.Scd_Comment;
    ANYDTO.Scd_Con_ID = Modelobj.Scd_Con_ID;
    ANYDTO.ScoreCard_data = JSON.stringify(Modelobj.ScoreCard_DTO);
    ANYDTO.Scd_IsDelete = Modelobj.Scd_IsDelete;
    ANYDTO.Scd_IsActive = Modelobj.Scd_IsActive;
    ANYDTO.Type = 1;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiscore, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  private apiUrlPOSTp = this.baseUrl + environment.ClientResult.ContractorInvoicePdfDetailsData;


  public GetContractorDetailPdf(Modelobj:Invoice_ContractorDTO) {
  //debugger
    var ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.Inv_Con_Wo_ID = Modelobj.Inv_Con_Wo_ID;
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
    .post<Blob>(this.apiUrlPOSTp, ANYDTO,  {headers: headers, responseType: 'blob' as 'json', })
    .pipe(
      tap((data) => {
        return data;
      }),
      catchError(this.xHomepageServices.CommonhandleError)
    );
}
private apiUrlPOSTc = this.baseUrl + environment.ClientResult.ClientInvoicePdfDetailsData;


public GetClientDetailPdf(Modelobj:Invoice_ClientDTO) {
// debugger
  var ANYDTO: any = {};
  ANYDTO.Type = Modelobj.Type;
  ANYDTO.Inv_Client_WO_Id = Modelobj.Inv_Client_WO_Id;
  let headers = new HttpHeaders({ "Content-Type": "application/json" });
  headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
  return this._http
  .post<Blob>(this.apiUrlPOSTc, ANYDTO,  {headers: headers, responseType: 'blob' as 'json', })
  .pipe(
    tap((data) => {
      return data;
    }),
    catchError(this.xHomepageServices.CommonhandleError)
  );
}
}

