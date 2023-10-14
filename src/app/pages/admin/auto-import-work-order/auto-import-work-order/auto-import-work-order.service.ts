import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { AutoImportWorkorderModel } from './auto-import-work-order-model';
import { BaseUrl } from 'src/app/services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import {environment} from '../../../../../environments/environment'
@Injectable({
  providedIn: "root"
})
export class AutoImportWorkOrderService {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  

  private apiUrlPOST = BaseUrl + environment.Admin.PostAutoImport;

  public AutoImportWorkOrderPost(Modelobj: AutoImportWorkorderModel) {
    // debugger
    let ANYDTO: any = {};
    ANYDTO.WI_Pkey_ID = Modelobj.WI_Pkey_ID;
    ANYDTO.WI_ImportFrom = Modelobj.WI_ImportFrom;
    ANYDTO.WI_SetClientCompany = Modelobj.WI_SetClientCompany;
    ANYDTO.WI_LoginName = Modelobj.WI_LoginName;
    ANYDTO.WI_Password = Modelobj.WI_Password;
    ANYDTO.WI_AlertEmail = Modelobj.WI_AlertEmail;
    ANYDTO.WI_FriendlyName = Modelobj.WI_FriendlyName;
    ANYDTO.WI_SkipComments = Modelobj.WI_SkipComments;
    ANYDTO.WI_SkipLineItems = Modelobj.WI_SkipLineItems;
    ANYDTO.WI_SetCategory = Modelobj.WI_SetCategory;
    ANYDTO.WI_StateFilter = Modelobj.WI_StateFilter;
    ANYDTO.WI_Discount_Import = Modelobj.WI_Discount_Import;
    ANYDTO.WI_Processor = Modelobj.WI_Processor;
    ANYDTO.WI_Coordinator = Modelobj.WI_Coordinator;
    ANYDTO.WI_IsActive = Modelobj.WI_IsActive;
    ANYDTO.IPL_IsDelete = Modelobj.WI_IsDeleted;
    ANYDTO.UserId = Modelobj.UserId;
    ANYDTO.WI_FB_LoginName = Modelobj.WI_Access_UserName;
    ANYDTO.WI_FB_Password = Modelobj.WI_Access_Password;
    ANYDTO.WI_Res_Code = Modelobj.WI_Res_Code;
    ANYDTO.WI_Changed_Order_Alert = Modelobj.WI_Changed_Order_Alert;
    ANYDTO.WI_Cancelled_Order_Alert = Modelobj.WI_Cancelled_Order_Alert;
    ANYDTO.EmailAutoAssign = Modelobj.EmailAutoAssign;
    if (Modelobj.Type != 3) {
      ANYDTO.Type = 1;

      if (Modelobj.WI_Pkey_ID != 0) {
        ANYDTO.Type = 2;
      }
      if (Modelobj.WI_IsDeleted) {
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
          console.log('return',data)
          return data;
          }),
        
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
}
