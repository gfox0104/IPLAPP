import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { AddClientCompaniesModel } from "./add-client-companies-model";
import { AddClientCompaniesStateMultipleModel } from "./add-client-companies-model";
import { BaseUrl } from "../../../../services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import {environment} from '../../../../../environments/environment'
@Injectable({
  providedIn: "root"
})

export class AddClientCompaniesServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  // get user data
  private apiUrlPOST = BaseUrl + environment.Admin.PostClient;

  public AddClientCompaniesPost(Modelobj: AddClientCompaniesModel) {
    debugger
    var ANYDTO: any = {};
    ANYDTO.Client_IsActive = Modelobj.Client_Active;
    ANYDTO.Client_Billing_Address = Modelobj.Client_Billing_Address;
    ANYDTO.Client_City = Modelobj.Client_City;
    ANYDTO.Client_ZipCode = Modelobj.Client_ZipCode;
    ANYDTO.Client_StateId = Modelobj.Client_StateId;
    ANYDTO.Client_Billing_Address1 = Modelobj.Client_Billing_Address1;
    ANYDTO.Client_Comments = Modelobj.Client_Comments;
    ANYDTO.Client_Company_Name = Modelobj.Client_Company_Name;
    ANYDTO.Client_Contractor_Discount = Modelobj.Client_Contractor_Discount;
    ANYDTO.Client_Discount = Modelobj.Client_Discount;
    ANYDTO.Client_Due_Date_Offset = Modelobj.Client_Due_Date_Offset;

    ANYDTO.Client_Lock_Order = Modelobj.Client_Lock_Order;
    ANYDTO.Client_Lock_Order_Reason = Modelobj.Client_Lock_Order_Reason;
    ANYDTO.Client_Login = Modelobj.Client_Login;
    ANYDTO.Client_Login_Id = Modelobj.Client_Login_Id;
    ANYDTO.Client_IPL_Mobile = Modelobj.Client_IPL_Mobile;
    ANYDTO.Client_DateTimeOverlay = Modelobj.Client_DateTimeOverlay;
    ANYDTO.Client_Password = Modelobj.Client_Password;
    ANYDTO.Client_Photo_Resize_height = Modelobj.Client_Photo_Resize_height;
    ANYDTO.Client_Photo_Resize_width = Modelobj.Client_Photo_Resize_width;
    ANYDTO.Client_Provider = Modelobj.Client_Provider;
    ANYDTO.Client_Rep_Id = Modelobj.Client_Rep_Id;
    ANYDTO.Client_pkeyID = Modelobj.Client_pkeyID;
    ANYDTO.Client_ClientPhone = Modelobj.Client_ClientPhone;
    ANYDTO.Client_FaxNumbar = Modelobj.Client_FaxNumbar;
    ANYDTO.Client_Website_Link = Modelobj.Client_Website_Link;
    ANYDTO.Client_Tech_Suport = Modelobj.Client_Tech_Suport;
    ANYDTO.Client_BackgroundProvider = Modelobj.Client_BackgroundProvider;
    ANYDTO.Client_ContactName = Modelobj.Client_ContactName;
    ANYDTO.Client_ContactEmail = Modelobj.Client_ContactEmail;
    ANYDTO.Client_ContactPhone = Modelobj.Client_ContactPhone;
    ANYDTO.ClientContactList = Modelobj.ClientContactList;
    ANYDTO.Client_IsActive = Modelobj.Client_IsActive;
    ANYDTO.Client_IsDeleteAllow = Modelobj.Client_IsDeleteAllow;
    ANYDTO.UserID = Modelobj.UserID;

    if (Modelobj.Type != 3) {
      ANYDTO.Type = 1;

      if (Modelobj.Client_pkeyID != 0) {
        ANYDTO.Type = 2;
      }
      if (Modelobj.Client_IsDelete) {
        ANYDTO.Type = 4;
      }
    }
    else{
      ANYDTO.Type = 3;
    }


    ANYDTO.CompaniesMultiAddress = Modelobj.CompaniesMultiAddress;

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


  private apiUrlPOST3 = BaseUrl + "api/RESTIPL/";

  public AddClientCompaniesMutipleStatePost(
    Modelobj3: AddClientCompaniesStateMultipleModel
  ) {

    var ANYDTO: any = {};
    ANYDTO.State_pkeyID = Modelobj3.State_pkeyID;
    ANYDTO.Client_pkeyID = Modelobj3.Client_pkeyID;
    ANYDTO.StrFormArrayVal = Modelobj3.StrFormArrayVal;
    ANYDTO.UserID = Modelobj3.Client_IsActive;
    ANYDTO.UserID = Modelobj3.UserID;
    ANYDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlPOST3, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
