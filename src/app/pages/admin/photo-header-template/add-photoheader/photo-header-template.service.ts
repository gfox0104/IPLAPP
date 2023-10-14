import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { AddPhotoHeaderTemplatesModel } from './photo-header-template-model';
import { BaseUrl } from '../../../../services/apis/rest-api';
import { HomepageServices } from '../../../home/home.service';
import{environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class AddPhotoHeaderTemplatesServices{
    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
      this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }
    private apiUrlPOST = BaseUrl + environment.Admin.PostPhotoHeaderTemplate;

    public PhotoHeaderDataPost(Modelobj: AddPhotoHeaderTemplatesModel) {
       var ANYDTO: any = {};
      ANYDTO.Photo_head_PkeyId = Modelobj.Photo_head_PkeyId;
      ANYDTO.Photo_head_HeaderTemp = Modelobj.Photo_head_HeaderTemp;
      ANYDTO.Photo_head_Client_Company = Modelobj.Photo_head_Client_Company;
      ANYDTO.Photo_head_FileName_Temp = Modelobj.Photo_head_FileName_Temp;
      ANYDTO.Photo_head_Pdf_Temp = Modelobj.Photo_head_Pdf_Temp;
      ANYDTO.Photo_head_IsActive = Modelobj.Photo_head_IsActive;
      ANYDTO.Photo_head_IsDelete = Modelobj.Photo_head_IsDelete;
      ANYDTO.Type = Modelobj.Type;
  
      if (Modelobj.Type != 3) {
        ANYDTO.Type = 1;
  
        if (Modelobj.Photo_head_PkeyId != 0) {
          ANYDTO.Type = 2;
        }
        if (Modelobj.Photo_head_IsDelete) {
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
