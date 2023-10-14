import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import{ViewPhotoHeaderModel} from '../view-photoheader/view-photoheader-model'
import { BaseUrl } from '../../../../services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import{environment} from '../../../../../environments/environment';
import { AddPhotoHeaderTemplatesModel } from "../add-photoheader/photo-header-template-model";

@Injectable({
  providedIn: "root"
})

export class ViewPhotoHeaderServices {

  public token: any;

  constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
    this.token = JSON.parse(localStorage.getItem('TOKEN'));
  }

  private apiUrlGet = BaseUrl + environment.Admin.GetPhotoHeaderTemplate;

  public ViewPhotoHeaderData(Modelobj: AddPhotoHeaderTemplatesModel) {
    //debugger
    var ANYDTO: any = {};
    ANYDTO.Photo_head_PkeyId = Modelobj.Photo_head_PkeyId;
    ANYDTO.Type = Modelobj.Type;

    if (Modelobj.Photo_head_PkeyId != 0) {
      ANYDTO.Type = 2;
    }

    var obj = {
      Photo_head_HeaderTemp: Modelobj.Photo_head_HeaderTemp,
      Photo_head_IsActive: Modelobj.Photo_head_IsActive,
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
  private apiUrlGetf = BaseUrl + environment.Admin.AdminFilterPhotoHeaderTemplate;

  public SaveFilterPhotoHeaderData(Modelobj: AddPhotoHeaderTemplatesModel) {
    //debugger
    var ANYDTO: any = {};
    ANYDTO.Photo_Head_Filter_PkeyId = Modelobj.Photo_head_PkeyId;
    ANYDTO.Photo_Head_Filter_Header_Temp = Modelobj.Photo_head_HeaderTemp;
    ANYDTO.Photo_Head_Filter_Client_Company = Modelobj.Photo_head_Client_Company;
    ANYDTO.Photo_Head_Filter_File_Name_temp = Modelobj.Photo_head_FileName_Temp;
    ANYDTO.Photo_Head_Filter_pdf_temp = Modelobj.Photo_head_Pdf_Temp;
    ANYDTO.Photo_Head_Filter_pdf_temp = Modelobj.Photo_head_Pdf_Temp;
    ANYDTO.Photo_Head_Filter_IsActive = Modelobj.Photo_head_IsActive;
    ANYDTO.Photo_Head_Filter_FilterActive = Modelobj.Photo_head_IsActive;
    ANYDTO.Type = Modelobj.Type;

  



    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
    return this._http
      .post<any>(this.apiUrlGetf, ANYDTO, { headers: headers })
      .pipe(
        tap(data => {
          return data;
        }),
        catchError(this.xHomepageServices.CommonhandleError)
      );
  }


}
