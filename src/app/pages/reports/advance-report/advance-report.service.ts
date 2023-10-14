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
import { AdvanceReportModel, WOFilterModel } from "./advance-report-model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})

export class AdvanceReportsServices{
    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
      this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }
    private apiUrlPOST = BaseUrl + environment.Report.AdvanceReportDrd;


    public GetAdvanceReportTypeDetail(Modelobj:AdvanceReportModel) {
    //dfebugger
      var ANYDTO: any = {};    
      ANYDTO.Type = Modelobj.Type;
      
      
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
    private apiUrlGet = BaseUrl + environment.Report.GetAdvanceReport;


    public GetAdvanceReportDetail(Modelobj:AdvanceReportModel) {
      // debugger
      var ANYDTO: any = {};
      ANYDTO.Type= Modelobj.Type;
      ANYDTO.ReportTypeId= Modelobj.ReportTypeId;
      ANYDTO.GroupById= Modelobj.GroupById;
      ANYDTO.StatusId= Modelobj.StatusId;
      ANYDTO.InvoiceDateFrom= Modelobj.InvoiceDateFrom;
      ANYDTO.InvoiceDateTo= Modelobj.InvoiceDateTo;
      ANYDTO.ClientId= Modelobj.ClientId;
      ANYDTO.CustomerId= Modelobj.CustomerId;
      ANYDTO.ContractorId= Modelobj.ContractorId;
      ANYDTO.CordinatorId= Modelobj.CordinatorId;
      ANYDTO.ProcessorId= Modelobj.ProcessorId;
      ANYDTO.WoFilterId= Modelobj.WoFilterId;
      ANYDTO.FilterData= Modelobj.FilterData;
      
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
    
    private apiUrlFilterPOST = BaseUrl + environment.Report.PostWorkOrderFilter;

    public PostWorkOrderFilterData(Modelobj: WOFilterModel) {
      var ANYDTO: any = {};
      ANYDTO.Report_WO_Filter_Name = Modelobj.Report_WO_Filter_Name;
      ANYDTO.Report_WO_Filter_PkeyId = Modelobj.Report_WO_Filter_PkeyId;
      ANYDTO.ArrayWOFilter = Modelobj.ArrayWOFilter;
      ANYDTO.Type = 1;
      if (Modelobj.Report_WO_Filter_PkeyId == 0) {
        ANYDTO.Type = 1;
      }
      if (Modelobj.Report_WO_Filter_PkeyId > 0) {
        ANYDTO.Type = 2;
      }
      if (Modelobj.Report_WO_Filter_IsDelete) {
        ANYDTO.Type = 4;
      }
      

      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.apiUrlFilterPOST, ANYDTO, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
        );
    }

    private apiUrlChildGet = BaseUrl + environment.Report.GetReportWOFilterChild;


    public GetReportWOFilterChildDetail(Modelobj:AdvanceReportModel) {
      var ANYDTO: any = {};  
      ANYDTO.WoFilterId = Modelobj.WoFilterId;
      ANYDTO.Type = Modelobj.Type;  
      ANYDTO.Type = 3;
      
      
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.apiUrlChildGet, ANYDTO, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
        );
    }

    private apiDeleteChild = BaseUrl + environment.Report.DeleteWorkOrderFilter;

    public DeleteWorkOrderFilterChildData(Modelobj: WOFilterModel) {
      var ANYDTO: any = {};
      ANYDTO.Report_WO_Filter_Name = Modelobj.Report_WO_Filter_Name;
      ANYDTO.Report_WO_Filter_PkeyId = Modelobj.Report_WO_Filter_PkeyId;
      ANYDTO.Report_WO_Filter_ChId = Modelobj.Report_WO_Filter_ChId;
      ANYDTO.ArrayWOFilter = Modelobj.ArrayWOFilter;
      ANYDTO.Type = 4;      

      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
      return this._http
        .post<any>(this.apiDeleteChild, ANYDTO, { headers: headers })
        .pipe(
          tap(data => {
            return data;
          }),
          catchError(this.xHomepageServices.CommonhandleError)
        );
    }

    private apiUrlPOSTc = BaseUrl + environment.Report.AdvanceReportPdfDetailsData;
    public GetAdvanceReportDetailPdf(Modelobj:AdvanceReportModel ) {
      //debugger
      var ANYDTO: any = {};
      ANYDTO.Type= Modelobj.Type;
      ANYDTO.ReportTypeId= Modelobj.ReportTypeId;
      ANYDTO.GroupById= Modelobj.GroupById;
      ANYDTO.StatusId= Modelobj.StatusId;
      ANYDTO.InvoiceDateFrom= Modelobj.InvoiceDateFrom;
      ANYDTO.InvoiceDateTo= Modelobj.InvoiceDateTo;
      ANYDTO.ClientId= Modelobj.ClientId;
      ANYDTO.CustomerId= Modelobj.CustomerId;
      ANYDTO.ContractorId= Modelobj.ContractorId;
      ANYDTO.CordinatorId= Modelobj.CordinatorId;
      ANYDTO.ProcessorId= Modelobj.ProcessorId;
      ANYDTO.WoFilterId= Modelobj.WoFilterId;
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