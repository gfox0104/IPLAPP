import { Injectable } from '@angular/core';
import { throwError, from } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BaseUrl } from '../../../../services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import { ViewUserModel } from '../../../user/view-user/view-user-model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BillService {
  public Errorcall;
  private token: any;
  constructor(
    private _http: HttpClient,
    private _Route: Router,
    private xHomepageServices: HomepageServices
  ) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  private apiUrlGetBillList = BaseUrl + environment.Accounting.GetBillList;
  private apiUrlGet = BaseUrl + environment.Accounting.GetUserFilter;
  private apiUrlGetById = BaseUrl + environment.Accounting.GetBill;
  private apiUrlPost = BaseUrl + environment.Accounting.CreateUpdateBill;
  private apiUrlPostPayment =
    BaseUrl + environment.Accounting.CreateBillPayment;
  private apiUrlGetByVendorId =
    BaseUrl + environment.Accounting.GetBillByVendorId;
  private apiUrlPostReceivePayment =
    BaseUrl + environment.Accounting.CreateUpdateBillReceivePayment;
  private apiUrlGetPaidBill = BaseUrl + environment.Accounting.GetPaidBill;
  private apiUrlBankDeposit = BaseUrl + environment.Accounting.BillBankDeposit;
  public GetBillList() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .get<any>(this.apiUrlGetBillList, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public CreateUpdateBillData(Modelobj: any) {
    var ANYDTO: any = JSON.stringify(Modelobj);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPost, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public CreateUpdateBillPaymentData(Modelobj: any) {
    if (Modelobj.Bill_Pay_Bill_Id == 0) {
      Modelobj.Type = 1;
    } else if (Modelobj.Bill_Pay_Bill_Id > 0 && Modelobj.Type == 0) {
      Modelobj.Type = 2;
    } else {
      Modelobj.Type = 3;
    }
    var ANYDTO: any = JSON.stringify(Modelobj);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPostPayment, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public GetBill(BillId) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .get<any>(this.apiUrlGetById + '?BillId=' + BillId, {
        headers: headers,
      })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public ViewUserData(Modelobj: ViewUserModel) {
    var ANYDTO: any = {};
    ANYDTO.User_pkeyID = Modelobj.User_pkeyID;
    Modelobj.MenuID = 1;
    Modelobj.UserID = 1;

    var obj = {
      User_FirstName: Modelobj.User_FirstName,
      User_LastName: Modelobj.User_LastName,
      User_Address: Modelobj.User_Address,
      User_City: Modelobj.User_City,
      User_State: Modelobj.User_State,
      User_Zip: Modelobj.User_Zip,
      User_CellNumber: Modelobj.User_CellNumber,
      User_CompanyName: Modelobj.User_CompanyName,
      User_LoginName: Modelobj.User_LoginName,
      User_Email: Modelobj.User_Email,
      User_Group: Modelobj.User_Group,
      User_Misc_Contractor_Score: Modelobj.User_Misc_Contractor_Score,
      User_IsActive: Modelobj.User_IsActive,
    };

    ANYDTO.SearchMaster = {
      UserID: Modelobj.UserID,
      MenuID: Modelobj.MenuID,
    };

    ANYDTO.WhereClause = Modelobj.WhereClause = '';
    ANYDTO.FilterData = JSON.stringify(obj);
    ANYDTO.Type = Modelobj.Type;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGet, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
         
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
        
      );
  }
  public GetBillByVendorId(VendorId, Bill_Number) {
    if (Bill_Number == null || Bill_Number == undefined) {
      Bill_Number = '';
    }
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .get<any>(
        this.apiUrlGetByVendorId +
          '?VendorId=' +
          VendorId +
          '&Bill_Number=' +
          Bill_Number,
        {
          headers: headers,
        }
      )
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public CreateUpdateBillReceivePaymentData(Modelobj: any) {
    if (Modelobj.Bill_Rec_PkeyId == 0) {
      Modelobj.Type = 1;
    } else if (Modelobj.Bill_Rec_PkeyId > 0 && Modelobj.Type == 0) {
      Modelobj.Type = 2;
    } else {
      Modelobj.Type = 3;
    }
    var ANYDTO: any = JSON.stringify(Modelobj);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPostReceivePayment, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public GetPaidBillList() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .get<any>(this.apiUrlGetPaidBill, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  public BankDeposit(Modelobj: any) {
    var ANYDTO: any = JSON.stringify(Modelobj);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlBankDeposit, ANYDTO, { headers: headers })
      .pipe(
        tap((data) => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
