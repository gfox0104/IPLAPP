import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";

import { Router } from "@angular/router";
import { AddCustomLableModel } from './custom-photo-label-model';
import { BaseUrl } from '../../../../services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import{environment} from '../../../../../environments/environment';
@Injectable({
  providedIn: "root"
})
export class AddCustomPhotoServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  // get user data
  private apiUrlPOST = BaseUrl + environment.Admin.PostCustomLable;

  public CustomPhotoDataPost(Modelobj: AddCustomLableModel) {
    // //dfebugger;
    var ANYDTO: any = {};
    ANYDTO.PhotoLabel_pkeyID = Modelobj.PhotoLabel_pkeyID;
    ANYDTO.PhotoLabel_Name = Modelobj.PhotoLabel_Name;
    ANYDTO.PhotoLabel_IsCustom = Modelobj.PhotoLabel_IsCustom;
    ANYDTO.Custom_label_Check = Modelobj.Custom_label_Check;
    ANYDTO.workOrder_ID = Modelobj.workOrder_ID;
    ANYDTO.PhotoLabel_Valtype = Modelobj.PhotoLabel_Valtype;
    ANYDTO.PhotoLabel_Client_Id = Modelobj.PhotoLabel_Client_Id;
    ANYDTO.PhotoLabel_WorkType_Id = Modelobj.PhotoLabel_WorkType_Id;
    ANYDTO.PhotoLabel_Customer_Id = Modelobj.PhotoLabel_Customer_Id;
    ANYDTO.PhotoLabel_Loan_Id = Modelobj.PhotoLabel_Loan_Id;
    ANYDTO.PhotoLabel_Group_Id = Modelobj.PhotoLabel_Group_Id;
    ANYDTO.PhotoLabel_IsActive = Modelobj.PhotoLabel_IsActive;
    ANYDTO.PhotoLabel_IsDelete = Modelobj.PhotoLabel_IsDelete;
    ANYDTO.PhotoLabel_IsAutoAssign = Modelobj.PhotoLabel_IsAutoAssign;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.CustomPhotoLabel_Filter_Master_PkeyId = Modelobj.CustomPhotoLabel_Filter_Master_PkeyId;
    ANYDTO.AutoAssinArray = Modelobj.AutoAssinArray;

    if (Modelobj.Type != 3) {
      ANYDTO.Type = 1;

      if (Modelobj.PhotoLabel_pkeyID != 0) {
        ANYDTO.Type = 2;
      }
      if (Modelobj.PhotoLabel_IsDelete) {
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
