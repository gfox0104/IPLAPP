import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import {ContractorAccountSettingModel} from './con-account-payable-settings-model'
import { BaseUrl } from "../../../services/apis/rest-api";
import { HomepageServices } from "../../home/home.service";
import {environment} from '../../../../environments/environment'
@Injectable({
  providedIn: "root"
})

export class ContractorAccountServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlPOST = BaseUrl + environment.Admin.PostContractorAccount;

  public AddContractorAccountPost(Modelobj:ContractorAccountSettingModel) {
  ////dfebugger;
    var ANYDTO: any = {};
    ANYDTO.Con_Account_Pay_PkeyID = Modelobj.Con_Account_Pay_PkeyID;
    ANYDTO.Inv_Payout_Criteria = Modelobj.Inv_Payout_Criteria;
    ANYDTO.Payout_Frequency = Modelobj.Inv_Age_Criteria;
   // ANYDTO.Payout_Frequency = Modelobj.Payout_Frequency;
    ANYDTO.Next_Payout_End_Date = Modelobj.Next_Payout_End_Date;
    ANYDTO.Sent_Contractor_Pay_Report = Modelobj.Sent_Contractor_Pay_Report;
    ANYDTO.CompanyID = Modelobj.CompanyID;
    ANYDTO.IsActive = Modelobj.IsActive;
    ANYDTO.IsDelete = Modelobj.IsDelete;
    if (Modelobj.Con_Account_Pay_PkeyID != 0) {
      ANYDTO.Type = 2;
    }
    else{
      ANYDTO.Type = 1;
 
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
 
  private apiUrlGet = BaseUrl + environment.Admin.GetContractorAccount;

  public GetContractorAccount(Modelobj:ContractorAccountSettingModel) {
    // //dfebugger
    var ANYDTO: any = {};
    ANYDTO.Con_Account_Pay_PkeyID = Modelobj.Con_Account_Pay_PkeyID;
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
 
}
