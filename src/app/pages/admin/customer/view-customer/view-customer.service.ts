
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { ViewCustomerModel } from './view-customer-model'
import { BaseUrl } from "../../../../services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import{environment} from '../../../../../environments/environment'

@Injectable({
  providedIn: "root"
})
export class ViewCustomerServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  // get user data
  private apiUrlGet = BaseUrl + environment.Admin.GetCustomer;

  public ViewCustomerData(Modelobj: ViewCustomerModel) {
    var ANYDTO: any = {};

    ANYDTO.Type = Modelobj.Type;
    ANYDTO.Cust_Num_pkeyId = Modelobj.Cust_Num_pkeyId;




    var obj = {
      Cust_Num_Number: Modelobj.Cust_Num_Number,

      Cust_Num_IsActive: Modelobj.Cust_Num_IsActive,
      Cust_Num_CreatedBy: Modelobj.Cust_Num_CreatedBy,
      Cust_Num_ModifiedBy: Modelobj.Cust_Num_ModifiedBy,
    };

   
    ANYDTO.FilterData = JSON.stringify(obj);
   

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          //console.log(data);
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        
      );
  }
  private docpostUrl = BaseUrl + environment.Admin.FilterCustomer;
public AddUpdateFilterAdminCustomerData(Modelobj: ViewCustomerModel) {
  //debugger;
  let ANYDTO: any = {};
  ANYDTO.Cust_Filter_PkeyId = Modelobj.Cust_Num_pkeyId,
  ANYDTO.Cust_Filter_Name = Modelobj.Cust_Num_Number,
  ANYDTO.Cust_Filter_IsActive = true,
  ANYDTO.Cust_Filter_IsCustActive = Modelobj.Cust_Num_IsActive,
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
