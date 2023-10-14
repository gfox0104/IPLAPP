import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";

import { EmailTemplateModel } from './email-template.model';
import { BaseUrl } from "../../../services/apis/rest-api";
import { HomepageServices } from "../../home/home.service";
import{environment} from '../../../../environments/environment'
@Injectable({
  providedIn: "root"
})
  export class EmailTemplateService {

    public token: any;
    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices)
     {
      this.token = JSON.parse(localStorage.getItem('TOKEN'));
      }

      private apiUrlGet = BaseUrl + environment.Admin.GetEmailDrd;

      public getdrddata() {
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
          .post<any>(this.apiUrlGet,  { headers: headers })
          .pipe(
            tap(data => {
              return data;
            }),
            catchError(this.xHomepageServices.CommonhandleError)
          );
      }
      private apiUrl = BaseUrl + environment.Admin.GetEmailBody;

      public ChangeEmailTemplate(ModelObj:EmailTemplateModel) {
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
          .post<any>(this.apiUrlGet,  { headers: headers })
          .pipe(
            tap(data => {
              return data;
            }),
            catchError(this.xHomepageServices.CommonhandleError)
          );
      }
      private apiUrlb = BaseUrl + environment.Admin.GetEmailBody;

      public GetBodyEmailTemplate(ModelObj:EmailTemplateModel) {
        // debugger
        var ANYDTO: any = {};
        ANYDTO.Email_Temp_PkeyId = ModelObj.Email_Temp_PkeyId;
        ANYDTO.Val_Type = ModelObj.Val_Type;
        ANYDTO.Type = 1;
    
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
          .post<any>(this.apiUrlb, ANYDTO, { headers: headers })
          .pipe(
            tap(data => {
              return data;
            }),
            catchError(this.xHomepageServices.CommonhandleError)
          );
      }
      private apiUrla = BaseUrl + environment.Admin.UpdateEmail;

      public UpdateEmailTemplate(ModelObj:EmailTemplateModel) {
        //console.log('update',ModelObj);
        // debugger
        var ANYDTO: any = {};
         ANYDTO.Email_Temp_PkeyId = ModelObj.Email_Temp_PkeyId;
         ANYDTO.Email_Temp_Subject = ModelObj.Email_Temp_Subject;
         ANYDTO.Email_Temp_HTML = ModelObj.Email_Temp_HTML;
         ANYDTO.Email_Temp_IsActive = ModelObj.Email_Temp_IsActive;
         ANYDTO.Email_Temp_Delete = ModelObj.Email_Temp_Delete;
         ANYDTO.Val_Type = ModelObj.Val_Type;
        ANYDTO.Type = 1;
    
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http
          .post<any>(this.apiUrla, ANYDTO, { headers: headers })
          .pipe(
            tap(data => {
              return data;
            }),
            catchError(this.xHomepageServices.CommonhandleError)
          );
      }

  }