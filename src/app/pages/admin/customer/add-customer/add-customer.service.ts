import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { AddCustomerModel } from './add-customer-model';
import { BaseUrl } from '../../../../services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import{environment} from '../../../../../environments/environment'
@Injectable({
  providedIn: "root"
})

export class AddCustomerService {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlPOST = BaseUrl + environment.Admin.PostCustomer;

  public CustomerNumberDataPost(Modelobj: AddCustomerModel) {
    var ANYDTO: any = {};
    ANYDTO.Cust_Num_pkeyId = Modelobj.Cust_Num_pkeyId;
    ANYDTO.Cust_Num_Number = Modelobj.Cust_Num_Number;
    ANYDTO.Cust_Num_IsActive = Modelobj.Cust_Num_IsActive;
    ANYDTO.Cust_Num_Active = Modelobj.Cust_Num_IsActive;
    ANYDTO.Cust_Num_IsDelete = Modelobj.Cust_Num_IsDelete;
    ANYDTO.UserID = Modelobj.UserID;
    
  
    if (Modelobj.Type != 3) {
      ANYDTO.Type = 1;

      if (Modelobj.Cust_Num_pkeyId != 0) {
        ANYDTO.Type = 2;
      }
      if (Modelobj.Cust_Num_IsDelete) {
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
