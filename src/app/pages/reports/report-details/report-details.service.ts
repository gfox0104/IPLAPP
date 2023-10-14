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
import { reportmodeldata} from "./report-details-model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})

export class ReportsServices{
    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
      this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }
    private apiUrlPOST = BaseUrl + environment.Report.GetReportDetail;


    public GetReportDetail(Modelobj:reportmodeldata) {
    //dfebugger
      var ANYDTO: any = {};
     var data = {
        InvoiceDateFrom: Modelobj.InvoiceDateFrom,
        InvoiceDateTo: Modelobj.InvoiceDateTo,
        ReadyOfficeDateFrom: Modelobj.ReadyOfficeDateFrom,
        ReadyOfficeDateTo: Modelobj.ReadyOfficeDateTo,
        SentToClientDateFrom: Modelobj.SentToClientDateFrom,
        SentToClientDateTo: Modelobj.SentToClientDateTo,
        CompletedDateFrom:Modelobj.CompletedDateFrom,
        CompletedDateTo: Modelobj.CompletedDateTo,
        CreatedDateFrom:Modelobj.CreatedDateFrom,
        CreatedDateTo:Modelobj.CreatedDateTo,
        OfficeApproveDateFrom:Modelobj.OfficeApproveDateFrom,
        OfficeApproveDateTo:Modelobj.OfficeApproveDateTo,
        ClientCheckDateFrom:Modelobj.ClientCheckDateFrom,
        ClientCheckDateTo:Modelobj.ClientCheckDateTo,
        Contractor: 1,
        }
      ANYDTO.whereClause = JSON.stringify(data);
      ANYDTO.Type = Modelobj.Type;
      ANYDTO.Valtype = Modelobj.Valtype;
      ANYDTO.ReportAutoAssinArray = Modelobj.ReportAutoAssinArray;
      ANYDTO.InvoiceRangeStart = Modelobj.InvoiceRangeStart;
      ANYDTO.InvoiceRangeEnd = Modelobj.InvoiceRangeEnd;
      ANYDTO.ClientInvoiceRangeStart = Modelobj.ClientInvoiceRangeStart;
      ANYDTO.ClientInvoiceRangeEnd = Modelobj.ClientInvoiceRangeEnd;
      ANYDTO.IsClientCheck = Modelobj.IsClientCheck == undefined ? false : Modelobj.IsClientCheck;
      ANYDTO.IsContractorCheck = Modelobj.IsContractorCheck == undefined ? false : Modelobj.IsContractorCheck;
      
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

    private apiClientPaymentListPost = BaseUrl + environment.Report.ClientPayment;
    private apiConPaymentListPost = BaseUrl + environment.Report.ContractorPayment;
  
    public PaymentListPost(param: any, isContractor: boolean) {
      //debugger
      let apiUrl = isContractor ? this.apiConPaymentListPost : this.apiClientPaymentListPost;
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

    private apiUrlPOSTp = BaseUrl + environment.Report.ReportPdfDetails;


    public GetReportDetailPdf(Modelobj:reportmodeldata) {
    //debugger
      var ANYDTO: any = {};
     var data = {
        InvoiceDateFrom: Modelobj.InvoiceDateFrom,
        InvoiceDateTo: Modelobj.InvoiceDateTo,
        ReadyOfficeDateFrom: Modelobj.ReadyOfficeDateFrom,
        ReadyOfficeDateTo: Modelobj.ReadyOfficeDateTo,
        SentToClientDateFrom: Modelobj.SentToClientDateFrom,
        SentToClientDateTo: Modelobj.SentToClientDateTo,
        CompletedDateFrom:Modelobj.CompletedDateFrom,
        CompletedDateTo: Modelobj.CompletedDateTo,
        CreatedDateFrom:Modelobj.CreatedDateFrom,
        CreatedDateTo:Modelobj.CreatedDateTo,
        OfficeApproveDateFrom:Modelobj.OfficeApproveDateFrom,
        OfficeApproveDateTo:Modelobj.OfficeApproveDateTo,
        ClientCheckDateFrom:Modelobj.ClientCheckDateFrom,
        ClientCheckDateTo:Modelobj.ClientCheckDateTo,
        Contractor: 1,
        }
      ANYDTO.whereClause = JSON.stringify(data);
      ANYDTO.Type = Modelobj.Type;
      ANYDTO.Valtype = Modelobj.Valtype;
      ANYDTO.ReportAutoAssinArray = Modelobj.ReportAutoAssinArray;
      ANYDTO.InvoiceRangeStart = Modelobj.InvoiceRangeStart;
      ANYDTO.InvoiceRangeEnd = Modelobj.InvoiceRangeEnd;
      ANYDTO.ClientInvoiceRangeStart = Modelobj.ClientInvoiceRangeStart;
      ANYDTO.ClientInvoiceRangeEnd = Modelobj.ClientInvoiceRangeEnd;
      ANYDTO.IsClientCheck = Modelobj.IsClientCheck == undefined ? false : Modelobj.IsClientCheck;
      ANYDTO.IsContractorCheck = Modelobj.IsContractorCheck == undefined ? false : Modelobj.IsContractorCheck;
      
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
}