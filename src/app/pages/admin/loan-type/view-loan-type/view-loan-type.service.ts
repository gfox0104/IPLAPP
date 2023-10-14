import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { ViewLoanTypeModel } from './view-loan-type-model'
import { BaseUrl } from "../../../../services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import {environment} from '../../../../../environments/environment'
@Injectable({
  providedIn: "root"
})

export class ViewLoanTypeServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlGet = BaseUrl + environment.Admin.GetLoanType;

  public ViewLoanTypeData(Modelobj: ViewLoanTypeModel) {
    var ANYDTO: any = {};
    ANYDTO.Type =  Modelobj.Type;
    ANYDTO.Loan_pkeyId = Modelobj.Loan_pkeyId;

    var obj = {
      Loan_Type: Modelobj.Loan_Type,
      Loan_IsActive: Modelobj.Loan_IsActive,
      Loan_CreatedBy: Modelobj.Loan_CreatedBy,
      Loan_ModifiedBy: Modelobj.Loan_ModifiedBy
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
  // Add/update Loan filter
  private docpostUrl = BaseUrl + environment.Admin.SaveLoanTypeFilter;
  public AddUpdateFilterAdminLoanData(Modelobj: ViewLoanTypeModel) {
    let ANYDTO: any = {};
    ANYDTO.Loan_Filter_PkeyID = Modelobj.Loan_pkeyId;
    ANYDTO.Loan_Filter_LoanName = Modelobj.Loan_Type;
    ANYDTO.Loan_Filter_LoanIsActive = Modelobj.Loan_IsActive;
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
