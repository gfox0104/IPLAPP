import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { CustomPhotoLabelGroupModel, ViewCustomPhotoLabelModel } from './view-custom-photo-label-model';
import { BaseUrl } from "../../../../services/apis/rest-api";
import { HomepageServices } from "../../../home/home.service";
import{environment} from '../../../../../environments/environment';
@Injectable({
  providedIn: "root"
})

export class ViewCustomPhotoLabelServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }
  // view custom label data
  private apiUrlGet = BaseUrl +environment.Admin.GetCustomLable;

  public ViewCustomData(Modelobj: ViewCustomPhotoLabelModel) {
    let ANYDTO: any = {};
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.PhotoLabel_pkeyID = Modelobj.PhotoLabel_pkeyID;
    ANYDTO.workOrder_ID = Modelobj.workOrder_ID;

    var obj = {
      PhotoLabel_Name: Modelobj.PhotoLabel_Name,
      PhotoLabel_CreatedBy: Modelobj.PhotoLabel_CreatedBy,
      PhotoLabel_ModifiedBy: Modelobj.PhotoLabel_ModifiedBy,
      PhotoLabel_IsActive: Modelobj.PhotoLabel_IsActive,
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
  ///////////////////////////////////////////////////

  //get Custom photo label group
  private apiGetUrl = BaseUrl + environment.Admin.GetCustomPhotoLabelGroup;

  public GetCustomPhotoLabelGroupData() {
  ////dfebugger;
    var ModelDTO: any = {};
    ModelDTO.Custom_PhotoLabel_Group_pkeyID = 0;
    ModelDTO.Type = 1;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiGetUrl, ModelDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  ///////////////////////////////////////////////////

  // post Custom photo label group
  private apiPostUrl = BaseUrl + environment.Admin.PostCstomLableGroup;

  public CustomPhotoLabelGroupDataPost(Modelobj: CustomPhotoLabelGroupModel) {
  ////dfebugger;
    var ANYDTO: any = {};
    ANYDTO.Custom_PhotoLabel_Group_pkeyID = Modelobj.Custom_PhotoLabel_Group_pkeyID;
    ANYDTO.Custom_PhotoLabel_Group_Name = Modelobj.Custom_PhotoLabel_Group_Name;
    ANYDTO.Custom_PhotoLabel_Group_Arr = Modelobj.Custom_PhotoLabel_Group_Arr;
    ANYDTO.UserID = Modelobj.UserID;
    ANYDTO.Type = Modelobj.Type;
    ANYDTO.Custom_PhotoLabel_Group_IsActive = true;
    ANYDTO.Custom_PhotoLabel_Group_IsDelete = false;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiPostUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }
  ///////////////////////////////////////////////////

  // delete Custom photo label group
  private apiDeleteUrl = BaseUrl + environment.Admin.DeleteCustomPhotoLabel;

  public DeleteCustomPhotoLabelGroupData(Modelobj: CustomPhotoLabelGroupModel) {
  ////dfebugger;
    var ANYDTO: any = {};
    ANYDTO.Custom_PhotoLabel_Group_pkeyID = Modelobj.Custom_PhotoLabel_Group_pkeyID;
    ANYDTO.Type = 4;
    ANYDTO.Custom_PhotoLabel_Group_IsActive = false;
    ANYDTO.Custom_PhotoLabel_Group_IsDelete = true;

    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiDeleteUrl, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }

  // Add/update Custom photo label filter
 private docpostUrl = BaseUrl + environment.Admin.FilterCustomLable;
 public AddUpdateFilterAdminCustPhLblData(Modelobj: ViewCustomPhotoLabelModel) {
   let ANYDTO: any = {};
   ANYDTO.CustPhLbl_Filter_PkeyID = Modelobj.PhotoLabel_pkeyID;
   ANYDTO.CustPhLbl_Filter_CustPhLblName = Modelobj.PhotoLabel_Name;
   ANYDTO.CustPhLbl_Filter_CustPhLblIsActive = Modelobj.PhotoLabel_IsActive;
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
