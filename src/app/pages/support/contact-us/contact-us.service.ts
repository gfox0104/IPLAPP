
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Router } from "@angular/router";
import { ContactUsModel} from './contact-us-model';
import { BaseUrl } from '../../../services/apis/rest-api';
import { HomepageServices } from '../../home/home.service';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ContactUsServices{
    public token: any;

    constructor(private _http: HttpClient, private _Route: Router, private xHomepageServices: HomepageServices) {
      this.token = JSON.parse(localStorage.getItem('TOKEN'));
    }
 
    private apiUrlPOST = BaseUrl + environment.Support.PostContact;
  
    public ContactDetailPost(Modelobj: ContactUsModel) {
      ////dfebugger
      var ANYDTO: any = {};
      ANYDTO.Con_Us_PkeyId = Modelobj.Con_Us_PkeyId;
      ANYDTO.Con_Us_FName = Modelobj.Con_Us_FName;
      ANYDTO.Con_Us_Email = Modelobj.Con_Us_Email;
      ANYDTO.Con_Us_Contact_Number = Modelobj.Con_Us_Contact_Number;
      ANYDTO.Con_Us_Message = Modelobj.Con_Us_Message;
      ANYDTO.Con_Us_Subject = Modelobj.Con_Us_Subject;
      ANYDTO.Con_Us_ValType = Modelobj.Con_Us_ValType;
      ANYDTO.Con_Us_IsActive = Modelobj.Con_Us_IsActive;
      ANYDTO.Con_Us_IsDelete = Modelobj.Con_Us_IsDelete;
      ANYDTO.Type = Modelobj.Type;
    
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