import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { BaseUrl } from '../../../services/apis/rest-api';
import { HomepageServices } from '../../home/home.service';
import {ContractorReportsModel} from './contractor-reports.model'
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ContractorReportsService {
  public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
      this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }
    private apiUrlPOST = BaseUrl + environment.Report.GetContractorPaid;
  
    public ContactorInvoicePaid(Modelobj: ContractorReportsModel) {
      
      //debugger
      var ANYDTO: any = {};
      var data = {
        FromDatePaidInvoice: Modelobj.FromDatePaidInvoice,
        ToDateDatePaidInvoice: Modelobj.ToDateDatePaidInvoice,
        
        }
      ANYDTO.whereClause = JSON.stringify(data);
      ANYDTO.PageNumber = Modelobj.PageNumber;
      ANYDTO.NoofRows = Modelobj.NoofRows;
      ANYDTO.Contractorarr = Modelobj.Contractorarr;
     
    
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
    private apiUrlPOSTp = BaseUrl + environment.Report.GetContractorPending;
  
    public ContactorInvoicePending(Modelobj: ContractorReportsModel) {
      //dfebugger
      var ANYDTO: any = {};
     
      ANYDTO.Inv_Con_Inv_Followup = Modelobj.Inv_Con_Inv_Followup;
      ANYDTO.Type = Modelobj.Type;
      ANYDTO.From_InvoiceDate = Modelobj.From_InvoiceDate;
      ANYDTO.To_InvoiceDate = Modelobj.To_InvoiceDate;
      ANYDTO.PendingTabCon = Modelobj.PendingTabCon;
    
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.apiUrlPOSTp, ANYDTO, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
         
        );
    }

    private apiUrlDue = BaseUrl + environment.Report.GetCurrentlyDueContractor;
  
    public GetCurrentlyDueContractorReport(Modelobj: ContractorReportsModel) {
      //dfebugger
      var ANYDTO: any = {};
     
      ANYDTO.Inv_Con_Inv_Followup = Modelobj.Inv_Con_Inv_Followup;
      ANYDTO.Type = Modelobj.Type;
      ANYDTO.From_InvoiceDate = Modelobj.From_InvoiceDate;
      ANYDTO.To_InvoiceDate = Modelobj.To_InvoiceDate;
      ANYDTO.PendingTabCon = Modelobj.PendingTabCon;
    
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.apiUrlDue, ANYDTO, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
         
        );
    }


    private apiUrlPending = BaseUrl + environment.Report.GetPendingReport;
  
    public GetPendingReportData(Modelobj: ContractorReportsModel) {
   
      // debugger
      var ANYDTO: any = {};

      ANYDTO.Type = Modelobj.Type;
      ANYDTO.From_InvoiceDate = Modelobj.From_InvoiceDate;
      ANYDTO.To_InvoiceDate = Modelobj.To_InvoiceDate;
      ANYDTO.PendingTabCon = Modelobj.PendingTabCon;
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.apiUrlPending, ANYDTO, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
         
        );
    }

    private apiwo = BaseUrl + environment.Report.GetWorkOrder;
  
    public GetPruvanWorkOrder() {
      //dfebugger
      var ANYDTO: any = {};
     
      ANYDTO.username = "test_webhook";
      ANYDTO.token = "Will2020";
    
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.apiwo, ANYDTO, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
         
        );
    }

}
