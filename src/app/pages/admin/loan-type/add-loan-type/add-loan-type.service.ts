import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { AddLoanTypeModel } from './add-loan-type-model';
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import {environment} from '../../../../../environments/environment'

@Injectable({
  providedIn: "root"
})
export class AddLoanTypeServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlPOST = BaseUrl + environment.Admin.PostLoanType;
  public LoanTypeDataPost(Modelobj: AddLoanTypeModel) {
    var ANYDTO: any = {};
    ANYDTO.Loan_pkeyId = Modelobj.Loan_pkeyId;
    ANYDTO.Loan_Type = Modelobj.Loan_Type;
    ANYDTO.Loan_IsActive = Modelobj.Loan_IsActive;
    ANYDTO.Loan_IsDelete = Modelobj.Loan_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;

    if (Modelobj.Type != 3) {
      ANYDTO.Type = 1;

      if (Modelobj.Loan_pkeyId != 0) {
        ANYDTO.Type = 2;
      }
      if (Modelobj.Loan_IsDelete) {
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
}
